import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Compass,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Truck,
  CheckCircle2,
  PhoneCall,
  Search,
  Flame,
  Wrench,
  Package,
  Layers,
  ChevronRight,
  Check,
} from 'lucide-react';
import { MOCK_PRODUCTS, ASSET_IMAGES, LAGOS_AREAS } from '../data/mockData';

export const HomePage: React.FC = () => {
  const {
    navigateTo,
    selectedArea,
    setSelectedArea,
    setRefillModalOpen,
    setSafetyModalOpen,
    addToCart,
    setSelectedProduct,
    showToast,
  } = useApp();

  const [locationInput, setLocationInput] = useState(selectedArea);
  const [locating, setLocating] = useState(false);

  const handleUseLocation = () => {
    setLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocating(false);
          setLocationInput('Ikeja GRA, Lagos');
          setSelectedArea('Ikeja');
          showToast('Location updated to Ikeja GRA, Lagos');
        },
        () => {
          setLocating(false);
          setLocationInput('Surulere, Lagos');
          setSelectedArea('Surulere');
          showToast('Defaulted to Surulere, Lagos');
        },
        { timeout: 3000 }
      );
    } else {
      setLocating(false);
      setLocationInput('Ikeja, Lagos');
      setSelectedArea('Ikeja');
    }
  };

  const handleFindGas = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (locationInput) {
      setSelectedArea(locationInput.includes('Lagos') ? locationInput.split(',')[0].trim() : locationInput);
    }
    navigateTo('suppliers');
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      
      {/* 1. HERO SECTION (Dark Pine #102B2A with Nigerian Courier composition) */}
      <section className="bg-[#102B2A] text-white pt-8 sm:pt-14 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Subtle decorative radial glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#168568]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-[#0C4940]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headline, Copy & Location Search */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-extrabold font-display leading-[1.12] tracking-tight text-white">
                  Cooking Gas <br />
                  Delivered to <br className="hidden sm:block" />
                  <span className="text-[#F0AD45]">Your Door</span>
                </h1>

                <p className="text-base sm:text-lg text-emerald-100/85 max-w-xl font-normal leading-relaxed">
                  Find trusted gas suppliers near you, refill your cylinder, and shop quality accessories — all in one place.
                </p>
              </div>

              {/* Functional Location Search Card */}
              <form
                onSubmit={handleFindGas}
                className="bg-white p-2 sm:p-2.5 rounded-2xl shadow-xl max-w-xl text-[#172321] border border-white/20"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[#F3F6F4] rounded-xl border border-transparent focus-within:border-[#168568] focus-within:bg-white transition-all">
                    <MapPin className="w-5 h-5 text-[#168568] shrink-0" />
                    <input
                      type="text"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      placeholder="Enter your area or neighbourhood"
                      className="w-full bg-transparent text-sm font-medium text-[#172321] placeholder-[#697570] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleUseLocation}
                      disabled={locating}
                      className="text-xs text-[#168568] hover:text-[#0C4940] font-semibold whitespace-nowrap px-1.5 py-1 rounded hover:bg-emerald-50 transition-colors cursor-pointer"
                    >
                      {locating ? 'Locating...' : 'Use my location'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#168568] hover:bg-[#0C4940] text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <span>Find Gas Near Me</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Popular quick areas in Lagos */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-200/80 pt-1">
                <span className="text-slate-300">Popular areas:</span>
                {['Ikeja', 'Lekki Phase 1', 'Surulere', 'Yaba', 'Victoria Island'].map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => {
                      setLocationInput(area);
                      setSelectedArea(area);
                      navigateTo('suppliers');
                    }}
                    className="hover:text-white hover:underline transition-colors cursor-pointer"
                  >
                    {area} ·
                  </button>
                ))}
              </div>

            </div>

            {/* Right Column: Authentic Editorial Photo with Floating Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-[#0C4940]/40 aspect-4/3 sm:aspect-5/4 lg:aspect-4/3">
                <img
                  src={ASSET_IMAGES.heroDelivery}
                  alt="Professional Nigerian gas delivery courier handing a cooking gas cylinder to a happy customer in Lagos"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle soft gradient overlay on bottom for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Fast Delivery Badge */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white text-[#102B2A] py-2.5 px-4 rounded-xl shadow-lg border border-[#E1E8E3] flex items-center gap-3 backdrop-blur-md">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-[#168568]">
                    <Truck className="w-5 h-5 text-[#168568]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#168568] block">
                      Fast Delivery
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-[#102B2A] block">
                      45 mins – 2 hours
                    </span>
                  </div>
                </div>

                {/* Bottom Trust Stamp on Image */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white/95 text-xs bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-lg">
                  <div className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#F0AD45]" />
                    <span>Tare-weight verified refills</span>
                  </div>
                  <span className="text-[11px] text-emerald-300 font-semibold">100% Safe</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. TRUST STRIP (Integrated inside hero baseline matching mockup) */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-white/90">
              
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-white">Trusted Suppliers</span>
                  <span className="text-[11px] text-emerald-200/70 block">In Lagos & environs</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#F0AD45]" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-white">Transparent Pricing</span>
                  <span className="text-[11px] text-emerald-200/70 block">No hidden surcharge</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-white">Doorstep Delivery</span>
                  <span className="text-[11px] text-emerald-200/70 block">Heavy lifting handled</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-white">Safe & Reliable</span>
                  <span className="text-[11px] text-emerald-200/70 block">Standard leak tested</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES SECTION */}
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
          <div
            onClick={() => setRefillModalOpen(true)}
            className="group bg-white rounded-2xl p-6 border border-[#E1E8E3] hover:border-[#168568] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <img
                  src={ASSET_IMAGES.cylinderBlue}
                  alt="Gas Refill & Delivery"
                  className="max-h-20 object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-lg text-[#102B2A] text-center mb-1">
                Gas Refill & Delivery
              </h3>
              <p className="text-xs text-[#697570] text-center leading-relaxed">
                Order a refill and get it delivered or picked up from your home.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-sm font-bold text-[#168568] group-hover:text-[#0C4940]">
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Gas Cylinders */}
          <div
            onClick={() => navigateTo('shop')}
            className="group bg-white rounded-2xl p-6 border border-[#E1E8E3] hover:border-[#168568] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <img
                  src={ASSET_IMAGES.cylinderRed}
                  alt="Gas Cylinders"
                  className="max-h-20 object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-lg text-[#102B2A] text-center mb-1">
                Gas Cylinders
              </h3>
              <p className="text-xs text-[#697570] text-center leading-relaxed">
                Buy new cylinders of all sizes from trusted and verified suppliers.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-sm font-bold text-[#168568] group-hover:text-[#0C4940]">
              <span>Shop Cylinders</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Accessories */}
          <div
            onClick={() => navigateTo('shop')}
            className="group bg-white rounded-2xl p-6 border border-[#E1E8E3] hover:border-[#168568] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <img
                  src={ASSET_IMAGES.regulatorHose}
                  alt="Accessories"
                  className="max-h-20 object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-lg text-[#102B2A] text-center mb-1">
                Accessories
              </h3>
              <p className="text-xs text-[#697570] text-center leading-relaxed">
                Regulators, hoses, burners, cookers and safety valves.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-sm font-bold text-[#168568] group-hover:text-[#0C4940]">
              <span>Shop Accessories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Find Nearby Suppliers */}
          <div
            onClick={() => navigateTo('suppliers')}
            className="group bg-white rounded-2xl p-6 border border-[#E1E8E3] hover:border-[#168568] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#168568]">
                  <MapPin className="w-8 h-8 text-[#168568] group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="font-bold text-lg text-[#102B2A] text-center mb-1">
                Find Nearby Suppliers
              </h3>
              <p className="text-xs text-[#697570] text-center leading-relaxed">
                Locate verified gas depots and stations near you in Lagos.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-sm font-bold text-[#168568] group-hover:text-[#0C4940]">
              <span>Search Suppliers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION (Simple 4 steps) */}
      <section className="bg-[#F3F6F4] py-14 border-y border-[#E1E8E3]">
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
            <div className="bg-white p-6 rounded-2xl border border-[#E1E8E3] relative space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="w-7 h-7 rounded-full bg-[#168568] text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
              </div>
              <h3 className="font-bold text-base text-[#102B2A]">
                Enter Your Location
              </h3>
              <p className="text-xs text-[#697570] leading-relaxed">
                Tell us where you are in Lagos to find nearby certified suppliers and get accurate delivery estimates.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E1E8E3] relative space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="w-7 h-7 rounded-full bg-[#168568] text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
              </div>
              <h3 className="font-bold text-base text-[#102B2A]">
                Choose Supplier or Product
              </h3>
              <p className="text-xs text-[#697570] leading-relaxed">
                Compare verified prices, cylinder sizes, and choose between doorstep exchange or pickup refill.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E1E8E3] relative space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#F0AD45]" />
                </div>
                <span className="w-7 h-7 rounded-full bg-[#168568] text-white font-bold text-xs flex items-center justify-center">
                  3
                </span>
              </div>
              <h3 className="font-bold text-base text-[#102B2A]">
                Place Your Order
              </h3>
              <p className="text-xs text-[#697570] leading-relaxed">
                Pay securely online or pay on delivery via POS/transfer after inspecting your cylinder seal.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-[#E1E8E3] relative space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="w-7 h-7 rounded-full bg-[#168568] text-white font-bold text-xs flex items-center justify-center">
                  4
                </span>
              </div>
              <h3 className="font-bold text-base text-[#102B2A]">
                Get It Delivered
              </h3>
              <p className="text-xs text-[#697570] leading-relaxed">
                Track your rider in real time. We test for leaks at your door and ensure your kitchen is safe to cook.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. POPULAR PRODUCTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#168568]">
              POPULAR PRODUCTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#102B2A]">
              Shop Gas Cylinders & Accessories
            </h2>
            <p className="text-sm text-[#697570]">
              Quality safety-tested products from certified manufacturers and distributors.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#168568] hover:text-[#0C4940] transition-colors cursor-pointer group"
          >
            <span>View All Products</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {MOCK_PRODUCTS.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#E1E8E3] hover:border-[#168568] p-4 flex flex-col justify-between transition-all hover:shadow-md group"
            >
              <div>
                {/* Product Image Frame */}
                <div
                  onClick={() => {
                    setSelectedProduct(product);
                    navigateTo('product-detail');
                  }}
                  className="aspect-square rounded-xl bg-[#F8FAF8] mb-3 p-2 flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div
                  onClick={() => {
                    setSelectedProduct(product);
                    navigateTo('product-detail');
                  }}
                  className="cursor-pointer"
                >
                  <h3 className="font-bold text-xs sm:text-sm text-[#102B2A] line-clamp-1 group-hover:text-[#168568] transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-extrabold text-sm sm:text-base text-[#102B2A] tabular-nums">
                      ₦{product.price.toLocaleString()}
                    </span>
                  </div>

                  <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded mt-1">
                    In Stock
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  addToCart({
                    product,
                    quantity: 1,
                    serviceType: product.category === 'cylinders' ? 'cylinder' : 'accessory',
                  });
                }}
                className="w-full mt-3 bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. DUAL BANNERS (For Households vs For Businesses) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Banner 1: For Households */}
          <div className="bg-[#102B2A] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-lg border border-[#0C4940]">
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
                className="bg-white text-[#102B2A] hover:bg-emerald-50 text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Order Gas Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Banner 2: For Businesses & Suppliers */}
          <div className="bg-gradient-to-br from-[#0C4940] to-[#102B2A] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-lg border border-[#168568]/40">
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
                className="bg-[#168568] hover:bg-[#0D7A5F] text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Become a Supplier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. SAFETY FIRST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div
            onClick={() => setSafetyModalOpen(true)}
            className="bg-white rounded-2xl border border-[#E1E8E3] hover:border-[#168568] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#102B2A]">
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
          </div>

          <div
            onClick={() => setSafetyModalOpen(true)}
            className="bg-white rounded-2xl border border-[#E1E8E3] hover:border-[#168568] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                <Flame className="w-6 h-6 text-[#F0AD45]" />
              </div>
              <h3 className="font-bold text-base text-[#102B2A]">
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
          </div>

          <div
            onClick={() => setSafetyModalOpen(true)}
            className="bg-white rounded-2xl border border-[#E1E8E3] hover:border-[#168568] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#102B2A]">
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
          </div>

          <div
            onClick={() => setSafetyModalOpen(true)}
            className="bg-white rounded-2xl border border-[#E1E8E3] hover:border-[#168568] p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168568] flex items-center justify-center">
                <PhoneCall className="w-6 h-6 text-[#168568]" />
              </div>
              <h3 className="font-bold text-base text-[#102B2A]">
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
          </div>

        </div>
      </section>

    </div>
  );
};
