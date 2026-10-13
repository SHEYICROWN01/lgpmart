import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#102B2A] text-white pt-12 sm:pt-16 pb-28 lg:pb-12 border-t border-[#0C4940]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#168568] to-[#0C4940] flex items-center justify-center text-white">
                <Flame className="w-6 h-6 text-[#F0AD45]" />
              </div>
              <div>
                <span className="text-2xl font-display font-extrabold tracking-tight text-white">
                  Gas <span className="text-[#168568]">Now Now</span>
                </span>
                <span className="text-[10px] text-emerald-200/70 block tracking-wider uppercase font-medium">
                  Express Cooking Gas Delivery
                </span>
              </div>
            </div>
            
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Your trusted platform for cooking gas delivery, certified cylinders, and verified kitchen accessories in Lagos and beyond. Safety, convenience, and transparent pricing at your doorstep.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#168568] flex items-center justify-center cursor-pointer transition-colors text-xs font-bold text-white">
                f
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#168568] flex items-center justify-center cursor-pointer transition-colors text-xs font-bold text-white">
                ig
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#168568] flex items-center justify-center cursor-pointer transition-colors text-xs font-bold text-white">
                𝕏
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#168568] flex items-center justify-center cursor-pointer transition-colors text-xs font-bold text-white">
                yt
              </span>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300/80">
              <ShieldCheck className="w-4 h-4 text-[#F0AD45]" />
              <span>Regulated in Nigeria · NMDPRA Standard Compliant</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-emerald-400 font-display">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => navigateTo('suppliers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Find Gas Suppliers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('safety')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Safety Centre
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('supplier-portal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Become a Supplier
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-emerald-400 font-display">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => navigateTo('faqs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('order-tracking')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('safety')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Return & Cylinder Exchange Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service & Privacy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-emerald-400 font-display">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F0AD45] shrink-0 mt-0.5" />
                <span>Lagos, Nigeria (Serving Mainland & Island)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F0AD45] shrink-0" />
                <a href="tel:+2348001234567" className="hover:text-white">
                  +234 800 123 4567
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F0AD45] shrink-0" />
                <a href="mailto:support@gasnownow.ng" className="hover:text-white">
                  support@gasnownow.ng
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-[#F0AD45] shrink-0" />
                <span>Mon – Sun, 8:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Gas Now Now. All rights reserved. Built for Nigerian Homes and Businesses.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('contact')} className="hover:text-white">
              Privacy Policy
            </button>
            <button onClick={() => navigateTo('contact')} className="hover:text-white">
              Terms of Use
            </button>
            <button onClick={() => navigateTo('safety')} className="hover:text-white">
              Safety Regulations
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
