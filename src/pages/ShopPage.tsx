import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Filter,
  ChevronRight,
  SlidersHorizontal,
  Check,
  Search,
  ShieldCheck,
  X,
  RotateCcw,
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const {
    navigateTo,
    setSelectedProduct,
    addToCart,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'cylinders', label: 'Gas Cylinders' },
    { id: 'regulators', label: 'Regulators & Gauges' },
    { id: 'hoses', label: 'Hoses & Clamps' },
    { id: 'cookers', label: 'Burners & Cookers' },
    { id: 'safety', label: 'Safety Equipment' },
  ];

  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-10k', label: 'Under ₦10,000' },
    { id: '10k-30k', label: '₦10,000 – ₦30,000' },
    { id: '30k-50k', label: '₦30,000 – ₦50,000' },
    { id: 'above-50k', label: 'Above ₦50,000' },
  ];

  const brands = ['all', 'TotalEnergies', 'Oando', 'Nipco', 'GCE', 'StoveMaster'];

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    if (activeCategory !== 'all' && product.category !== activeCategory) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      if (!matchName && !matchBrand) return false;
    }
    if (selectedPriceRange === 'under-10k' && product.price >= 10000) return false;
    if (selectedPriceRange === '10k-30k' && (product.price < 10000 || product.price > 30000)) return false;
    if (selectedPriceRange === '30k-50k' && (product.price < 30000 || product.price > 50000)) return false;
    if (selectedPriceRange === 'above-50k' && product.price <= 50000) return false;
    if (selectedBrand !== 'all' && !product.brand.toLowerCase().includes(selectedBrand.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewCount - a.reviewCount; // popularity
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  const resetAllFilters = () => {
    setActiveCategory('all');
    setSelectedPriceRange('all');
    setSelectedBrand('all');
    setSearchQuery('');
  };

  const activeFilterCount =
    (activeCategory !== 'all' ? 1 : 0) +
    (selectedPriceRange !== 'all' ? 1 : 0) +
    (selectedBrand !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-28 lg:pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#102B2A] text-white py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs text-emerald-300">
            <button onClick={() => navigateTo('home')} className="hover:underline cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">Cylinders & Accessories Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display">
            Gas Cylinders & Accessories
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
            Certified LPG cylinders, precision regulators, reinforced hoses, and gas cookers delivered directly to your doorstep in Lagos.
          </p>
        </div>
      </div>

      {/* Mobile Horizontal Quick-Category Chips (One-tap filter) */}
      <div className="lg:hidden bg-white border-b border-[#E1E8E3] py-2.5 px-4 sticky top-16 z-20 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#168568] text-white shadow-xs'
                    : 'bg-[#F3F6F4] text-[#697570] hover:text-[#102B2A]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Filter Sidebar (Col-3) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            
            {/* Search filter input */}
            <div className="bg-white p-4 rounded-2xl border border-[#E1E8E3] space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#102B2A] block">
                Search Catalogue
              </label>
              <div className="flex items-center gap-2 bg-[#F3F6F4] px-3 py-2 rounded-xl border border-slate-200">
                <Search className="w-4 h-4 text-[#697570]" />
                <input
                  type="text"
                  placeholder="e.g. 12.5kg, regulator..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm sm:text-xs w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-5 rounded-2xl border border-[#E1E8E3] space-y-3">
              <h3 className="font-bold text-sm text-[#102B2A] font-display border-b border-slate-100 pb-2">
                Categories
              </h3>
              <ul className="space-y-1.5 text-xs">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                          isActive
                            ? 'bg-emerald-50 text-[#168568] font-bold'
                            : 'text-[#697570] hover:text-[#102B2A] hover:bg-[#F3F6F4]'
                        }`}
                      >
                        <span>{cat.label}</span>
                        {isActive && <Check className="w-3.5 h-3.5" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Price Range */}
            <div className="bg-white p-5 rounded-2xl border border-[#E1E8E3] space-y-3">
              <h3 className="font-bold text-sm text-[#102B2A] font-display border-b border-slate-100 pb-2">
                Price Range (₦)
              </h3>
              <div className="space-y-2 text-xs text-[#172321]">
                {priceRanges.map((range) => (
                  <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRangeDesktop"
                      checked={selectedPriceRange === range.id}
                      onChange={() => setSelectedPriceRange(range.id)}
                      className="text-[#168568] focus:ring-[#168568]"
                    />
                    <span className={selectedPriceRange === range.id ? 'font-bold text-[#168568]' : ''}>
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="bg-white p-5 rounded-2xl border border-[#E1E8E3] space-y-3">
              <h3 className="font-bold text-sm text-[#102B2A] font-display border-b border-slate-100 pb-2">
                Brand / Manufacturer
              </h3>
              <div className="space-y-2 text-xs text-[#172321]">
                {brands.map((b) => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="brandFilterDesktop"
                      checked={selectedBrand === b}
                      onChange={() => setSelectedBrand(b)}
                      className="text-[#168568] focus:ring-[#168568]"
                    />
                    <span className={selectedBrand === b ? 'font-bold text-[#168568]' : ''}>
                      {b === 'all' ? 'All Brands' : b}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Safety badge in sidebar */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-[#168568]">
                <ShieldCheck className="w-4 h-4" />
                <span>Certified Genuine Parts</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                All cylinders & accessories meet Standards Organisation of Nigeria (SON) certifications.
              </p>
            </div>

          </div>

          {/* Right Product Grid Area (Col-9) */}
          <div className="lg:col-span-9 space-y-5">
            
            {/* Top Toolbar: Result count + Mobile Filter Button + Sort dropdown */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E1E8E3] flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="text-xs text-[#697570]">
                Showing <strong className="text-[#102B2A]">{filteredProducts.length}</strong> products
              </div>

              <div className="flex items-center gap-2.5">
                {/* Real Working Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 bg-[#F3F6F4] hover:bg-[#E1E8E3] px-3.5 py-2 rounded-xl text-xs font-bold text-[#102B2A] transition-colors cursor-pointer active:scale-95"
                >
                  <Filter className="w-3.5 h-3.5 text-[#168568]" />
                  <span>Filter</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-[#168568] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[#697570] font-medium hidden sm:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#F3F6F4] border border-[#E1E8E3] rounded-xl px-2.5 py-1.5 font-bold text-[#102B2A] text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="popularity">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E1E8E3] text-center space-y-3">
                <p className="text-base font-bold text-[#102B2A]">No products found for this filter</p>
                <p className="text-xs text-[#697570]">Try selecting "All Products" or resetting your price range filter.</p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-4 py-2.5 bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-[#E1E8E3] hover:border-[#168568] p-3 sm:p-4 flex flex-col justify-between transition-all hover:shadow-md group"
                  >
                    <div>
                      {/* Product Image Frame */}
                      <div
                        onClick={() => handleProductClick(product)}
                        className="aspect-square rounded-xl bg-[#F8FAF8] mb-2.5 sm:mb-3 p-2.5 sm:p-3 flex items-center justify-center cursor-pointer overflow-hidden relative"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="absolute top-1.5 left-1.5 bg-[#F0AD45] text-slate-900 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                            Save ₦{(product.originalPrice - product.price).toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div onClick={() => handleProductClick(product)} className="cursor-pointer space-y-1">
                        <span className="text-[9px] sm:text-[10px] text-[#697570] uppercase tracking-wider font-semibold block">
                          {product.brand}
                        </span>
                        
                        <h3 className="font-bold text-xs sm:text-sm text-[#102B2A] line-clamp-2 group-hover:text-[#168568] transition-colors leading-snug">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#697570]">
                          <span className="text-[#F0AD45] font-bold">⭐ {product.rating}</span>
                          <span>({product.reviewCount})</span>
                        </div>

                        <div className="pt-1 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
                          <span className="font-extrabold text-sm sm:text-base text-[#102B2A] tabular-nums">
                            ₦{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[11px] sm:text-xs text-slate-400 line-through tabular-nums">
                              ₦{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2.5 sm:pt-3 mt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart({
                            product,
                            quantity: 1,
                            serviceType: product.category === 'cylinders' ? 'cylinder' : 'accessory',
                          });
                        }}
                        className="w-full bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-bold py-2 sm:py-2.5 rounded-xl transition-colors cursor-pointer active:scale-95"
                      >
                        Add to Cart
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>

      {/* REAL WORKING MOBILE FILTER DRAWER & BACKDROP */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setMobileFilterOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom Sheet Drawer */}
          <div className="relative w-full bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl z-10 animate-slideUp overflow-hidden">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[#E1E8E3] flex items-center justify-between bg-[#102B2A] text-white">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#F0AD45]" />
                <h3 className="font-bold text-base text-white font-display">
                  Filter Products ({filteredProducts.length} results)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filter Body */}
            <div className="p-5 space-y-6 overflow-y-auto max-h-[calc(85vh-140px)]">
              {/* Category selector */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#102B2A] mb-2.5">
                  Category
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => {
                    const isSel = activeCategory === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setActiveCategory(c.id)}
                        className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                          isSel
                            ? 'bg-emerald-50 border-[#168568] text-[#168568]'
                            : 'bg-white border-[#E1E8E3] text-[#172321]'
                        }`}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range selector */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#102B2A] mb-2.5">
                  Price Range
                </span>
                <div className="space-y-2">
                  {priceRanges.map((pr) => {
                    const isSel = selectedPriceRange === pr.id;
                    return (
                      <label
                        key={pr.id}
                        onClick={() => setSelectedPriceRange(pr.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer text-xs ${
                          isSel
                            ? 'bg-emerald-50 border-[#168568] font-bold text-[#168568]'
                            : 'bg-white border-[#E1E8E3] text-[#172321]'
                        }`}
                      >
                        <span>{pr.label}</span>
                        {isSel && <Check className="w-4 h-4 text-[#168568]" />}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Brand selector */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#102B2A] mb-2.5">
                  Brand / Manufacturer
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {brands.map((b) => {
                    const isSel = selectedBrand === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBrand(b)}
                        className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                          isSel
                            ? 'bg-emerald-50 border-[#168568] text-[#168568]'
                            : 'bg-white border-[#E1E8E3] text-[#172321]'
                        }`}
                      >
                        {b === 'all' ? 'All Brands' : b}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-[#E1E8E3] bg-[#F8FAF8] flex items-center gap-3">
              <button
                type="button"
                onClick={resetAllFilters}
                className="flex-1 py-3 px-4 border border-[#E1E8E3] bg-white rounded-xl text-xs font-bold text-[#102B2A] hover:bg-slate-100 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-2 py-3 px-4 bg-[#168568] hover:bg-[#0C4940] text-white rounded-xl text-xs font-bold cursor-pointer text-center"
              >
                Show {filteredProducts.length} Products
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
