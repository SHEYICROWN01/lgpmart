import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Send,
  Clock,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';

export const FaqContactPage: React.FC<{ initialTab?: 'faqs' | 'contact' }> = ({ initialTab = 'faqs' }) => {
  const { navigateTo, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'faqs' | 'contact'>(initialTab);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const faqs = [
    {
      q: 'How does Doorstep Cylinder Exchange work?',
      a: 'When you choose Doorstep Exchange, our dispatch rider brings a pre-filled, leak-tested cylinder of your chosen capacity (e.g. 12.5kg) to your house and exchanges it with your empty cylinder on the spot. This takes under 45 minutes and requires zero waiting for refills.',
    },
    {
      q: 'What if I prefer my exact cylinder returned to me?',
      a: 'Choose "Pick Up, Refill & Return" in the refill booking flow. Our rider tags your cylinder with your unique order barcode, takes it to our licensed partner plant in your area, refills it using digital electronic tare scales, and brings it back to you within 90 minutes.',
    },
    {
      q: 'How do you guarantee I get the complete weight of gas?',
      a: 'Every certified cylinder has a Tare Weight stamped onto its metal collar (e.g., TW: 13.5 kg). When filled with 12.5 kg of LPG, the gross weight on the scale MUST be exactly 26.0 kg. Our riders carry portable digital hanging scales to verify the gross weight right before handover.',
    },
    {
      q: 'What payment methods do you accept in Lagos?',
      a: 'We accept Pay on Delivery via POS card swipe, instant direct bank transfer to our verified company accounts upon delivery, or cash. You can also pay securely online using debit cards via Paystack or Flutterwave.',
    },
    {
      q: 'Which areas in Lagos do you currently cover?',
      a: 'We cover all major Lagos Mainland and Island areas including Ikeja, GRA, Surulere, Yaba, Lekki Phase 1, Victoria Island, Ikoyi, Maryland, Gbagada, Festac, Magodo, and Ogba.',
    },
    {
      q: 'What happens if my cylinder fails the safety leak test upon delivery?',
      a: 'Safety is our absolute priority. If our courier detects any leak or damaged valve washer, we immediately replace the valve washer free of charge or swap the cylinder with another tested safe unit at no extra cost.',
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    showToast('Your message has been sent to our Lagos support desk!');
  };

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-20">
      
      {/* Header */}
      <div className="bg-[#102B2A] text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <button onClick={() => navigateTo('home')} className="hover:underline">Home</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white font-semibold">Help & Contact</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display">
              Customer Support & FAQs
            </h1>
            <p className="text-sm text-emerald-100/80">
              Have questions about deliveries, tare weights, or cylinder safety? We are here to help 7 days a week.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'faqs' ? 'bg-[#168568] text-white shadow-xs' : 'text-white/80 hover:text-white'
              }`}
            >
              Frequently Asked Questions
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'contact' ? 'bg-[#168568] text-white shadow-xs' : 'text-white/80 hover:text-white'
              }`}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">
        
        {activeTab === 'faqs' ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-[#102B2A] mb-6">
              Frequently Asked Questions
            </h2>

            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#E1E8E3] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#102B2A] hover:text-[#168568] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#168568] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#697570] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#697570] leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* CONTACT SECTION */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Details (Col-5) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E1E8E3] p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="text-xl font-bold font-display text-[#102B2A]">
                Get in Touch With Us
              </h2>
              <p className="text-xs text-[#697570] leading-relaxed">
                Our customer experience team is stationed in Lagos and ready to resolve inquiries regarding orders, missing cylinders, or supplier partnerships.
              </p>

              <div className="space-y-4 text-xs text-[#172321]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#168568] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#102B2A] block">Headquarters</span>
                    <span className="text-[#697570]">Plot 14 Commercial Avenue, Ikeja, Lagos, Nigeria</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#168568] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#102B2A] block">Toll-Free Phone</span>
                    <a href="tel:+2348001234567" className="text-[#168568] font-bold hover:underline">
                      +234 800 123 4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#168568] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#102B2A] block">Email Support</span>
                    <a href="mailto:support@lpgmart.ng" className="text-[#168568] font-bold hover:underline">
                      support@lpgmart.ng
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#168568] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#102B2A] block">Operating Hours</span>
                    <span className="text-[#697570]">Monday – Sunday: 8:00 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form (Col-7) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E1E8E3] p-6 sm:p-8 space-y-5 shadow-xs">
              <h2 className="text-xl font-bold font-display text-[#102B2A]">
                Send Us a Direct Message
              </h2>

              {sentSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
                  <h3 className="font-bold text-base text-emerald-900">Message Received!</h3>
                  <p className="text-xs text-emerald-800">
                    Thank you, {contactName}. A customer care agent will respond to {contactEmail} within 2 hours.
                  </p>
                  <button
                    onClick={() => setSentSuccess(false)}
                    className="text-xs text-[#168568] font-bold underline mt-2"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#102B2A] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Risqat Adeleke"
                      className="w-full bg-[#F3F6F4] p-3 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#102B2A] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. risqat@example.com"
                      className="w-full bg-[#F3F6F4] p-3 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#102B2A] mb-1">Your Inquiry / Message</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe what you need assistance with (order delivery, cylinder safety, bulk commercial quote)..."
                      className="w-full bg-[#F3F6F4] p-3 rounded-xl border border-slate-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#168568] hover:bg-[#0C4940] text-white font-semibold text-xs py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
