import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Clock,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Phone,
  User,
  Truck,
  Building,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { LAGOS_AREAS } from '../data/mockData';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,
    createOrder,
    navigateTo,
    selectedArea,
  } = useApp();

  const [fullName, setFullName] = useState('Risqat Adeleke');
  const [phone, setPhone] = useState('+234 803 456 7890');
  const [area, setArea] = useState(selectedArea || 'Ikeja');
  const [streetAddress, setStreetAddress] = useState('14b Joel Ogunnaike Street, GRA Ikeja');
  const [landmark, setLandmark] = useState('Near Police College Gate');
  const [deliveryNotes, setDeliveryNotes] = useState('Please call when at the gate. 2nd floor flat.');
  const [deliverySlot, setDeliverySlot] = useState('Immediate Dispatch (Within 45 – 60 mins)');
  const [paymentMethod, setPaymentMethod] = useState('Pay on Delivery (Card POS / Transfer)');
  const [onlineModalOpen, setOnlineModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('5399 •••• •••• 8102');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod.includes('Online')) {
      setOnlineModalOpen(true);
      return;
    }
    submitFinalOrder();
  };

  const submitFinalOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      createOrder({
        address: {
          fullName,
          phone,
          state: 'Lagos State',
          area,
          streetAddress,
          landmark,
          deliveryNotes,
        },
        slot: deliverySlot,
        paymentMethod,
      });
      setIsSubmitting(false);
      navigateTo('order-tracking');
    }, 800);
  };

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-32 lg:pb-20">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E1E8E3] py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#697570]">
          <button onClick={() => navigateTo('home')} className="hover:text-[#168568]">
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => navigateTo('cart')} className="hover:text-[#168568]">
            Cart
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#102B2A] font-semibold">Secure Checkout</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        
        <div className="mb-5 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#102B2A]">
            Checkout & Delivery Details
          </h1>
          <p className="text-xs sm:text-sm text-[#697570] mt-1">
            Complete your order for verified delivery anywhere in Lagos.
          </p>
        </div>

        {/* Mobile Accordion Summary Bar (Quick View) */}
        <div className="lg:hidden bg-white rounded-2xl border border-[#E1E8E3] p-4 mb-6 shadow-xs">
          <button
            type="button"
            onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
            className="w-full flex items-center justify-between text-xs cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#102B2A]">Order Total ({cart.length} items):</span>
              <span className="font-extrabold text-base text-[#168568] tabular-nums">
                ₦{cartTotal.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#697570] font-bold">
              <span>{mobileSummaryOpen ? 'Hide' : 'Details'}</span>
              {mobileSummaryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {mobileSummaryOpen && (
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs text-[#697570] animate-fadeIn">
              {cart.map((c) => (
                <div key={c.id} className="flex justify-between items-center">
                  <span className="truncate max-w-[200px]">{c.quantity}x {c.product.name}</span>
                  <span className="font-bold text-[#102B2A] tabular-nums">
                    ₦{(c.product.price * c.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-100 flex justify-between">
                <span>Delivery to {area}</span>
                <span className="font-bold text-[#102B2A]">₦{cartDeliveryFee.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Form: Delivery Address & Fulfillment (Col-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Recipient & Address */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E1E8E3] p-5 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#168568] flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h3 className="font-bold text-base text-[#102B2A]">
                  Delivery Address in Lagos
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#102B2A] mb-1">
                    Full Name *
                  </label>
                  <div className="flex items-center gap-2 bg-[#F3F6F4] px-3 py-2.5 rounded-xl border border-slate-200">
                    <User className="w-4 h-4 text-[#697570] shrink-0" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-transparent text-base sm:text-xs w-full text-[#102B2A] font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#102B2A] mb-1">
                    Phone Number (for Rider) *
                  </label>
                  <div className="flex items-center gap-2 bg-[#F3F6F4] px-3 py-2.5 rounded-xl border border-slate-200">
                    <Phone className="w-4 h-4 text-[#697570] shrink-0" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-transparent text-base sm:text-xs w-full text-[#102B2A] font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#102B2A] mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Lagos State"
                    className="bg-[#E1E8E3]/50 text-base sm:text-xs w-full text-[#697570] font-semibold px-3 py-2.5 rounded-xl border border-slate-200 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#102B2A] mb-1">
                    Lagos Neighbourhood / LGA *
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="bg-[#F3F6F4] text-base sm:text-xs w-full text-[#102B2A] font-bold px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  >
                    {LAGOS_AREAS.filter((a) => a !== 'All Areas in Lagos').map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#102B2A] mb-1">
                    Street Address & Flat / House No *
                  </label>
                  <div className="flex items-center gap-2 bg-[#F3F6F4] px-3 py-2.5 rounded-xl border border-slate-200">
                    <MapPin className="w-4 h-4 text-[#697570] shrink-0" />
                    <input
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="e.g. 14b Joel Ogunnaike Street, GRA Ikeja"
                      className="bg-transparent text-base sm:text-xs w-full text-[#102B2A] font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#102B2A] mb-1">
                    Closest Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Near Police College Gate"
                    className="bg-[#F3F6F4] text-base sm:text-xs w-full text-[#102B2A] font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#102B2A] mb-1">
                    Delivery Instructions / Gate Code
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. Ring 2nd floor flat, call at gate"
                    className="bg-[#F3F6F4] text-base sm:text-xs w-full text-[#102B2A] font-medium px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Time Slot */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E1E8E3] p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#168568] flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h3 className="font-bold text-base text-[#102B2A]">
                  Select Delivery Time
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {[
                  {
                    title: 'Immediate Dispatch',
                    desc: 'Arriving in 35 – 55 mins',
                    badge: 'Express',
                  },
                  {
                    title: 'Today Evening',
                    desc: '4:00 PM – 7:00 PM',
                    badge: 'Scheduled',
                  },
                  {
                    title: 'Tomorrow Morning',
                    desc: '8:00 AM – 11:00 AM',
                    badge: 'Scheduled',
                  },
                ].map((slot) => {
                  const isSelected = deliverySlot.includes(slot.title);
                  return (
                    <label
                      key={slot.title}
                      onClick={() => setDeliverySlot(`${slot.title} (${slot.desc})`)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#168568] bg-emerald-50/70 shadow-xs ring-1 ring-[#168568]/20'
                          : 'border-[#E1E8E3] bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs sm:text-sm text-[#102B2A]">
                          {slot.title}
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          {slot.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#697570]">{slot.desc}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E1E8E3] p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#168568] flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h3 className="font-bold text-base text-[#102B2A]">
                  Payment Method
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'pod',
                    name: 'Pay on Delivery (Card POS / Bank Transfer)',
                    desc: 'Our dispatch rider carries a mobile POS terminal and verified company transfer account.',
                    popular: true,
                  },
                  {
                    id: 'online',
                    name: 'Pay Online Now (Paystack Simulation)',
                    desc: 'Instant debit card or direct Nigerian bank transfer. Fast & contactless.',
                    popular: false,
                  },
                  {
                    id: 'cash',
                    name: 'Cash on Delivery (Exact Change Appreciated)',
                    desc: 'Pay cash directly to the dispatch rider upon receiving and inspecting your items.',
                    popular: false,
                  },
                ].map((pm) => {
                  const isSelected = paymentMethod.includes(pm.id === 'pod' ? 'Pay on Delivery' : pm.id === 'online' ? 'Online' : 'Cash');
                  return (
                    <label
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.name)}
                      className={`p-3.5 sm:p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#168568] bg-emerald-50/60 ring-1 ring-[#168568]/20'
                          : 'border-[#E1E8E3] bg-white hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={isSelected}
                        onChange={() => setPaymentMethod(pm.name)}
                        className="mt-1 text-[#168568] focus:ring-[#168568]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-xs sm:text-sm text-[#102B2A]">{pm.name}</span>
                          {pm.popular && (
                            <span className="text-[10px] bg-[#F0AD45] text-slate-900 font-bold px-1.5 py-0.2 rounded">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#697570] mt-0.5">{pm.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Summary Box (Col-4) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E1E8E3] p-5 sm:p-6 shadow-xs space-y-5">
              <h3 className="font-bold text-base text-[#102B2A] font-display border-b border-slate-100 pb-3">
                Order Review
              </h3>

              {/* Items preview */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1 text-xs">
                {cart.map((c) => (
                  <div key={c.id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-[#F8FAF8] border border-slate-200 p-1 shrink-0">
                        <img src={c.product.image} alt={c.product.name} className="h-full object-contain" />
                      </div>
                      <div>
                        <span className="font-bold text-[#102B2A] line-clamp-1">{c.product.name}</span>
                        <span className="text-[#697570]">Qty: {c.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#102B2A] tabular-nums">
                      ₦{(c.product.price * c.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-[#697570]">
                <div className="flex items-center justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-[#102B2A] tabular-nums">₦{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery to {area}</span>
                  <span className="font-bold text-[#102B2A] tabular-nums">₦{cartDeliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Safety Inspection & Seal Check</span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex items-baseline justify-between text-base font-extrabold text-[#102B2A]">
                  <span className="font-display">Total Payable</span>
                  <span className="font-display text-xl text-[#102B2A] tabular-nums">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#168568] hover:bg-[#0C4940] text-white font-bold text-sm py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-center text-[#697570] space-y-1">
                <p>✓ Tare weight calibration verified</p>
                <p>✓ 100% money back if cylinder fails seal test</p>
              </div>
            </div>
          </div>

        </form>

      </div>

      {/* Online Payment Simulation Modal */}
      {onlineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E1E8E3] space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#168568]" />
                <h4 className="font-bold text-base text-[#102B2A]">Paystack Payment Demo</h4>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Test Mode
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#697570]">
                Simulating payment of <strong>₦{cartTotal.toLocaleString()}</strong> to Gas Now Now Nigeria.
              </p>

              <div>
                <label className="block font-semibold text-[#102B2A] mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-[#F3F6F4] p-2.5 rounded-lg border border-slate-200 text-base sm:text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#102B2A] mb-1">Expiry</label>
                  <input
                    type="text"
                    defaultValue="10/28"
                    className="w-full bg-[#F3F6F4] p-2.5 rounded-lg border border-slate-200 text-base sm:text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#102B2A] mb-1">CVV</label>
                  <input
                    type="password"
                    defaultValue="419"
                    className="w-full bg-[#F3F6F4] p-2.5 rounded-lg border border-slate-200 text-base sm:text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOnlineModalOpen(false)}
                className="w-1/2 py-2.5 border border-[#E1E8E3] text-[#102B2A] rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setOnlineModalOpen(false);
                  submitFinalOrder();
                }}
                className="w-1/2 py-2.5 bg-[#168568] hover:bg-[#0C4940] text-white rounded-xl text-xs font-semibold shadow-md cursor-pointer"
              >
                Authorize ₦{cartTotal.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
