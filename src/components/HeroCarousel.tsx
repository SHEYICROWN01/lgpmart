import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  ArrowRight,
  Truck,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Flame,
  Check,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { ASSET_IMAGES } from '../data/mockData';

export const HeroCarousel: React.FC = () => {
  const {
    selectedArea,
    setSelectedArea,
    navigateTo,
    setRefillModalOpen,
    showToast,
  } = useApp();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [locationInput, setLocationInput] = useState(selectedArea);
  const [locating, setLocating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const slides = [
    {
      id: 'slide-1',
      tag: 'EXPRESS COOKING GAS IN LAGOS',
      heading: (
        <>
          Cooking Gas <br />
          Delivered to <br className="hidden sm:block" />
          <span className="text-[#F0AD45]">Your Door</span>
        </>
      ),
      description:
        'Find trusted gas suppliers near you, refill your cylinder, and shop quality accessories — all in one convenient place in Lagos.',
      image: ASSET_IMAGES.heroDelivery,
      imageAlt: 'Friendly Nigerian delivery courier handing blue cooking gas cylinder to smiling customer',
      badgeTitle: 'Fast Delivery',
      badgeSubtitle: '45 mins – 2 hours',
      badgeIcon: Truck,
      trustLabel: 'Electronic Tare-Weight Calibrated',
      ctaText: 'Find Gas Near Me',
      ctaAction: () => navigateTo('suppliers'),
      secondaryCtaText: 'Instant Refill',
      secondaryAction: () => setRefillModalOpen(true),
    },
    {
      id: 'slide-2',
      tag: 'ZERO WAITING · INSTANT SWAP',
      heading: (
        <>
          Instant Doorstep <br />
          <span className="text-emerald-400">Cylinder Exchange</span>
        </>
      ),
      description:
        'Swap your empty 6kg, 12.5kg, or 25kg cylinder on the spot with a tested, pre-filled replacement. No carrying heavy metal, zero delays.',
      image: ASSET_IMAGES.cylinderBlue,
      imageAlt: 'Certified 12.5kg blue cooking gas cylinder ready for doorstep exchange',
      badgeTitle: 'Instant Swap',
      badgeSubtitle: 'Under 35 mins',
      badgeIcon: RefreshCw,
      trustLabel: '100% Free Soapy Water Leak Test',
      ctaText: 'Book Cylinder Swap',
      ctaAction: () => setRefillModalOpen(true),
      secondaryCtaText: 'Shop New Cylinders',
      secondaryAction: () => navigateTo('shop'),
    },
    {
      id: 'slide-3',
      tag: 'CERTIFIED KITCHEN SAFETY',
      heading: (
        <>
          Precision Regulators & <br />
          <span className="text-[#F0AD45]">Safety Equipment</span>
        </>
      ),
      description:
        'Protect your family with excess-flow shutoff regulators, volume gauge monitors, reinforced orange hoses, and certified gas cookers.',
      image: ASSET_IMAGES.regulatorHose,
      imageAlt: 'High pressure safety gas regulator with gauge meter and reinforced hose',
      badgeTitle: 'SON Certified',
      badgeSubtitle: 'Genuine Parts Only',
      badgeIcon: ShieldCheck,
      trustLabel: 'Free Safety O-Ring Included',
      ctaText: 'Explore Accessories',
      ctaAction: () => navigateTo('shop'),
      secondaryCtaText: 'Safety Guide',
      secondaryAction: () => navigateTo('safety'),
    },
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

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
      setSelectedArea(
        locationInput.includes('Lagos')
          ? locationInput.split(',')[0].trim()
          : locationInput
      );
    }
    navigateTo('suppliers');
  };

  const active = slides[currentSlide];
  const BadgeIcon = active.badgeIcon;

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Carousel Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              
              <div className="space-y-3 sm:space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 tracking-wider"
                >
                  <Flame className="w-3.5 h-3.5 text-[#F0AD45] animate-pulse" />
                  <span>{active.tag}</span>
                </motion.div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5.5xl font-extrabold font-display leading-[1.15] sm:leading-[1.12] tracking-tight text-white">
                  {active.heading}
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-emerald-100/85 max-w-xl font-normal leading-relaxed">
                  {active.description}
                </p>
              </div>

              {/* Functional Location Search Bar */}
              <form
                onSubmit={handleFindGas}
                className="bg-white p-2 rounded-2xl shadow-xl max-w-xl text-[#172321] border border-white/20"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[#F3F6F4] rounded-xl border border-transparent focus-within:border-[#168568] focus-within:bg-white transition-all">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#168568] shrink-0" />
                    <input
                      type="text"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      placeholder="Enter area or neighbourhood in Lagos"
                      className="w-full bg-transparent text-base sm:text-sm font-medium text-[#172321] placeholder-[#697570] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleUseLocation}
                      disabled={locating}
                      className="text-[11px] sm:text-xs text-[#168568] hover:text-[#0C4940] font-bold whitespace-nowrap px-1.5 py-1 rounded hover:bg-emerald-50 transition-colors cursor-pointer shrink-0"
                    >
                      {locating ? 'Locating...' : 'My location'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#168568] hover:bg-[#0C4940] text-white font-bold text-xs sm:text-sm px-5 py-3 sm:py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
                  >
                    <span>{active.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Action Buttons & Popular Areas */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={active.secondaryAction}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-sm active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F0AD45]" />
                  <span>{active.secondaryCtaText}</span>
                </button>

                <div className="flex items-center gap-1.5 text-xs text-emerald-200/80 overflow-x-auto no-scrollbar py-1">
                  <span className="text-slate-300 shrink-0">Quick areas:</span>
                  {['Ikeja', 'Lekki', 'Surulere', 'Yaba', 'Victoria Island'].map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => {
                        setLocationInput(area);
                        setSelectedArea(area);
                        navigateTo('suppliers');
                      }}
                      className="hover:text-white hover:underline transition-colors cursor-pointer shrink-0"
                    >
                      {area} ·
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-5 relative mt-2 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-[#0C4940]/40 aspect-4/3 sm:aspect-5/4 lg:aspect-4/3">
                <motion.img
                  key={active.image}
                  initial={{ scale: 1.04, opacity: 0.85 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={active.image}
                  alt={active.imageAlt}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Animated Floating Badge */}
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, type: 'spring' }}
                  className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-white text-[#102B2A] py-2 px-3 sm:py-2.5 sm:px-4 rounded-2xl shadow-xl border border-[#E1E8E3] flex items-center gap-2.5 sm:gap-3 backdrop-blur-md"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-[#168568] shrink-0">
                    <BadgeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#168568]" />
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#168568] block">
                      {active.badgeTitle}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-[#102B2A] block leading-tight">
                      {active.badgeSubtitle}
                    </span>
                  </div>
                </motion.div>

                {/* Bottom Trust Stamp on Image */}
                <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-3 sm:left-4 sm:right-4 flex items-center justify-between text-white/95 text-xs bg-black/65 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-white/10">
                  <div className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs truncate">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F0AD45] shrink-0" />
                    <span className="truncate">{active.trustLabel}</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-emerald-300 font-bold shrink-0 ml-1">Verified</span>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Controls & Indicators */}
        <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-white/10 mt-5 sm:mt-6 text-white text-xs">
          
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {slides.map((s, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-7 sm:w-8 bg-[#F0AD45]'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
            <span className="text-xs text-emerald-200/60 ml-2 font-mono">
              0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-[#168568] text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 hover:border-emerald-400 active:scale-90"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-[#168568] text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 hover:border-emerald-400 active:scale-90"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
