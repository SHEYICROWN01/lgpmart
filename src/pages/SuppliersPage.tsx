import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Shield,
  Phone,
  Flame,
  ArrowRight,
  Layers,
  Map as MapIcon,
  List,
  Store,
  ChevronRight,
} from 'lucide-react';
import { MOCK_SUPPLIERS, LAGOS_AREAS } from '../data/mockData';
import { Supplier } from '../types';
import { RealLagosMap } from '../components/RealLagosMap';

export const SuppliersPage: React.FC = () => {
  const {
    selectedArea,
    setSelectedArea,
    selectedSupplier,
    setSelectedSupplier,
    navigateTo,
    setRefillModalOpen,
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  // On mobile default to 'list', desktop default to 'both'
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [hoveredSupplierId, setHoveredSupplierId] = useState<string | null>(null);

  const filteredSuppliers = MOCK_SUPPLIERS.filter((sup) => {
    // Area match
    if (selectedArea && selectedArea !== 'All Areas in Lagos') {
      if (!sup.area.toLowerCase().includes(selectedArea.toLowerCase())) {
        // also check if user searched
      }
    }
    // Search query match
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      const matchName = sup.name.toLowerCase().includes(q);
      const matchAddress = sup.address.toLowerCase().includes(q);
      const matchArea = sup.area.toLowerCase().includes(q);
      if (!matchName && !matchAddress && !matchArea) return false;
    }
    // Size filter
    if (sizeFilter !== 'all') {
      if (!sup.availableSizes.includes(sizeFilter as any)) return false;
    }
    // Service filter
    if (serviceFilter !== 'all') {
      if (!sup.supportedServices.includes(serviceFilter as any)) return false;
    }
    return true;
  });

  const activeSupplier = selectedSupplier || filteredSuppliers[0];

  const handleSelectSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    navigateTo('supplier-detail');
  };

  const handleOrderFromSupplier = (supplier: Supplier, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSupplier(supplier);
    setRefillModalOpen(true);
  };

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-28 lg:pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#102B2A] text-white py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Verified Marketplace
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-white mt-1">
              Find Gas Suppliers Near You
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
              Compare prices, services, and choose from certified, NMDPRA-licensed cooking gas depots across Lagos.
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="bg-white p-2 rounded-2xl shadow-lg flex items-center gap-2 max-w-2xl">
            <MapPin className="w-5 h-5 text-[#168568] ml-2 shrink-0" />
            <input
              type="text"
              placeholder="Enter area, street or landmark in Lagos..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full text-base sm:text-sm font-medium text-[#172321] placeholder-[#697570] focus:outline-none"
            />
            <button
              type="button"
              className="bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-[#E1E8E3] shadow-xs px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 text-xs">
          
          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
            {/* Cylinder size selector */}
            <div className="flex items-center gap-1.5 bg-[#F3F6F4] px-2.5 py-1.5 rounded-xl border border-[#E1E8E3]">
              <span className="font-semibold text-[#697570] hidden xs:inline">Size:</span>
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="bg-transparent font-bold text-[#102B2A] text-xs focus:outline-none cursor-pointer"
              >
                <option value="all">All Sizes</option>
                <option value="3kg">3kg</option>
                <option value="6kg">6kg</option>
                <option value="12.5kg">12.5kg</option>
                <option value="25kg">25kg</option>
                <option value="50kg">50kg</option>
              </select>
            </div>

            {/* Service Type selector */}
            <div className="flex items-center gap-1.5 bg-[#F3F6F4] px-2.5 py-1.5 rounded-xl border border-[#E1E8E3]">
              <span className="font-semibold text-[#697570] hidden xs:inline">Service:</span>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="bg-transparent font-bold text-[#102B2A] text-xs focus:outline-none cursor-pointer"
              >
                <option value="all">All Services</option>
                <option value="Refill">Refill</option>
                <option value="Delivery">Delivery</option>
                <option value="Cylinder Exchange">Swap</option>
              </select>
            </div>

            {/* Area Filter */}
            <div className="flex items-center gap-1.5 bg-[#F3F6F4] px-2.5 py-1.5 rounded-xl border border-[#E1E8E3] max-w-[150px] xs:max-w-none">
              <span className="font-semibold text-[#697570] hidden sm:inline">Area:</span>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="bg-transparent font-bold text-[#102B2A] text-xs focus:outline-none cursor-pointer truncate"
              >
                {LAGOS_AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* MOBILE TOGGLE: List View vs Map View (Prominent & Simple) */}
          <div className="lg:hidden flex items-center bg-[#F3F6F4] p-1 rounded-xl border border-[#E1E8E3]">
            <button
              type="button"
              onClick={() => setMobileView('list')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mobileView === 'list' ? 'bg-[#168568] text-white shadow-xs' : 'text-[#697570]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List ({filteredSuppliers.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileView('map')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mobileView === 'map' ? 'bg-[#168568] text-white shadow-xs' : 'text-[#697570]'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* On desktop: Grid with 7 cols for List, 5 cols for Map.
            On mobile: Show either List OR Map based on mobileView state. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Supplier Cards List (Col-7 on desktop, full or hidden on mobile) */}
          <div className={`${mobileView === 'map' ? 'hidden lg:block' : 'block'} lg:col-span-7 space-y-4`}>
            
            <div className="flex items-center justify-between text-xs text-[#697570] pb-1">
              <span>Showing <strong>{filteredSuppliers.length}</strong> verified depots</span>
              <span>Sorted by recommended rating</span>
            </div>

            {filteredSuppliers.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E1E8E3] text-center space-y-3">
                <p className="text-base font-bold text-[#102B2A]">No suppliers match your current filter</p>
                <p className="text-xs text-[#697570]">
                  Try clearing the specific cylinder size or resetting the area to "All Areas in Lagos".
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedArea('All Areas in Lagos');
                    setSizeFilter('all');
                    setServiceFilter('all');
                    setSearchFilter('');
                  }}
                  className="px-4 py-2.5 bg-[#168568] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredSuppliers.map((supplier) => {
                const isHovered = hoveredSupplierId === supplier.id;
                const isSelected = selectedSupplier?.id === supplier.id;
                return (
                  <div
                    key={supplier.id}
                    onMouseEnter={() => setHoveredSupplierId(supplier.id)}
                    onMouseLeave={() => setHoveredSupplierId(null)}
                    onClick={() => handleSelectSupplier(supplier)}
                    className={`bg-white rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isHovered || isSelected ? 'border-[#168568] ring-2 ring-[#168568]/20' : 'border-[#E1E8E3]'
                    }`}
                  >
                    {/* Left: Supplier info */}
                    <div className="flex items-start gap-3.5 w-full sm:w-auto">
                      <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#F3F6F4] border border-[#E1E8E3] flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                        {supplier.logo}
                      </div>

                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-bold text-sm sm:text-base text-[#102B2A] hover:text-[#168568] transition-colors">
                            {supplier.name}
                          </h3>
                          {supplier.verified && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle className="w-3 h-3 text-[#168568]" />
                              Verified
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[#697570] flex-wrap">
                          <span className="font-bold text-[#F0AD45]">⭐ {supplier.rating}</span>
                          <span>({supplier.reviewCount})</span>
                          <span>·</span>
                          <span className="font-medium text-[#102B2A]">{supplier.area}</span>
                        </div>

                        <p className="text-xs text-[#697570] line-clamp-1">
                          {supplier.address}
                        </p>

                        <div className="flex items-center gap-2 pt-1 flex-wrap">
                          {supplier.supportedServices.slice(0, 3).map((srv) => (
                            <span
                              key={srv}
                              className="text-[10px] bg-[#F3F6F4] text-[#172321] px-2 py-0.5 rounded-md font-semibold"
                            >
                              {srv}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Pricing and Action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-[#697570] block">Refills from</span>
                        <span className="text-base sm:text-lg font-extrabold text-[#102B2A] tabular-nums block">
                          ₦{supplier.minPrice.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold block">
                          ETA: {supplier.deliveryTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleOrderFromSupplier(supplier, e)}
                          className="bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 whitespace-nowrap"
                        >
                          Book Refill
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            )}

          </div>

          {/* Lagos Real Map Column (Col-5 on desktop, full or hidden on mobile) */}
          <div className={`${mobileView === 'list' ? 'hidden lg:block' : 'block'} lg:col-span-5 lg:sticky lg:top-32 space-y-4`}>
            
            <div className="bg-white rounded-3xl border border-[#E1E8E3] overflow-hidden shadow-xs">
              <div className="p-3.5 border-b border-[#E1E8E3] flex items-center justify-between bg-[#102B2A] text-white">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F0AD45]" />
                  <span className="font-bold text-xs text-white">
                    Live Lagos Depot Map
                  </span>
                </div>
                <span className="text-[10px] bg-white/10 text-emerald-200 px-2 py-0.5 rounded-full font-medium">
                  {filteredSuppliers.length} Locations
                </span>
              </div>

              {/* Real Leaflet Map */}
              <RealLagosMap
                suppliers={filteredSuppliers}
                selectedSupplier={selectedSupplier}
                hoveredSupplierId={hoveredSupplierId}
                onSelectSupplier={(s) => setSelectedSupplier(s)}
                onOrderFromSupplier={handleOrderFromSupplier}
                heightClass="h-[360px] sm:h-[480px]"
              />

              {/* Map Footer helper */}
              <div className="p-3 bg-[#F8FAF8] border-t border-[#E1E8E3] text-[11px] text-[#697570] flex items-center justify-between">
                <span>Tap any pin to view depot details</span>
                <span className="text-[#168568] font-bold">OpenStreetMap Verified</span>
              </div>
            </div>

            {/* Quick Supplier Card on Mobile Map View */}
            {mobileView === 'map' && activeSupplier && (
              <div className="bg-white rounded-2xl border-2 border-[#168568] p-4 shadow-lg space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{activeSupplier.logo}</span>
                    <div>
                      <h4 className="font-bold text-sm text-[#102B2A]">{activeSupplier.name}</h4>
                      <span className="text-xs text-[#697570]">{activeSupplier.area}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#F0AD45]">⭐ {activeSupplier.rating}</span>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <div>
                    <span className="text-[10px] text-[#697570] block">Refill from:</span>
                    <span className="font-extrabold text-sm text-[#102B2A]">
                      ₦{activeSupplier.minPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectSupplier(activeSupplier)}
                      className="px-3 py-2 border border-[#E1E8E3] text-xs font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
                    >
                      Storefront
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleOrderFromSupplier(activeSupplier, e)}
                      className="px-4 py-2 bg-[#168568] text-white text-xs font-bold rounded-xl hover:bg-[#0C4940] cursor-pointer"
                    >
                      Refill Now
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
