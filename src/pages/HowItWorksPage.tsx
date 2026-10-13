import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  CheckCircle2,
  Truck,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Layers,
  Sparkles,
  Flame,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { navigateTo, setRefillModalOpen } = useApp();

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-20">
      
      {/* Header */}
      <div className="bg-[#102B2A] text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs text-emerald-300">
            <button onClick={() => navigateTo('home')} className="hover:underline">Home</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">How It Works</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display">
            How Gas Now Now Delivers Cooking Gas in Lagos
          </h1>
          <p className="text-sm text-emerald-100/80 max-w-2xl">
            No more lifting heavy cylinders, haggling over arbitrary refill prices, or dealing with underfilled gas bottles. Here is how our on-demand energy platform works.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
        
        {/* Step-by-Step Breakdown */}
        <div className="space-y-6">
          {[
            {
              num: '01',
              title: 'Select Your Delivery Location',
              desc: 'Enter your address or neighbourhood anywhere in Lagos (Ikeja, Surulere, Lekki, Victoria Island, Yaba, Gbagada, etc.). Our system matches you with the closest NMDPRA-licensed gas plants.',
              tag: 'Smart Geo-Routing',
            },
            {
              num: '02',
              title: 'Choose Refill Method or Shop Accessories',
              desc: 'Choose between "Instant Doorstep Cylinder Exchange" (where our courier brings a tested, full cylinder and swaps your empty on the spot) or "Pick Up, Refill & Return" (where we refill your specific cylinder and bring it back in 90 mins).',
              tag: 'Tailored Fulfilment',
            },
            {
              num: '03',
              title: 'Accurate Tare-Weight Verification',
              desc: 'Every cylinder has its empty weight stamped on the collar (Tare Weight). At the depot, electronic digital scales deduct the tare weight to ensure you receive 100% of the exact gas quantity paid for.',
              tag: 'Zero Underfilling Guarantee',
            },
            {
              num: '04',
              title: 'Doorstep Delivery & Mandatory Leak Inspection',
              desc: 'Our dispatch courier arrives with branded delivery trikes or vans. Before you pay, the courier conducts a live soapy water leak test and verifies the valve washer seal in your presence.',
              tag: 'Safety Verified Handover',
            },
          ].map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-3xl border border-[#E1E8E3] p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 shadow-xs"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#168568] flex items-center justify-center font-display font-extrabold text-2xl shrink-0">
                {step.num}
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold font-display text-[#102B2A]">
                    {step.title}
                  </h3>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    {step.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#697570] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table: Traditional vs Gas Now Now */}
        <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-xl font-bold font-display text-[#102B2A]">
            Traditional Gas Refill vs. Gas Now Now Experience
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#E1E8E3] text-[#697570] uppercase">
                  <th className="pb-3 font-semibold">Aspect</th>
                  <th className="pb-3 font-semibold text-red-600">Traditional Gas Station</th>
                  <th className="pb-3 font-semibold text-[#168568]">Gas Now Now Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[#172321]">
                <tr>
                  <td className="py-3 font-bold">Physical Effort</td>
                  <td className="py-3 text-[#697570]">Carrying heavy 12.5kg / 25kg cylinder to car or okada</td>
                  <td className="py-3 text-emerald-800 font-bold">Delivered straight to your kitchen door</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold">Weight Accuracy</td>
                  <td className="py-3 text-[#697570]">Unchecked mechanical scales, frequent underfilling</td>
                  <td className="py-3 text-emerald-800 font-bold">Electronic digital tare weight calibrated</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold">Pricing</td>
                  <td className="py-3 text-[#697570]">Inconsistent prices and surprise station surcharges</td>
                  <td className="py-3 text-emerald-800 font-bold">Clear, transparent price per kg</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold">Safety Inspection</td>
                  <td className="py-3 text-[#697570]">Rarely tested for valve leaks after refilling</td>
                  <td className="py-3 text-emerald-800 font-bold">Mandatory soapy water leak test upon arrival</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#102B2A] text-white rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold font-display">Ready for Seamless Cooking Gas Delivery?</h3>
          <p className="text-xs text-emerald-100/80 max-w-md mx-auto">
            Join thousands of households across Lagos who never carry heavy gas cylinders again.
          </p>
          <button
            onClick={() => setRefillModalOpen(true)}
            className="bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Order Your Refill Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
