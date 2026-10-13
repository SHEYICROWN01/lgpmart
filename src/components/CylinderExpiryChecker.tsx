import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, AlertTriangle, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CylinderExpiryChecker: React.FC = () => {
  const { setRefillModalOpen } = useApp();
  const [selectedQuarter, setSelectedQuarter] = useState<'A' | 'B' | 'C' | 'D'>('B');
  const [selectedYear, setSelectedYear] = useState<number>(29); // e.g. 2029

  const quarterNames: Record<'A' | 'B' | 'C' | 'D', string> = {
    A: 'Quarter 1 (Jan – Mar)',
    B: 'Quarter 2 (Apr – Jun)',
    C: 'Quarter 3 (Jul – Sep)',
    D: 'Quarter 4 (Oct – Dec)',
  };

  // Base year is current year 2026
  const currentYearShort = 26;
  const isExpired = selectedYear < currentYearShort;
  const isDueSoon = selectedYear === currentYearShort;
  const isValid = selectedYear > currentYearShort;

  return (
    <div className="bg-gradient-to-br from-white to-[#F8FAF8] rounded-2xl sm:rounded-3xl border border-[#E1E8E3] p-4 sm:p-8 shadow-xs space-y-5 sm:space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#168568]">
            Interactive Safety Tool
          </span>
          <h3 className="text-xl font-bold font-display text-[#102B2A]">
            Check Your Cylinder Expiry & Test Date
          </h3>
          <p className="text-xs text-[#697570] mt-0.5">
            Look at the 3 inner stay plates holding the cylinder collar handle. What code is stamped there?
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-[#168568]" />
          SON & NMDPRA Standard
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Inputs */}
        <div className="md:col-span-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#102B2A] mb-2">
              1. Select Quarter Letter (A, B, C, or D):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['A', 'B', 'C', 'D'] as const).map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setSelectedQuarter(q)}
                  className={`py-2.5 px-3 rounded-xl border text-center font-bold text-sm transition-all cursor-pointer ${
                    selectedQuarter === q
                      ? 'border-[#168568] bg-emerald-50 text-[#168568] ring-2 ring-[#168568]/20 shadow-xs'
                      : 'border-[#E1E8E3] hover:border-slate-300 text-[#102B2A] bg-white'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-[#697570] mt-1 block">
              {selectedQuarter}: {quarterNames[selectedQuarter]}
            </span>
          </div>

          <div>
            <label className="block font-bold text-[#102B2A] mb-2">
              2. Select Year Digits (e.g., 27 = 2027):
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[24, 25, 26, 27, 28, 29, 30, 31, 32, 33].map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setSelectedYear(y)}
                  className={`py-2 px-2 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                    selectedYear === y
                      ? 'border-[#168568] bg-emerald-50 text-[#168568] ring-2 ring-[#168568]/20 shadow-xs'
                      : 'border-[#E1E8E3] hover:border-slate-300 text-[#102B2A] bg-white'
                  }`}
                >
                  '{y}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#F3F6F4] p-3 rounded-xl text-[11px] text-[#697570]">
            Selected Code: <strong className="text-[#102B2A] font-mono font-bold text-xs">{selectedQuarter} {selectedYear}</strong> (Quarter {selectedQuarter} of 20{selectedYear})
          </div>
        </div>

        {/* Right Animated Status Card */}
        <div className="md:col-span-6">
          <motion.div
            key={`${selectedQuarter}-${selectedYear}`}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-2xl border ${
              isExpired
                ? 'bg-red-50 border-red-200 text-red-950'
                : isDueSoon
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            } space-y-3 shadow-xs`}
          >
            <div className="flex items-center gap-2.5">
              {isExpired ? (
                <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              ) : isDueSoon ? (
                <div className="w-9 h-9 rounded-xl bg-[#F0AD45] text-slate-900 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-[#168568] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                  Certification Status
                </span>
                <h4 className="font-bold text-base font-display">
                  {isExpired
                    ? 'Expired / Hydro-Test Required'
                    : isDueSoon
                    ? 'Due for Requalification This Year'
                    : 'Safe & Certified Active Lifespan'}
                </h4>
              </div>
            </div>

            <p className="text-xs leading-relaxed opacity-90">
              {isExpired ? (
                <>
                  This cylinder reached its statutory test date in <strong>20{selectedYear}</strong>. Operating uncertified cylinders carries severe risk of seam micro-ruptures. Never refill an expired bottle.
                </>
              ) : isDueSoon ? (
                <>
                  This cylinder is due for statutory hydrostatic pressure requalification during <strong>{quarterNames[selectedQuarter]} 20{selectedYear}</strong>. Schedule an exchange soon.
                </>
              ) : (
                <>
                  Excellent! This cylinder is within statutory testing guidelines until <strong>{quarterNames[selectedQuarter]} 20{selectedYear}</strong>. You have approximately <strong>{selectedYear - currentYearShort} years</strong> of safe service remaining.
                </>
              )}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setRefillModalOpen(true)}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer ${
                  isExpired
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-[#168568] hover:bg-[#0C4940] text-white'
                }`}
              >
                <span>{isExpired ? 'Exchange Expired Cylinder for New One' : 'Order Doorstep Refill'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>

      </div>

    </div>
  );
};
