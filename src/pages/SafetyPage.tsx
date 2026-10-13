import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  Flame,
  Check,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { SAFETY_TIPS } from '../data/mockData';

export const SafetyPage: React.FC = () => {
  const { navigateTo, setSafetyModalOpen } = useApp();

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-20">
      
      {/* Header */}
      <div className="bg-[#102B2A] text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs text-emerald-300">
            <button onClick={() => navigateTo('home')} className="hover:underline">Home</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">Safety Centre</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display">
            LPG Safety & Consumer Protection Centre
          </h1>
          <p className="text-sm text-emerald-100/80 max-w-2xl">
            At LPGmart, convenience never compromises safety. Learn how cooking gas works, how to detect micro-leaks, and our strict supplier verification standards in Nigeria.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
        
        {/* Emergency Callout Card */}
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-red-950">
                Smell Gas Right Now? Urgent Action Protocol
              </h2>
              <p className="text-xs sm:text-sm text-red-900 leading-relaxed">
                Cooking gas is naturally odorless; ethyl mercaptan is intentionally added so you can detect even minute leaks by its pungent cabbage-like smell.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-red-950 font-medium">
            <div className="bg-white/80 p-3.5 rounded-xl border border-red-200">
              1. <strong>NO SPARKS:</strong> Do not flip any wall light switches, un-plug fridge, or ignite matches.
            </div>
            <div className="bg-white/80 p-3.5 rounded-xl border border-red-200">
              2. <strong>SHUT VALVE:</strong> Turn regulator lever clockwise to the OFF position immediately.
            </div>
            <div className="bg-white/80 p-3.5 rounded-xl border border-red-200">
              3. <strong>VENTILATE:</strong> Open all kitchen windows and doors wide. Evacuate premises.
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="tel:112"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 112 (Lagos State Emergency Service)</span>
            </a>
            <a
              href="tel:+2348001234567"
              className="inline-flex items-center gap-2 bg-[#102B2A] hover:bg-black text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-[#F0AD45]" />
              <span>LPGmart Safety Line: 0800 123 4567</span>
            </a>
          </div>
        </div>

        {/* Soap Water Leak Test Visual Tutorial */}
        <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#168568]">
              Standard Operating Procedure
            </span>
            <h2 className="text-2xl font-bold font-display text-[#102B2A]">
              The 3-Step Soapy Water Test
            </h2>
            <p className="text-xs text-[#697570]">
              Every LPGmart dispatch courier performs this test in front of you. You should also perform it whenever replacing a cylinder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-[#E1E8E3] space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#168568] text-white font-bold flex items-center justify-center text-sm">
                1
              </span>
              <h3 className="font-bold text-sm text-[#102B2A]">Prepare Soapy Solution</h3>
              <p className="text-[#697570] leading-relaxed">
                Take a small bowl with water and add a few drops of dish soap or liquid detergent until frothy.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-[#E1E8E3] space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#168568] text-white font-bold flex items-center justify-center text-sm">
                2
              </span>
              <h3 className="font-bold text-sm text-[#102B2A]">Apply Along Joint Points</h3>
              <p className="text-[#697570] leading-relaxed">
                With a sponge or brush, apply lather to the cylinder valve, regulator collar, and both ends of the orange hose clamps.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-[#E1E8E3] space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#168568] text-white font-bold flex items-center justify-center text-sm">
                3
              </span>
              <h3 className="font-bold text-sm text-[#102B2A]">Observe for Growing Bubbles</h3>
              <p className="text-[#697570] leading-relaxed">
                If the soap froth remains still, connections are gas-tight. If bubbles inflate and grow, there is a leak—do NOT ignite flame!
              </p>
            </div>
          </div>
        </div>

        {/* Cylinder Expiry Date Guide */}
        <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#168568] flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-[#102B2A]">
                Understanding Cylinder Expiry & Test Dates
              </h2>
              <p className="text-xs text-[#697570] mt-1">
                LPG cylinders have a statutory lifespan of 10 to 15 years and must undergo hydro-static requalification testing every 5 years under NMDPRA regulations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-[#E1E8E3] bg-[#F8FAF8] space-y-1">
              <span className="font-bold text-[#168568] text-sm block">A = Quarter 1</span>
              <p className="text-[#697570]">January – March</p>
              <span className="text-[11px] text-[#102B2A] font-semibold block">e.g. A 29 = Mar 2029</span>
            </div>

            <div className="p-4 rounded-xl border border-[#E1E8E3] bg-[#F8FAF8] space-y-1">
              <span className="font-bold text-[#168568] text-sm block">B = Quarter 2</span>
              <p className="text-[#697570]">April – June</p>
              <span className="text-[11px] text-[#102B2A] font-semibold block">e.g. B 30 = Jun 2030</span>
            </div>

            <div className="p-4 rounded-xl border border-[#E1E8E3] bg-[#F8FAF8] space-y-1">
              <span className="font-bold text-[#168568] text-sm block">C = Quarter 3</span>
              <p className="text-[#697570]">July – September</p>
              <span className="text-[11px] text-[#102B2A] font-semibold block">e.g. C 28 = Sep 2028</span>
            </div>

            <div className="p-4 rounded-xl border border-[#E1E8E3] bg-[#F8FAF8] space-y-1">
              <span className="font-bold text-[#168568] text-sm block">D = Quarter 4</span>
              <p className="text-[#697570]">October – December</p>
              <span className="text-[11px] text-[#102B2A] font-semibold block">e.g. D 31 = Dec 2031</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
