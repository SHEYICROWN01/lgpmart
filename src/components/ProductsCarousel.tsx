import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight, Star, Check } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Product } from '../types';

export const ProductsCarousel: React.FC = () => {
  const { navigateTo, setSelectedProduct, addToCart } = useApp();
  const [filter, setFilter] = useState<'all' | 'cylinders' | 'accessories' | 'cookers'>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'cylinders') return p.category === 'cylinders';
    if (filter === 'cookers') return p.category === 'cookers';
    if (filter === 'accessories') return p.category === 'regulators' || p.category === 'hoses';
    return true;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#168568]">
            FEATURED SHOWCASE
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold font-display text-[#102B2A]">
            Shop Gas Cylinders & Accessories
          </h2>
          <p className="text-xs sm:text-sm text-[#697570] mt-0.5">
            Safety-tested cylinders, high-pressure regulators, hoses, and burners.
          </p>
        </div>

        {/* Filter Tabs and Carousel Arrows */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Filter Segmented Control with Horizontal Scroll */}
          <div className="flex items-center gap-1 bg-[#F3F6F4] p-1 rounded-xl border border-[#E1E8E3] text-xs overflow-x-auto no-scrollbar max-w-full">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'all'
                  ? 'bg-white text-[#102B2A] shadow-xs'
                  : 'text-[#697570] hover:text-[#102B2A]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter('cylinders')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'cylinders'
                  ? 'bg-white text-[#102B2A] shadow-xs'
                  : 'text-[#697570] hover:text-[#102B2A]'
              }`}
            >
              Cylinders
            </button>
            <button
              type="button"
              onClick={() => setFilter('accessories')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'accessories'
                  ? 'bg-white text-[#102B2A] shadow-xs'
                  : 'text-[#697570] hover:text-[#102B2A]'
              }`}
            >
              Regulators
            </button>
            <button
              type="button"
              onClick={() => setFilter('cookers')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'cookers'
                  ? 'bg-white text-[#102B2A] shadow-xs'
                  : 'text-[#697570] hover:text-[#102B2A]'
              }`}
            >
              Cookers
            </button>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#E1E8E3] bg-white hover:bg-emerald-50 text-[#102B2A] hover:text-[#168568] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#E1E8E3] bg-white hover:bg-emerald-50 text-[#102B2A] hover:text-[#168568] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1"
      >
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="w-[200px] xs:w-[230px] sm:w-[270px] shrink-0 bg-white rounded-2xl sm:rounded-3xl border border-[#E1E8E3] hover:border-[#168568] p-3.5 sm:p-4 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group"
          >
            <div>
              {/* Product Image Frame */}
              <div
                onClick={() => handleProductClick(prod)}
                className="aspect-square rounded-xl sm:rounded-2xl bg-[#F8FAF8] mb-3 p-3 flex items-center justify-center cursor-pointer overflow-hidden relative"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                {prod.originalPrice && (
                  <span className="absolute top-2 left-2 bg-[#F0AD45] text-slate-900 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                    Save ₦{(prod.originalPrice - prod.price).toLocaleString()}
                  </span>
                )}
              </div>

              <div onClick={() => handleProductClick(prod)} className="cursor-pointer space-y-1">
                <span className="text-[9px] sm:text-[10px] text-[#697570] uppercase tracking-wider font-bold block">
                  {prod.brand}
                </span>

                <h3 className="font-bold text-xs sm:text-sm text-[#102B2A] line-clamp-2 group-hover:text-[#168568] transition-colors leading-snug">
                  {prod.name}
                </h3>

                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#697570]">
                  <Star className="w-3 h-3 text-[#F0AD45] fill-current" />
                  <span className="font-bold text-[#102B2A]">{prod.rating}</span>
                  <span>({prod.reviewCount})</span>
                </div>

                <div className="pt-1 flex items-baseline gap-1.5 sm:gap-2">
                  <span className="font-extrabold text-sm sm:text-base text-[#102B2A] tabular-nums">
                    ₦{prod.price.toLocaleString()}
                  </span>
                  {prod.originalPrice && (
                    <span className="text-[10px] sm:text-xs text-slate-400 line-through tabular-nums">
                      ₦{prod.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  addToCart({
                    product: prod,
                    quantity: 1,
                    serviceType: prod.category === 'cylinders' ? 'cylinder' : 'accessory',
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

    </div>
  );
};
