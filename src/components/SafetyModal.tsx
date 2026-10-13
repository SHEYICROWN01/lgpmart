import React from 'react';
import { useApp } from '../context/AppContext';
import { X, AlertTriangle, ShieldCheck, PhoneCall, Flame, Check, HelpCircle } from 'lucide-react';
import { SAFETY_TIPS } from '../data/mockData';

export const SafetyModal: React.FC = () => {
  const { safetyModalOpen, setSafetyModalOpen } = useApp();

  if (!safetyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E1E8E3]">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#0C4940] text-white p-5 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6 text-[#F0AD45]" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">LPG Safety & Emergency Centre</h3>
              <p className="text-xs text-emerald-200/90">
                Official safety guidelines & standard precautions for Nigerian households
              </p>
            </div>
          </div>
          <button
            onClick={() => setSafetyModalOpen(false)}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Emergency Alert Box */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-red-900">
                Smell Gas Right Now? Take Immediate Action:
              </h4>
              <ul className="text-xs text-red-800 space-y-1 list-disc list-inside">
                <li><strong>DO NOT</strong> switch on or off any electric wall switch, fan, or light.</li>
                <li><strong>DO NOT</strong> light matches, lighters, or cell phones near the kitchen.</li>
                <li>Immediately turn off the cylinder valve / regulator clock-wise.</li>
                <li>Open all doors and windows wide for cross-ventilation.</li>
                <li>Evacuate everyone and call our safety emergency team.</li>
              </ul>
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href="tel:112"
                  className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Call 112 (Lagos Emergency)
                </a>
                <a
                  href="tel:+2348001234567"
                  className="inline-flex items-center gap-1.5 bg-[#102B2A] hover:bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#F0AD45]" />
                  Gas Now Now Rapid Support: 0800 123 4567
                </a>
              </div>
            </div>
          </div>

          {/* Soap Water Leak Detection Guide */}
          <div className="border border-[#E1E8E3] rounded-xl p-5 space-y-3 bg-[#F8FAF8]">
            <h4 className="text-sm font-bold text-[#102B2A] flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#168568]" />
              How to Perform the Soapy Water Leak Test (Every Refill)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-[#E1E8E3]">
                <span className="font-bold text-[#168568] block mb-1">Step 1: Mix Solution</span>
                <p className="text-[#697570]">
                  Mix equal parts liquid dishwashing soap or detergent with warm water in a small cup.
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#E1E8E3]">
                <span className="font-bold text-[#168568] block mb-1">Step 2: Apply to Joints</span>
                <p className="text-[#697570]">
                  Using a sponge or cloth, dab the soapy mixture around cylinder valve, regulator connection, and hose ends.
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#E1E8E3]">
                <span className="font-bold text-[#168568] block mb-1">Step 3: Watch for Bubbles</span>
                <p className="text-[#697570]">
                  If bubbles start growing or expanding, there is a gas leak! Turn off valve and replace the rubber washer.
                </p>
              </div>
            </div>
          </div>

          {/* Standard Safety Best Practices */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#102B2A]">
              Essential LPG Safety Best Practices
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SAFETY_TIPS.map((tip) => (
                <div key={tip.id} className="p-3.5 rounded-xl border border-[#E1E8E3] bg-white space-y-1">
                  <div className="flex items-center gap-2 text-[#102B2A] font-bold">
                    <Check className="w-3.5 h-3.5 text-[#168568] shrink-0" />
                    <span>{tip.title}</span>
                  </div>
                  <p className="text-[#697570] text-[11px] leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Expiry Date Check Tip */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-xs text-emerald-900">
            <HelpCircle className="w-4 h-4 text-[#168568] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">How to Check Cylinder Expiry Date:</span>
              <p className="text-emerald-800">
                Look at the 3 inner vertical stay plates supporting the top ring collar. You will find markings like <strong>A 28</strong> (Q1 2028), <strong>B 29</strong> (Q2 2029), <strong>C 30</strong> (Q3 2030), or <strong>D 31</strong> (Q4 2031). Never use an expired cylinder. Every cylinder delivered on Gas Now Now is tested within active certification dates.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-[#E1E8E3] p-4 bg-[#F8FAF8] rounded-b-2xl flex justify-end">
          <button
            onClick={() => setSafetyModalOpen(false)}
            className="px-5 py-2 bg-[#168568] text-white text-xs font-semibold rounded-lg hover:bg-[#0C4940] transition-colors cursor-pointer"
          >
            I Understand the Safety Rules
          </button>
        </div>

      </div>
    </div>
  );
};
