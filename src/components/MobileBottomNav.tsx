import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, MapPin, Flame, ShoppingBag, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentPage, navigateTo, cartCount, setRefillModalOpen } = useApp();

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E1E8E3] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[56px] ${
            currentPage === 'home'
              ? 'text-[#168568] font-bold'
              : 'text-[#697570] hover:text-[#102B2A]'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${currentPage === 'home' ? 'scale-110' : ''}`} />
          <span className="text-[10px] mt-1 leading-none">Home</span>
        </button>

        {/* 2. Find Gas */}
        <button
          type="button"
          onClick={() => navigateTo('suppliers')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[56px] ${
            currentPage === 'suppliers' || currentPage === 'supplier-detail'
              ? 'text-[#168568] font-bold'
              : 'text-[#697570] hover:text-[#102B2A]'
          }`}
        >
          <MapPin className={`w-5 h-5 transition-transform ${currentPage === 'suppliers' ? 'scale-110' : ''}`} />
          <span className="text-[10px] mt-1 leading-none">Find Gas</span>
        </button>

        {/* 3. Center Elevated Quick Refill Button */}
        <button
          type="button"
          onClick={() => setRefillModalOpen(true)}
          className="relative -top-3.5 flex flex-col items-center justify-center group cursor-pointer focus:outline-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0C4940] to-[#168568] text-white flex items-center justify-center shadow-lg shadow-emerald-900/30 border-2 border-white group-active:scale-95 transition-transform">
            <Flame className="w-6 h-6 text-[#F0AD45] fill-amber-400/20" />
          </div>
          <span className="text-[10px] font-extrabold text-[#168568] mt-0.5 leading-none tracking-tight">
            Refill
          </span>
        </button>

        {/* 4. Shop Accessories */}
        <button
          type="button"
          onClick={() => navigateTo('shop')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[56px] relative ${
            currentPage === 'shop' || currentPage === 'product-detail'
              ? 'text-[#168568] font-bold'
              : 'text-[#697570] hover:text-[#102B2A]'
          }`}
        >
          <ShoppingBag className={`w-5 h-5 transition-transform ${currentPage === 'shop' ? 'scale-110' : ''}`} />
          <span className="text-[10px] mt-1 leading-none">Shop</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-2 bg-[#168568] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
              {cartCount}
            </span>
          )}
        </button>

        {/* 5. Account */}
        <button
          type="button"
          onClick={() => navigateTo('account')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[56px] ${
            currentPage === 'account' || currentPage === 'order-tracking'
              ? 'text-[#168568] font-bold'
              : 'text-[#697570] hover:text-[#102B2A]'
          }`}
        >
          <User className={`w-5 h-5 transition-transform ${currentPage === 'account' ? 'scale-110' : ''}`} />
          <span className="text-[10px] mt-1 leading-none">Account</span>
        </button>
      </div>
    </nav>
  );
};
