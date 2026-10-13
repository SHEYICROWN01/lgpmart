import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface RealRouteTrackerMapProps {
  depotCoords?: [number, number];
  destinationCoords?: [number, number];
  courierCoords?: [number, number];
  minsRemaining?: number;
}

export const RealRouteTrackerMap: React.FC<RealRouteTrackerMapProps> = ({
  depotCoords = [6.6018, 3.3515], // Commercial Ave, Ikeja
  destinationCoords = [6.5925, 3.3575], // Joel Ogunnaike St, GRA Ikeja
  minsRemaining = 18,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [6.597, 3.354],
      zoom: 14,
      zoomControl: true,
      attributionControl: true,
    });

    mapInstanceRef.current = map;

    // Real clean Voyager street tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    // Realistic waypoints along Mobolaji Bank Anthony Way / Isaac John Street to GRA
    const routePoints: [number, number][] = [
      depotCoords,
      [6.6005, 3.352],
      [6.5985, 3.3535], // Along Commercial / Bank Anthony Way
      [6.596, 3.355],
      [6.594, 3.3562], // Turning toward Joel Ogunnaike
      destinationCoords,
    ];

    // Draw real route polyline
    const polyline = L.polyline(routePoints, {
      color: '#168568',
      weight: 5,
      opacity: 0.85,
      dashArray: '8, 8',
    }).addTo(map);

    // Depot Marker
    const depotIcon = L.divIcon({
      className: 'depot-pin',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <div class="w-8 h-8 rounded-full bg-[#102B2A] text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white">
            D
          </div>
          <span class="absolute top-9 whitespace-nowrap bg-[#102B2A] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
            GreenGas Depot
          </span>
        </div>
      `,
      iconSize: [32, 32],
    });
    L.marker(depotCoords, { icon: depotIcon }).addTo(map);

    // Customer Home Marker
    const homeIcon = L.divIcon({
      className: 'home-pin',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <div class="w-8 h-8 rounded-full bg-[#168568] text-white flex items-center justify-center text-sm shadow-md border-2 border-white">
            🏠
          </div>
          <span class="absolute top-9 whitespace-nowrap bg-[#168568] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
            Your Home (GRA Ikeja)
          </span>
        </div>
      `,
      iconSize: [32, 32],
    });
    L.marker(destinationCoords, { icon: homeIcon }).addTo(map);

    // Active Courier Marker (mid-route on Mobolaji Bank Anthony Way)
    const courierPos: [number, number] = [6.5972, 3.3542];
    const courierIcon = L.divIcon({
      className: 'courier-pin',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 animate-bounce">
          <div class="w-10 h-10 rounded-full bg-[#F0AD45] text-slate-900 flex items-center justify-center text-base shadow-xl ring-4 ring-white">
            🚚
          </div>
          <span class="absolute top-11 whitespace-nowrap bg-[#102B2A] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
            Courier (${minsRemaining}m away)
          </span>
        </div>
      `,
      iconSize: [40, 40],
    });
    L.marker(courierPos, { icon: courierIcon }).addTo(map);

    // Fit route in view
    map.fitBounds(polyline.getBounds(), { padding: [40, 40] });

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [minsRemaining]);

  return (
    <div className="relative w-full h-80 sm:h-[420px] rounded-2xl overflow-hidden border border-[#E1E8E3] bg-[#E8F0EC]">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
