import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Truck, Flame, MapPin } from 'lucide-react';

const RECENT_DISPATCHES = [
  {
    courier: 'Babatunde O.',
    action: 'delivered 12.5kg refill',
    area: 'GRA Ikeja, Lagos',
    time: '4 mins ago',
    icon: '🛵',
  },
  {
    courier: 'Lagos Gas Hub',
    action: 'dispatched 6kg cylinder exchange',
    area: 'Bode Thomas, Surulere',
    time: '8 mins ago',
    icon: '⚡',
  },
  {
    courier: 'Olumide F.',
    action: 'delivered safety regulator kit',
    area: 'Lekki Phase 1, Lagos',
    time: '12 mins ago',
    icon: '📦',
  },
  {
    courier: 'PrimeGas Logistics',
    action: 'calibrated 25kg commercial tank',
    area: 'Herbert Macaulay, Yaba',
    time: '16 mins ago',
    icon: '⚖️',
  },
  {
    courier: 'Island PureGas',
    action: 'completed doorstep exchange',
    area: 'Adeola Odeku, Victoria Island',
    time: '21 mins ago',
    icon: '🌿',
  },
];

export const LiveActivityTicker: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % RECENT_DISPATCHES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const item = RECENT_DISPATCHES[index];

  return (
    <div className="bg-[#0C4940]/90 border-t border-[#168568]/30 py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
        
        <div className="flex items-center gap-2 text-emerald-200/80">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-bold text-white uppercase tracking-wider text-[11px]">
            Live in Lagos:
          </span>
        </div>

        {/* Animated Dispatch News Banner */}
        <div className="flex-1 overflow-hidden h-6 relative flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex items-center gap-2 text-emerald-100 text-xs truncate"
            >
              <span className="text-sm">{item.icon}</span>
              <strong className="text-white font-semibold">{item.courier}</strong>
              <span className="text-emerald-200/90">{item.action} in</span>
              <span className="text-[#F0AD45] font-semibold">{item.area}</span>
              <span className="text-emerald-300/50 hidden sm:inline">·</span>
              <span className="text-emerald-300/70 text-[11px] hidden sm:inline">{item.time}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-[11px] text-emerald-300 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#F0AD45]" />
          <span>Average delivery time: 38 mins</span>
        </div>

      </div>
    </div>
  );
};
