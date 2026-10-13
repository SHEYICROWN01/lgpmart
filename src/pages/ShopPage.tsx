import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Filter, ChevronRight, SlidersHorizontal, Check, Search, ShieldCheck } from 'lucide-react';
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

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#102B2A] text-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs text-emerald-300">
            <span onClick={() => navigateTo('home')} className="hover:underline cursor-pointer">
              Home
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">Cylinders & Accessories Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display">
            Gas Cylinders & Accessories
          </h1>
          <p className="text-sm text-emerald-100/80 max-w-xl">
            Certified LPG cylinders, precision regulators, reinforced hoses, and gas cookers delivered directly to your doorstep in Lagos.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Filter Sidebar (Col-3) */}
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
                  className="bg-transparent text-xs w-full focus:outline-none"
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
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-10k', label: 'Under ₦10,000' },
                  { id: '10k-30k', label: '₦10,000 – ₦30,000' },
                  { id: '30k-50k', label: '₦30,000 – ₦50,000' },
                  { id: 'above-50k', label: 'Above ₦50,000' },
                ].map((range) => (
                  <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
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
                {['all', 'TotalEnergies', 'Oando', 'Nipco', 'GCE', 'StoveMaster'].map((b) => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="brandFilter"
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

          {/* Right Product Grid (Col-9) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar: Result count + Sort dropdown */}
            <div className="bg-white p-4 rounded-2xl border border-[#E1E8E3] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-[#697570]">
                Showing <strong className="text-[#102B2A]">{filteredProducts.length}</strong> items in catalogue
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="lg:hidden flex items-center gap-1.5 bg-[#F3F6F4] px-3 py-1.5 rounded-lg text-xs font-semibold"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#697570] font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#F3F6F4] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 font-bold text-[#102B2A] focus:outline-none cursor-pointer"
                  >
                    <option value="popularity">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Customer Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 border border-[#E1E8E3] text-center space-y-3">
                <p className="text-base font-bold text-[#102B2A]">No products found for this filter combination</p>
                <p className="text-xs text-[#697570]">Try selecting "All Products" or resetting your price range filter.</p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSelectedPriceRange('all');
                    setSelectedBrand('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-[#168568] text-white text-xs font-semibold rounded-lg"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-[#E1E8E3] hover:border-[#168568] p-4 flex flex-col justify-between transition-all hover:shadow-md group"
                  >
                    <div>
                      {/* Product Image Frame */}
                      <div
                        onClick={() => handleProductClick(product)}
                        className="aspect-square rounded-xl bg-[#F8FAF8] mb-3 p-3 flex items-center justify-center cursor-pointer overflow-hidden relative"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="absolute top-2 left-2 bg-[#F0AD45] text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                            Save ₦{(product.originalPrice - product.price).toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div onClick={() => handleProductClick(product)} className="cursor-pointer space-y-1">
                        <span className="text-[10px] text-[#697570] uppercase tracking-wider font-semibold block">
                          {product.brand}
                        </span>
                        
                        <h3 className="font-bold text-xs sm:text-sm text-[#102B2A] line-clamp-2 group-hover:text-[#168568] transition-colors leading-snug">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-1 text-[11px] text-[#697570]">
                          <span className="text-[#F0AD45] font-bold">⭐ {product.rating}</span>
                          <span>({product.reviewCount})</span>
                        </div>

                        <div className="pt-1 flex items-baseline gap-2">
                          <span className="font-extrabold text-sm sm:text-base text-[#102B2A] tabular-nums">
                            ₦{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through tabular-nums">
                              ₦{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 mt-2 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => {
                          addToCart({
                            product,
                            quantity: 1,
                            serviceType: product.category === 'cylinders' ? 'cylinder' : 'accessory',
                          });
                        }}
                        className="w-full bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer"
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

    </div>
  );
};
