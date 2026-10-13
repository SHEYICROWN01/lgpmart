import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Shield,
  MapPin,
  User,
  Flame,
  ChevronRight,
  PhoneCall,
  Store,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { LAGOS_AREAS } from '../data/mockData';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    cartCount,
    setRefillModalOpen,
    selectedArea,
    setSelectedArea,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (page: any) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top micro bar for Lagos location awareness */}
      <div className="bg-[#0C4940] text-emerald-100/90 text-xs py-1.5 px-3 sm:px-6 border-b border-emerald-950/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Lagos Area Selector */}
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-[#F0AD45] shrink-0" />
            <span className="font-medium text-white/90 hidden xs:inline shrink-0">Lagos:</span>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="bg-transparent text-white border-none font-bold text-xs cursor-pointer focus:outline-none hover:underline truncate max-w-[130px] sm:max-w-none"
              aria-label="Select delivery area in Lagos"
            >
              {LAGOS_AREAS.map((area) => (
                <option key={area} value={area} className="text-[#102B2A]">
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Standards & Emergency */}
          <div className="flex items-center gap-3 text-xs shrink-0">
            <span className="hidden md:flex items-center gap-1 text-[11px] text-emerald-200">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              SON & NMDPRA Certified
            </span>
            <span className="hidden md:inline text-emerald-400/30">|</span>
            <button
              type="button"
              onClick={() => navigateTo('safety')}
              className="text-[11px] text-emerald-200/90 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-medium"
            >
              <PhoneCall className="w-3 h-3 text-[#F0AD45]" />
              <span className="hidden sm:inline">Emergency:</span> 0800-LPG-MART
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E1E8E3] transition-shadow duration-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo Lockup */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer text-left focus-visible:outline-none shrink-0"
            aria-label="LPGmart Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#168568] to-[#0C4940] flex items-center justify-center text-white shadow-xs">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-[#F0AD45]" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-xl sm:text-2xl font-display font-extrabold text-[#102B2A] tracking-tight">
                  LPG<span className="text-[#168568]">mart</span>
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#697570] block tracking-wider uppercase font-medium -mt-1 hidden xs:block">
                Gas for a Better Life
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (hidden on mobile) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-[#172321]">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#168568] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentPage === 'home' ? 'text-[#168568] font-bold border-b-2 border-[#168568]' : 'text-[#172321]'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('suppliers')}
              className={`hover:text-[#168568] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentPage === 'suppliers' ? 'text-[#168568] font-bold border-b-2 border-[#168568]' : 'text-[#172321]'
              }`}
            >
              Find Gas
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('shop')}
              className={`hover:text-[#168568] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentPage === 'shop' ? 'text-[#168568] font-bold border-b-2 border-[#168568]' : 'text-[#172321]'
              }`}
            >
              Shop Accessories
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('how-it-works')}
              className={`hover:text-[#168568] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentPage === 'how-it-works' ? 'text-[#168568] font-bold border-b-2 border-[#168568]' : 'text-[#172321]'
              }`}
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('safety')}
              className={`hover:text-[#168568] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentPage === 'safety' ? 'text-[#168568] font-bold border-b-2 border-[#168568]' : 'text-[#172321]'
              }`}
            >
              Safety
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('supplier-portal')}
              className={`hover:text-[#168568] transition-colors whitespace-nowrap cursor-pointer py-1 ${
                currentPage === 'supplier-portal' ? 'text-[#168568] font-bold border-b-2 border-[#168568]' : 'text-[#172321]'
              }`}
            >
              For Suppliers
            </button>
          </nav>

          {/* Right Action Group: Compact & Perfectly Responsive */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Search Toggle */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#172321] hover:text-[#168568] hover:bg-[#F3F6F4] rounded-xl transition-colors cursor-pointer min-w-[38px] min-h-[38px] flex items-center justify-center"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button with badge */}
            <button
              type="button"
              onClick={() => handleNavClick('cart')}
              className="relative p-2 text-[#172321] hover:text-[#168568] hover:bg-[#F3F6F4] rounded-xl transition-colors cursor-pointer min-w-[38px] min-h-[38px] flex items-center justify-center"
              title="View Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#168568] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Customer Account Button (desktop/tablet) */}
            <button
              type="button"
              onClick={() => handleNavClick('account')}
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-[#172321] hover:text-[#168568] py-2 px-3 rounded-xl hover:bg-[#F3F6F4] transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-[#168568]" />
              <span>Risqat</span>
            </button>

            {/* Primary Desktop CTA: Order Gas (hidden on mobile to prevent navbar crowding) */}
            <button
              type="button"
              onClick={() => setRefillModalOpen(true)}
              className="hidden sm:inline-flex bg-[#168568] hover:bg-[#0C4940] text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-xl shadow-xs transition-all hover:shadow-md cursor-pointer whitespace-nowrap active:scale-95"
            >
              Order Gas
            </button>

            {/* Mobile Hamburger Toggle Button - Clear, Prominent 44px hit-box */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-11 h-11 flex items-center justify-center text-[#102B2A] bg-[#F3F6F4] hover:bg-[#E1E8E3] rounded-xl cursor-pointer transition-colors active:scale-95"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6 text-[#102B2A]" />
            </button>
          </div>
        </div>

        {/* Expandable Search Input Row */}
        {searchOpen && (
          <div className="bg-[#F8FAF8] border-t border-[#E1E8E3] px-4 py-3 transition-all animate-fadeIn">
            <div className="max-w-3xl mx-auto flex items-center gap-2 sm:gap-3">
              <Search className="w-5 h-5 text-[#697570] shrink-0" />
              <input
                type="text"
                placeholder="Search gas refills, 12.5kg cylinders, regulators, or suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigateTo('shop');
                    setSearchOpen(false);
                  }
                }}
                className="w-full bg-transparent border-none text-base sm:text-sm text-[#172321] placeholder-[#697570] focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => {
                  navigateTo('shop');
                  setSearchOpen(false);
                }}
                className="text-xs bg-[#168568] hover:bg-[#0C4940] text-white px-3.5 py-2 rounded-lg font-bold cursor-pointer shrink-0"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 text-[#697570] hover:text-[#102B2A] rounded-lg"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* FULL-SCREEN MOBILE DRAWER & BACKDROP OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slideInRight overflow-y-auto">
            {/* Drawer Header */}
            <div>
              <div className="p-4 sm:p-5 border-b border-[#E1E8E3] flex items-center justify-between bg-[#102B2A] text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#168568] to-[#0C4940] flex items-center justify-center text-white">
                    <Flame className="w-5 h-5 text-[#F0AD45]" />
                  </div>
                  <div>
                    <span className="font-display font-extrabold text-lg text-white">
                      LPG<span className="text-emerald-400">mart</span>
                    </span>
                    <span className="text-[9px] text-emerald-200/70 block uppercase font-medium">
                      Lagos Gas Marketplace
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User profile strip in mobile drawer */}
              <div className="bg-[#F3F6F4] p-3.5 border-b border-[#E1E8E3] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#168568] text-white flex items-center justify-center font-bold text-xs">
                    RA
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#102B2A] block leading-tight">
                      Risqat Adeleke
                    </span>
                    <span className="text-[10px] text-[#697570] block">
                      Active Customer · {selectedArea}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavClick('account')}
                  className="text-[11px] font-bold text-[#168568] hover:underline"
                >
                  View Profile
                </button>
              </div>

              {/* Lagos Delivery Area Quick Selector */}
              <div className="px-4 py-3 bg-emerald-50/60 border-b border-emerald-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-900 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#168568]" />
                  <span>Delivering to:</span>
                </div>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="bg-white border border-emerald-300 rounded-lg px-2 py-1 text-xs font-bold text-[#102B2A] focus:outline-none"
                >
                  {LAGOS_AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              {/* Navigation Menu List */}
              <div className="p-3 space-y-1">
                <button
                  type="button"
                  onClick={() => handleNavClick('home')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                    currentPage === 'home'
                      ? 'bg-emerald-50 text-[#168568] font-bold'
                      : 'text-[#172321] hover:bg-[#F3F6F4]'
                  }`}
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-[#697570]" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('suppliers')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                    currentPage === 'suppliers'
                      ? 'bg-emerald-50 text-[#168568] font-bold'
                      : 'text-[#172321] hover:bg-[#F3F6F4]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>Find Gas Suppliers</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                      Lagos
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#697570]" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('shop')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                    currentPage === 'shop'
                      ? 'bg-emerald-50 text-[#168568] font-bold'
                      : 'text-[#172321] hover:bg-[#F3F6F4]'
                  }`}
                >
                  <span>Cylinders & Accessories</span>
                  <ChevronRight className="w-4 h-4 text-[#697570]" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('how-it-works')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                    currentPage === 'how-it-works'
                      ? 'bg-emerald-50 text-[#168568] font-bold'
                      : 'text-[#172321] hover:bg-[#F3F6F4]'
                  }`}
                >
                  <span>How It Works</span>
                  <ChevronRight className="w-4 h-4 text-[#697570]" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('safety')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                    currentPage === 'safety'
                      ? 'bg-emerald-50 text-[#168568] font-bold'
                      : 'text-[#172321] hover:bg-[#F3F6F4]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>Safety & Emergency Centre</span>
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#697570]" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('supplier-portal')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                    currentPage === 'supplier-portal'
                      ? 'bg-emerald-50 text-[#168568] font-bold'
                      : 'text-[#172321] hover:bg-[#F3F6F4]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>For Suppliers & Plants</span>
                    <Store className="w-3.5 h-3.5 text-[#168568]" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#697570]" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('account')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                    currentPage === 'account'
                      ? 'bg-emerald-50 text-[#168568] font-bold'
                      : 'text-[#172321] hover:bg-[#F3F6F4]'
                  }`}
                >
                  <span>My Orders & Settings</span>
                  <ChevronRight className="w-4 h-4 text-[#697570]" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('faqs')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                    currentPage === 'faqs'
                      ? 'bg-emerald-50 text-[#168568] font-bold'
                      : 'text-[#172321] hover:bg-[#F3F6F4]'
                  }`}
                >
                  <span>FAQs & Live Support</span>
                  <HelpCircle className="w-4 h-4 text-[#697570]" />
                </button>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-4 border-t border-[#E1E8E3] bg-[#F8FAF8] space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setRefillModalOpen(true);
                }}
                className="w-full bg-[#168568] hover:bg-[#0C4940] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Flame className="w-4 h-4 text-[#F0AD45]" />
                <span>Book Instant Gas Refill</span>
              </button>

              <div className="flex items-center justify-between text-xs text-[#697570] pt-1">
                <span>Emergency Hotline:</span>
                <a
                  href="tel:08005746278"
                  className="font-bold text-[#168568] hover:underline"
                >
                  0800-LPG-MART
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
