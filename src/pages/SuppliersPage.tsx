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
} from 'lucide-react';
import { MOCK_SUPPLIERS, LAGOS_AREAS } from '../data/mockData';
import { Supplier } from '../types';
import { RealLagosMap } from '../components/RealLagosMap';

export const SuppliersPage: React.FC = () => {
  const {
    selectedArea,
    setSelectedArea,
    setSelectedSupplier,
    navigateTo,
    setRefillModalOpen,
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'both' | 'list' | 'map'>('both');
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
    <div className="bg-[#F8FAF8] min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#102B2A] text-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Verified Marketplace
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-white mt-1">
              Find Gas Suppliers Near You
            </h1>
            <p className="text-sm text-emerald-100/80 mt-1">
              Compare prices, services, and choose from certified, NMDPRA-licensed cooking gas depots across Lagos.
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="bg-white p-2 rounded-xl shadow-lg flex items-center gap-2 max-w-2xl">
            <MapPin className="w-5 h-5 text-[#168568] ml-2 shrink-0" />
            <input
              type="text"
              placeholder="Enter your area, street or landmark in Lagos..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full text-sm font-medium text-[#172321] focus:outline-none"
            />
            <button
              onClick={() => {}}
              className="bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="sticky top-18 z-30 bg-white border-b border-[#E1E8E3] shadow-xs px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Cylinder size selector */}
            <div className="flex items-center gap-1.5 bg-[#F3F6F4] px-2.5 py-1.5 rounded-lg border border-[#E1E8E3]">
              <span className="font-semibold text-[#697570]">Cylinder Size:</span>
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="bg-transparent font-bold text-[#102B2A] focus:outline-none cursor-pointer"
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
            <div className="flex items-center gap-1.5 bg-[#F3F6F4] px-2.5 py-1.5 rounded-lg border border-[#E1E8E3]">
              <span className="font-semibold text-[#697570]">Service:</span>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="bg-transparent font-bold text-[#102B2A] focus:outline-none cursor-pointer"
              >
                <option value="all">All Services</option>
                <option value="Refill">Refill</option>
                <option value="Delivery">Doorstep Delivery</option>
                <option value="Cylinder Exchange">Cylinder Exchange</option>
                <option value="Pickup">Pickup</option>
              </select>
            </div>

            {/* Area Filter */}
            <div className="flex items-center gap-1.5 bg-[#F3F6F4] px-2.5 py-1.5 rounded-lg border border-[#E1E8E3]">
              <span className="font-semibold text-[#697570]">Lagos LGA/Area:</span>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="bg-transparent font-bold text-[#102B2A] focus:outline-none cursor-pointer"
              >
                {LAGOS_AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle: Map vs List */}
          <div className="flex items-center bg-[#F3F6F4] p-1 rounded-lg border border-[#E1E8E3]">
            <button
              onClick={() => setViewMode(viewMode === 'map' ? 'both' : 'map')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                viewMode === 'map' ? 'bg-white text-[#168568] shadow-xs' : 'text-[#697570]'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'list' ? 'both' : 'list')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-[#168568] shadow-xs' : 'text-[#697570]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content: Split List and Lagos Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Supplier Cards List (Col-7 or Full) */}
          <div className={`${viewMode === 'map' ? 'hidden' : viewMode === 'list' ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-4`}>
            
            <div className="flex items-center justify-between text-xs text-[#697570] pb-1">
              <span>Showing <strong>{filteredSuppliers.length}</strong> verified suppliers</span>
              <span>Sorted by recommended distance & rating</span>
            </div>

            {filteredSuppliers.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 border border-[#E1E8E3] text-center space-y-3">
                <p className="text-base font-bold text-[#102B2A]">No suppliers match your current filter</p>
                <p className="text-xs text-[#697570]">
                  Try clearing the specific cylinder size or resetting the area to "All Areas in Lagos".
                </p>
                <button
                  onClick={() => {
                    setSelectedArea('All Areas in Lagos');
                    setSizeFilter('all');
                    setServiceFilter('all');
                    setSearchFilter('');
                  }}
                  className="px-4 py-2 bg-[#168568] text-white text-xs font-semibold rounded-lg"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredSuppliers.map((supplier) => {
                const isHovered = hoveredSupplierId === supplier.id;
                return (
                  <div
                    key={supplier.id}
                    onMouseEnter={() => setHoveredSupplierId(supplier.id)}
                    onMouseLeave={() => setHoveredSupplierId(null)}
                    onClick={() => handleSelectSupplier(supplier)}
                    className={`bg-white rounded-2xl border p-5 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isHovered ? 'border-[#168568] ring-1 ring-[#168568]/20' : 'border-[#E1E8E3]'
                    }`}
                  >
                    {/* Left: Supplier info */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-13 h-13 rounded-2xl bg-[#F3F6F4] border border-[#E1E8E3] flex items-center justify-center text-3xl shrink-0">
                        {supplier.logo}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-[#102B2A] hover:text-[#168568] transition-colors">
                            {supplier.name}
                          </h3>
                          {supplier.verified && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle className="w-3 h-3 text-[#168568]" />
                              Verified
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[#697570]">
                          <span className="font-bold text-[#F0AD45]">⭐ {supplier.rating}</span>
                          <span>({supplier.reviewCount} verified reviews)</span>
                          <span>·</span>
                          <span className="font-medium text-[#102B2A]">{supplier.area}</span>
                        </div>

                        <p className="text-xs text-[#697570] line-clamp-1">
                          {supplier.address}
                        </p>

                        {/* Services tags */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {supplier.supportedServices.map((srv) => (
                            <span
                              key={srv}
                              className="text-[10px] font-medium bg-[#F3F6F4] text-[#172321] px-2 py-0.5 rounded border border-[#E1E8E3]"
                            >
                              {srv}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Pricing, ETA & Actions */}
                    <div className="w-full sm:w-auto sm:text-right pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                      <div>
                        <span className="text-[10px] text-[#697570] block uppercase tracking-wider">
                          Refills Starting
                        </span>
                        <span className="text-base sm:text-lg font-extrabold text-[#102B2A] tabular-nums block">
                          From ₦{supplier.minPrice.toLocaleString()}
                        </span>
                        <div className="flex items-center sm:justify-end gap-1 text-[11px] text-[#168568] font-medium mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{supplier.deliveryTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleOrderFromSupplier(supplier, e)}
                          className="bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs"
                        >
                          Order Gas
                        </button>
                        <button
                          onClick={() => handleSelectSupplier(supplier)}
                          className="border border-[#E1E8E3] hover:border-[#168568] text-[#102B2A] text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            )}

          </div>

          {/* Interactive Lagos Map View (Col-5) */}
          <div className={`${viewMode === 'list' ? 'hidden' : viewMode === 'map' ? 'lg:col-span-12' : 'lg:col-span-5'} sticky top-36`}>
            <div className="bg-white rounded-2xl border border-[#E1E8E3] overflow-hidden shadow-xs">
              
              {/* Map header */}
              <div className="bg-[#102B2A] text-white p-3.5 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapIcon className="w-4 h-4 text-[#F0AD45]" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Lagos Coverage Map
                  </span>
                </div>
                <span className="text-[11px] text-emerald-300">
                  {filteredSuppliers.length} active depots
                </span>
              </div>

              {/* Real Interactive Lagos Map View */}
              <div className="relative">
                <RealLagosMap
                  suppliers={filteredSuppliers}
                  selectedSupplier={null}
                  hoveredSupplierId={hoveredSupplierId}
                  onSelectSupplier={handleSelectSupplier}
                  onOrderFromSupplier={handleOrderFromSupplier}
                  heightClass="h-[460px] sm:h-[500px]"
                />
              </div>

              {/* Map Footer Note */}
              <div className="p-3 bg-[#F8FAF8] text-center text-xs text-[#697570] border-t border-[#E1E8E3]">
                Click any verified depot pin to inspect location, or use the quick area jumps above.
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
