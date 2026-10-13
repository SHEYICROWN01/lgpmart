import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  PhoneCall,
  Flame,
  Package,
  Layers,
  ArrowRight,
  Check,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { ASSET_IMAGES } from '../data/mockData';
import { HeroCarousel } from '../components/HeroCarousel';
import { LiveActivityTicker } from '../components/LiveActivityTicker';
import { ProductsCarousel } from '../components/ProductsCarousel';
import { CylinderExpiryChecker } from '../components/CylinderExpiryChecker';

export const HomePage: React.FC = () => {
  const {
    navigateTo,
    setRefillModalOpen,
    setSafetyModalOpen,
  } = useApp();

  return (
    <div className="space-y-12 sm:space-y-20 pb-32 lg:pb-20">
      
      {/* 1. HERO SECTION WITH MULTI-SLIDE INTERACTIVE CAROUSEL */}
      <section className="bg-[#102B2A] text-white pt-8 sm:pt-12 pb-10 sm:pb-14 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#168568]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-[#0C4940]/40 rounded-full blur-3xl pointer-events-none" />

        {/* The Animated Hero Carousel */}
        <HeroCarousel />

        {/* Trust Indicators Strip */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-white/90">
              
              <motion.div
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5 transition-colors hover:bg-white/10"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-white">Trusted Suppliers</span>
                  <span className="text-[11px] text-emerald-200/70 block">In Lagos & environs</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5 transition-colors hover:bg-white/10"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#F0AD45] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-white">Transparent Pricing</span>
                  <span className="text-[11px] text-emerald-200/70 block">No hidden surcharge</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5 transition-colors hover:bg-white/10"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-white">Doorstep Delivery</span>
                  <span className="text-[11px] text-emerald-200/70 block">Heavy lifting handled</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5 transition-colors hover:bg-white/10"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-white">Safe & Reliable</span>
                  <span className="text-[11px] text-emerald-200/70 block">Standard leak tested</span>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Live Dispatch Activity Heartbeat Ticker */}
        <div className="mt-8">
          <LiveActivityTicker />
        </div>
      </section>

      {/* 2. OUR SERVICES SECTION WITH INTERACTIVE HOVER MOTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#168568]">
            OUR SERVICES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#102B2A]">
            Everything You Need for Cooking Gas
          </h2>
          <p className="text-sm text-[#697570]">
            From refills to cylinders and accessories, we make it easy, safe and convenient.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Gas Refill & Delivery */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={() => setRefillModalOpen(true)}
            className="group bg-white rounded-3xl p-6 border border-[#E1E8E3] hover:border-[#168568] shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center p-2 rounded-2xl bg-emerald-50/50 group-hover:bg-emerald-50 transition-colors">
                <img
                  src={ASSET_IMAGES.cylinderBlue}
                  alt="Gas Refill & Delivery"
                  className="max-h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-lg text-[#102B2A] text-center mb-1 group-hover:text-[#168568] transition-colors">
                Gas Refill & Delivery
              </h3>
              <p className="text-xs text-[#697570] text-center leading-relaxed">
                Order a refill and get it delivered or swapped at your doorstep in Lagos.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-sm font-bold text-[#168568] group-hover:text-[#0C4940]">
              <span>Order Refill Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </motion.div>

          {/* Card 2: Gas Cylinders */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={() => navigateTo('shop')}
            className="group bg-white rounded-3xl p-6 border border-[#E1E8E3] hover:border-[#168568] shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center p-2 rounded-2xl bg-emerald-50/50 group-hover:bg-emerald-50 transition-colors">
                <img
                  src={ASSET_IMAGES.cylinderRed}
                  alt="Gas Cylinders"
                  className="max-h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-lg text-[#102B2A] text-center mb-1 group-hover:text-[#168568] transition-colors">
                Gas Cylinders
              </h3>
              <p className="text-xs text-[#697570] text-center leading-relaxed">
                Buy certified steel cylinders of all sizes (3kg to 50kg) from verified suppliers.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-sm font-bold text-[#168568] group-hover:text-[#0C4940]">
              <span>Shop Cylinders</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </motion.div>

          {/* Card 3: Accessories */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={() => navigateTo('shop')}
            className="group bg-white rounded-3xl p-6 border border-[#E1E8E3] hover:border-[#168568] shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center p-2 rounded-2xl bg-emerald-50/50 group-hover:bg-emerald-50 transition-colors">
                <img
                  src={ASSET_IMAGES.regulatorHose}
                  alt="Accessories"
                  className="max-h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-lg text-[#102B2A] text-center mb-1 group-hover:text-[#168568] transition-colors">
                Accessories
              </h3>
              <p className="text-xs text-[#697570] text-center leading-relaxed">
                Regulators, hoses, burners, tabletop cookers, and safety valves.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-sm font-bold text-[#168568] group-hover:text-[#0C4940]">
              <span>Shop Accessories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </motion.div>

          {/* Card 4: Find Nearby Suppliers */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={() => navigateTo('suppliers')}
            className="group bg-white rounded-3xl p-6 border border-[#E1E8E3] hover:border-[#168568] shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center p-2 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100/60 transition-colors">
                <MapPin className="w-10 h-10 text-[#168568] group-hover:scale-115 transition-transform duration-300" />
              </div>
              <h3 className="font-bold text-lg text-[#102B2A] text-center mb-1 group-hover:text-[#168568] transition-colors">
                Find Nearby Suppliers
              </h3>
              <p className="text-xs text-[#697570] text-center leading-relaxed">
                Locate verified gas depots with live interactive street map routing in Lagos.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-sm font-bold text-[#168568] group-hover:text-[#0C4940]">
              <span>Search Suppliers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION (Simple 4 steps with connector lines) */}
      <section className="bg-[#F3F6F4] py-16 border-y border-[#E1E8E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#168568]">
              SIMPLE STEPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#102B2A]">
              How It Works
            </h2>
            <p className="text-sm text-[#697570]">
              From your phone to your kitchen burner in 4 straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-3xl border border-[#E1E8E3] hover:border-[#168568] relative space-y-3 shadow-xs hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="w-7 h-7 rounded-full bg-[#168568] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  1
                </span>
              </div>
              <h3 className="font-bold text-base text-[#102B2A]">
                Enter Your Location
              </h3>
              <p className="text-xs text-[#697570] leading-relaxed">
                Tell us where you are in Lagos to find nearby certified suppliers and get accurate delivery estimates.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-3xl border border-[#E1E8E3] hover:border-[#168568] relative space-y-3 shadow-xs hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="w-7 h-7 rounded-full bg-[#168568] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  2
                </span>
              </div>
              <h3 className="font-bold text-base text-[#102B2A]">
                Choose Supplier or Product
              </h3>
              <p className="text-xs text-[#697570] leading-relaxed">
                Compare verified prices, cylinder sizes, and choose between doorstep exchange or pickup refill.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-3xl border border-[#E1E8E3] hover:border-[#168568] relative space-y-3 shadow-xs hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#F0AD45]" />
                </div>
                <span className="w-7 h-7 rounded-full bg-[#168568] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  3
                </span>
              </div>
              <h3 className="font-bold text-base text-[#102B2A]">
                Place Your Order
              </h3>
              <p className="text-xs text-[#697570] leading-relaxed">
                Pay securely online or pay on delivery via POS/transfer after inspecting your cylinder seal.
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-3xl border border-[#E1E8E3] hover:border-[#168568] relative space-y-3 shadow-xs hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="w-7 h-7 rounded-full bg-[#168568] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  4
                </span>
              </div>
              <h3 className="font-bold text-base text-[#102B2A]">
                Get It Delivered
              </h3>
              <p className="text-xs text-[#697570] leading-relaxed">
                Track your rider on real street maps. We test for leaks at your door and ensure your kitchen is safe to cook.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. ANIMATED PRODUCTS CAROUSEL SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <ProductsCarousel />
      </section>

      {/* 5. DUAL BANNERS (For Households vs For Businesses) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Banner 1: For Households */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#102B2A] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl border border-[#0C4940]"
          >
            <div className="space-y-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                For Households
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
                Reliable Gas Delivery <br />
                at Your Convenience
              </h3>
              
              <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/90 pt-1">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>No more carrying heavy gas cylinders to refill stations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Trusted, licensed, and verified suppliers in Lagos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Flexible delivery options: Instant exchange or pickup</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Affordable and transparent pricing with no hidden charges</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 relative z-10">
              <button
                onClick={() => setRefillModalOpen(true)}
                className="bg-white text-[#102B2A] hover:bg-emerald-50 text-sm font-bold px-6 py-3.5 rounded-2xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Order Gas Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Banner 2: For Businesses & Suppliers */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-gradient-to-br from-[#0C4940] to-[#102B2A] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl border border-[#168568]/40"
          >
            <div className="space-y-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F0AD45]">
                For Businesses & Suppliers
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
                Grow Your Gas Business <br />
                With More Customers
              </h3>

              <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/90 pt-1">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F0AD45] shrink-0" />
                  <span>Reach thousands of gas consumers in Lagos and beyond</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F0AD45] shrink-0" />
                  <span>Manage your stock, orders, and delivery riders in one dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F0AD45] shrink-0" />
                  <span>Build your business with our enterprise logistics platform</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F0AD45] shrink-0" />
                  <span>Dedicated merchant account manager and fast payouts</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 relative z-10">
              <button
                onClick={() => navigateTo('supplier-portal')}
                className="bg-[#168568] hover:bg-[#0D7A5F] text-white text-sm font-bold px-6 py-3.5 rounded-2xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Become a Supplier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 6. SAFETY FIRST SECTION WITH INTERACTIVE CYLINDER EXPIRY TOOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#168568]">
            SAFETY FIRST
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#102B2A]">
            We Promote Safe Usages of LPG
          </h2>
          <p className="text-sm text-[#697570]">
            Cooking gas convenience should never compromise home safety.
          </p>
        </div>

        {/* 4 Safety Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setSafetyModalOpen(true)}
            className="bg-white rounded-3xl border border-[#E1E8E3] hover:border-[#168568] p-6 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#102B2A] group-hover:text-[#168568] transition-colors">
                Safe Handling Tips
              </h3>
              <p className="text-xs text-[#697570] leading-relaxed">
                Learn how to handle, place and transport LPG cylinders safely at home.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#168568] group-hover:text-[#0C4940]">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setSafetyModalOpen(true)}
            className="bg-white rounded-3xl border border-[#E1E8E3] hover:border-[#168568] p-6 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                <Flame className="w-6 h-6 text-[#F0AD45]" />
              </div>
              <h3 className="font-bold text-base text-[#102B2A] group-hover:text-[#168568] transition-colors">
                Detecting Gas Leaks
              </h3>
              <p className="text-xs text-[#697570] leading-relaxed">
                Know the signs of a leak and perform the soapy water test correctly.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#168568] group-hover:text-[#0C4940]">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setSafetyModalOpen(true)}
            className="bg-white rounded-3xl border border-[#E1E8E3] hover:border-[#168568] p-6 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#102B2A] group-hover:text-[#168568] transition-colors">
                Storage Guidelines
              </h3>
              <p className="text-xs text-[#697570] leading-relaxed">
                Keep your cylinders ventilated, away from direct sunlight and heat sparks.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#168568] group-hover:text-[#0C4940]">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setSafetyModalOpen(true)}
            className="bg-white rounded-3xl border border-[#E1E8E3] hover:border-[#168568] p-6 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                <PhoneCall className="w-6 h-6 text-[#168568]" />
              </div>
              <h3 className="font-bold text-base text-[#102B2A] group-hover:text-[#168568] transition-colors">
                Emergency Support
              </h3>
              <p className="text-xs text-[#697570] leading-relaxed">
                Immediate protocols and emergency hotline for rapid assistance in Lagos.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#168568] group-hover:text-[#0C4940]">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

        </div>

        {/* Interactive Cylinder Expiry Calculator Widget */}
        <div className="pt-4">
          <CylinderExpiryChecker />
        </div>
      </section>

    </div>
  );
};
