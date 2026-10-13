import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Supplier } from '../types';
import { Flame, MapPin, Navigation, Layers, ZoomIn, ZoomOut } from 'lucide-react';

interface RealLagosMapProps {
  suppliers: Supplier[];
  selectedSupplier?: Supplier | null;
  hoveredSupplierId?: string | null;
  onSelectSupplier: (supplier: Supplier) => void;
  onOrderFromSupplier: (supplier: Supplier, e: React.MouseEvent) => void;
  heightClass?: string;
}

export const RealLagosMap: React.FC<RealLagosMapProps> = ({
  suppliers,
  selectedSupplier,
  hoveredSupplierId,
  onSelectSupplier,
  onOrderFromSupplier,
  heightClass = 'h-[480px]',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const [mapStyle, setMapStyle] = useState<'voyager' | 'osm'>('voyager');

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on central Lagos Mainland/Island juncture (Yaba / Surulere / Lagos Island)
    const lagosCenter: [number, number] = [6.5244, 3.3792];
    const initialZoom = 12;

    const map = L.map(mapContainerRef.current, {
      center: lagosCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: true,
    });

    mapInstanceRef.current = map;

    // Tile Layer: CartoDB Voyager by default (clean, premium, accurate streets)
    const tileUrl =
      mapStyle === 'voyager'
        ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const attribution =
      mapStyle === 'voyager'
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const tiles = L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution,
    });
    tiles.addTo(map);

    // Zoom control in bottom right
    L.control
      .zoom({
        position: 'bottomright',
      })
      .addTo(map);

    // Fix possible leaflet sizing issues after container render
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersRef.current = {};
    };
  }, [mapStyle]);

  // Update Markers when suppliers change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    const bounds = L.latLngBounds([]);

    suppliers.forEach((sup) => {
      const isSelected = selectedSupplier?.id === sup.id;
      const isHovered = hoveredSupplierId === sup.id;

      // Custom HTML Marker Icon
      const iconHtml = `
        <div class="relative group cursor-pointer" style="transform: translate(-50%, -100%);">
          <div class="w-9 h-9 rounded-full ${
            isSelected || isHovered
              ? 'bg-[#F0AD45] text-slate-900 ring-4 ring-white shadow-xl scale-110'
              : 'bg-[#168568] text-white shadow-lg hover:scale-105'
          } flex items-center justify-center transition-all duration-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343a7.975 7.975 0 010 11.314z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/>
            </svg>
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 -z-10"></div>
          <span class="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#102B2A] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md pointer-events-none">
            ${sup.name.split(' ')[0]}
          </span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-lpg-pin',
        html: iconHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      });

      const marker = L.marker([sup.coordinates.lat, sup.coordinates.lng], {
        icon: customIcon,
      }).addTo(map);

      // Popup content with real Lagos details
      const popupContent = `
        <div class="p-1 min-w-[210px] text-left font-sans">
          <div class="flex items-center gap-1.5 mb-1">
            <span class="font-extrabold text-sm text-[#102B2A]">${sup.name}</span>
            <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded">Verified</span>
          </div>
          <p class="text-[11px] text-[#697570] mb-1">${sup.address}</p>
          <div class="flex items-center justify-between text-xs font-semibold py-1 border-t border-b border-slate-100 my-1.5">
            <span class="text-[#F0AD45]">⭐ ${sup.rating} (${sup.reviewCount})</span>
            <span class="text-[#168568]">ETA: ${sup.deliveryTime}</span>
          </div>
          <div class="flex items-center justify-between mt-2">
            <span class="text-xs font-bold text-[#102B2A]">From ₦${sup.minPrice.toLocaleString()}</span>
            <button id="btn-order-${sup.id}" class="bg-[#168568] hover:bg-[#0C4940] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xs transition-colors">
              Select Depot
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: true,
        className: 'lpg-map-popup',
      });

      marker.on('click', () => {
        onSelectSupplier(sup);
      });

      marker.on('popupopen', () => {
        const orderBtn = document.getElementById(`btn-order-${sup.id}`);
        if (orderBtn) {
          orderBtn.onclick = (e) => {
            onOrderFromSupplier(sup, e as any);
          };
        }
      });

      markersRef.current[sup.id] = marker;
      bounds.extend([sup.coordinates.lat, sup.coordinates.lng]);
    });

    // If there are points, fit them comfortably
    if (suppliers.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [suppliers, selectedSupplier, hoveredSupplierId]);

  // Pan to hovered or selected supplier
  useEffect(() => {
    const targetId = hoveredSupplierId || selectedSupplier?.id;
    if (!targetId || !mapInstanceRef.current) return;

    const targetSupplier = suppliers.find((s) => s.id === targetId);
    if (targetSupplier) {
      mapInstanceRef.current.flyTo(
        [targetSupplier.coordinates.lat, targetSupplier.coordinates.lng],
        14,
        { duration: 0.8 }
      );
      const marker = markersRef.current[targetSupplier.id];
      if (marker && hoveredSupplierId) {
        marker.openPopup();
      }
    }
  }, [hoveredSupplierId, selectedSupplier]);

  const fitAllDepots = () => {
    const map = mapInstanceRef.current;
    if (!map || suppliers.length === 0) return;
    const bounds = L.latLngBounds(
      suppliers.map((s) => [s.coordinates.lat, s.coordinates.lng] as [number, number])
    );
    map.fitBounds(bounds, { padding: [40, 40] });
  };

  const jumpToArea = (lat: number, lng: number, zoom: number = 13) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], zoom, { duration: 0.8 });
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#E1E8E3] bg-[#E8F0EC]">
      
      {/* Real Map Tiles Canvas Container */}
      <div ref={mapContainerRef} className={`w-full ${heightClass} z-10`} />

      {/* Floating Top Quick Jump Bar */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-[#E1E8E3] shadow-md text-[11px]">
        <span className="font-bold text-[#102B2A] px-1.5 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-[#168568]" />
          Lagos:
        </span>
        <button
          type="button"
          onClick={() => jumpToArea(6.6018, 3.3515, 14)}
          className="px-2 py-1 bg-[#F3F6F4] hover:bg-emerald-50 hover:text-[#168568] font-semibold rounded-lg text-[#172321] transition-colors cursor-pointer"
        >
          Ikeja
        </button>
        <button
          type="button"
          onClick={() => jumpToArea(6.4969, 3.3533, 14)}
          className="px-2 py-1 bg-[#F3F6F4] hover:bg-emerald-50 hover:text-[#168568] font-semibold rounded-lg text-[#172321] transition-colors cursor-pointer"
        >
          Surulere
        </button>
        <button
          type="button"
          onClick={() => jumpToArea(6.5167, 3.3858, 14)}
          className="px-2 py-1 bg-[#F3F6F4] hover:bg-emerald-50 hover:text-[#168568] font-semibold rounded-lg text-[#172321] transition-colors cursor-pointer"
        >
          Yaba
        </button>
        <button
          type="button"
          onClick={() => jumpToArea(6.4474, 3.4723, 14)}
          className="px-2 py-1 bg-[#F3F6F4] hover:bg-emerald-50 hover:text-[#168568] font-semibold rounded-lg text-[#172321] transition-colors cursor-pointer"
        >
          Lekki Phase 1
        </button>
        <button
          type="button"
          onClick={() => jumpToArea(6.4281, 3.4219, 14)}
          className="px-2 py-1 bg-[#F3F6F4] hover:bg-emerald-50 hover:text-[#168568] font-semibold rounded-lg text-[#172321] transition-colors cursor-pointer"
        >
          Victoria Island
        </button>
        <button
          type="button"
          onClick={fitAllDepots}
          className="px-2 py-1 bg-emerald-100 text-emerald-900 font-bold rounded-lg hover:bg-emerald-200 transition-colors cursor-pointer ml-1"
        >
          Fit All
        </button>
      </div>

      {/* Floating Map Tile Switcher & Legend on Bottom Left */}
      <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
        <div className="bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-[#E1E8E3] shadow-md text-[11px] flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#168568] inline-block" />
          <span className="font-semibold text-[#102B2A]">Real-time Lagos Street Map</span>
        </div>

        <button
          type="button"
          onClick={() => setMapStyle(mapStyle === 'voyager' ? 'osm' : 'voyager')}
          className="bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-[#E1E8E3] shadow-md text-[11px] font-bold text-[#102B2A] hover:text-[#168568] flex items-center gap-1 cursor-pointer transition-colors"
          title="Switch Map Tiles"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{mapStyle === 'voyager' ? 'Clean View' : 'Standard OSM'}</span>
        </button>
      </div>

    </div>
  );
};
