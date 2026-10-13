import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Search, Menu, X, Shield, MapPin, User, Flame } from 'lucide-react';
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

  return (
    <>
      {/* Top micro bar for Lagos location awareness */}
      <div className="bg-[#0C4940] text-emerald-100/90 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#F0AD45]" />
            <span className="font-medium text-white">Delivering across Lagos:</span>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="bg-transparent text-white border-none font-semibold text-xs cursor-pointer focus:outline-none hover:underline"
            >
              {LAGOS_AREAS.map((area) => (
                <option key={area} value={area} className="text-[#102B2A]">
                  {area}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-300" />
              SON & NMDPRA Certified Cylinders
            </span>
            <span className="text-emerald-300/40">|</span>
            <button
              onClick={() => navigateTo('safety')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Emergency Helpline: 0800-LPG-MART
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E1E8E3] transition-shadow duration-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
          
          {/* Brand Logo Lockup */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 cursor-pointer text-left focus-visible:outline-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#168568] to-[#0C4940] flex items-center justify-center text-white shadow-xs">
              <Flame className="w-6 h-6 text-[#F0AD45]" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-2xl font-display font-extrabold text-[#102B2A] tracking-tight">
                  LPG<span className="text-[#168568]">mart</span>
                </span>
              </div>
              <span className="text-[10px] text-[#697570] block tracking-wider uppercase font-medium -mt-1">
                Gas for a Better Life
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#172321]">
            <button
              onClick={() => navigateTo('home')}
              className={`hover:text-[#168568] transition-colors whitespace-nowrap cursor-pointer ${
                currentPage === 'home' ? 'text-[#168568] font-semibold' : 'text-[#172321]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('suppliers')}
              className={`hover:text-[#168568] transition-colors whitespace-nowrap cursor-pointer ${
                currentPage === 'suppliers' ? 'text-[#168568] font-semibold' : 'text-[#172321]'
              }`}
            >
              Find Gas
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className={`hover:text-[#168568] transition-colors whitespace-nowrap cursor-pointer ${
                currentPage === 'shop' ? 'text-[#168568] font-semibold' : 'text-[#172321]'
              }`}
            >
              Shop Accessories
            </button>
            <button
              onClick={() => navigateTo('how-it-works')}
              className={`hover:text-[#168568] transition-colors whitespace-nowrap cursor-pointer ${
                currentPage === 'how-it-works' ? 'text-[#168568] font-semibold' : 'text-[#172321]'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => navigateTo('safety')}
              className={`hover:text-[#168568] transition-colors whitespace-nowrap cursor-pointer ${
                currentPage === 'safety' ? 'text-[#168568] font-semibold' : 'text-[#172321]'
              }`}
            >
              Safety
            </button>
            <button
              onClick={() => navigateTo('supplier-portal')}
              className={`hover:text-[#168568] transition-colors whitespace-nowrap cursor-pointer ${
                currentPage === 'supplier-portal' ? 'text-[#168568] font-semibold' : 'text-[#172321]'
              }`}
            >
              For Suppliers
            </button>
          </nav>

          {/* Right Action Icons & Primary CTA */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#172321] hover:text-[#168568] hover:bg-[#F3F6F4] rounded-lg transition-colors cursor-pointer"
              title="Search products or suppliers"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button with badge */}
            <button
              onClick={() => navigateTo('cart')}
              className="relative p-2 text-[#172321] hover:text-[#168568] hover:bg-[#F3F6F4] rounded-lg transition-colors cursor-pointer"
              title="View Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#168568] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Customer Account Button */}
            <button
              onClick={() => navigateTo('account')}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#172321] hover:text-[#168568] py-2 px-3 rounded-lg hover:bg-[#F3F6F4] transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-[#168568]" />
              <span>Sign in</span>
            </button>

            {/* Primary CTA: Order Gas */}
            <button
              onClick={() => setRefillModalOpen(true)}
              className="bg-[#168568] hover:bg-[#0C4940] text-white text-sm font-semibold px-4.5 py-2.5 rounded-lg shadow-xs transition-all hover:shadow-md cursor-pointer whitespace-nowrap"
            >
              Order Gas
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#172321] hover:bg-[#F3F6F4] rounded-lg cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Input Row */}
        {searchOpen && (
          <div className="bg-[#F8FAF8] border-t border-[#E1E8E3] px-4 py-3 transition-all animate-fadeIn">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-[#697570]" />
              <input
                type="text"
                placeholder="Search cooking gas refills, 12.5kg cylinders, regulators, or suppliers in Lagos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigateTo('shop');
                    setSearchOpen(false);
                  }
                }}
                className="w-full bg-transparent border-none text-sm text-[#172321] focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => {
                  navigateTo('shop');
                  setSearchOpen(false);
                }}
                className="text-xs bg-[#168568] text-white px-3 py-1.5 rounded-md font-medium cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#E1E8E3] px-6 py-5 space-y-4 shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-3 text-base font-medium">
              <button
                onClick={() => {
                  navigateTo('home');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-[#168568] border-b border-slate-100"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigateTo('suppliers');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-[#168568] border-b border-slate-100"
              >
                Find Gas Suppliers
              </button>
              <button
                onClick={() => {
                  navigateTo('shop');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-[#168568] border-b border-slate-100"
              >
                Shop Cylinders & Accessories
              </button>
              <button
                onClick={() => {
                  navigateTo('how-it-works');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-[#168568] border-b border-slate-100"
              >
                How It Works
              </button>
              <button
                onClick={() => {
                  navigateTo('safety');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-[#168568] border-b border-slate-100"
              >
                Safety & Emergency Guide
              </button>
              <button
                onClick={() => {
                  navigateTo('supplier-portal');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-[#168568] border-b border-slate-100"
              >
                For Suppliers & Depot Owners
              </button>
              <button
                onClick={() => {
                  navigateTo('account');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-[#168568] border-b border-slate-100 flex items-center justify-between"
              >
                <span>My Customer Account</span>
                <span className="text-xs bg-emerald-100 text-[#168568] px-2 py-0.5 rounded font-semibold">
                  Risqat
                </span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setRefillModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#168568] text-white py-3 rounded-lg font-semibold text-center"
              >
                Book Instant Gas Refill
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
