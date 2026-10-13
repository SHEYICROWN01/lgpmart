import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Clock,
  Truck,
  Phone,
  ShieldCheck,
  MapPin,
  ChevronRight,
  Flame,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { RealRouteTrackerMap } from '../components/RealRouteTrackerMap';

export const OrderTrackingPage: React.FC = () => {
  const { activeOrder, navigateTo, showToast } = useApp();
  const order = activeOrder;

  const [minsRemaining, setMinsRemaining] = useState(18);

  useEffect(() => {
    const timer = setInterval(() => {
      setMinsRemaining((prev) => (prev > 1 ? prev - 1 : 1));
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { key: 'placed', label: 'Order Placed', time: '11:20 AM', done: true },
    { key: 'confirmed', label: 'Supplier Confirmed & Tare Weighed', time: '11:24 AM', done: true },
    { key: 'dispatched', label: 'Rider Dispatched', time: '11:32 AM', done: true },
    { key: 'out_for_delivery', label: 'Out for Doorstep Delivery', time: 'Current', done: true, active: true },
    { key: 'delivered', label: 'Delivered & Leak Inspection Completed', time: 'Estimated 11:50 AM', done: order.status === 'delivered' },
  ];

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-20">
      
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-[#E1E8E3] py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#697570]">
            <button onClick={() => navigateTo('home')} className="hover:text-[#168568]">
              Home
            </button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => navigateTo('account')} className="hover:text-[#168568]">
              Orders
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#102B2A] font-semibold">{order.orderNumber}</span>
          </div>

          <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Live Order Tracking
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* Status Hero Card */}
        <div className="bg-[#102B2A] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#0C4940]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Order #{order.orderNumber} · {order.supplier.name}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display">
                {order.status === 'delivered' ? 'Order Delivered & Tested!' : 'Your Gas is on the Way!'}
              </h1>
              <p className="text-sm text-emerald-100/80">
                Delivering to <strong>{order.deliveryAddress.streetAddress}, {order.deliveryAddress.area}</strong>
              </p>
            </div>

            {/* Live countdown pill */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[160px]">
              <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
                Estimated Arrival
              </span>
              <span className="text-3xl font-extrabold font-display text-white tabular-nums block mt-1">
                {order.status === 'delivered' ? 'Completed' : `${minsRemaining} Mins`}
              </span>
              <span className="text-[10px] text-white/70 block mt-0.5">
                Real-time GPS Tracking
              </span>
            </div>

          </div>

          {/* Stepper bar */}
          <div className="mt-8 pt-8 border-t border-white/15 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {steps.map((st, i) => (
                <div key={st.key} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        st.done
                          ? 'bg-[#168568] text-white'
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {st.done ? '✓' : i + 1}
                    </div>
                    <span className="text-xs text-emerald-200/60 tabular-nums">
                      {st.time}
                    </span>
                  </div>
                  <span className={`text-xs font-bold block ${st.active ? 'text-[#F0AD45]' : 'text-white'}`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Split: Dispatch Rider Details & Interactive Route Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Rider & Order Summary (Col-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Rider Card */}
            {order.rider && (
              <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 shadow-xs space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#102B2A] block">
                  Assigned Express Courier
                </span>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-300 text-[#168568] flex items-center justify-center font-bold text-xl">
                      🏍️
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#102B2A]">
                        {order.rider.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#697570]">
                        <span className="text-[#F0AD45] font-bold">⭐ {order.rider.rating}</span>
                        <span>· Certified Handler</span>
                      </div>
                      <span className="text-xs font-mono text-[#102B2A] font-semibold block mt-0.5">
                        Plate: {order.rider.vehiclePlate} ({order.rider.vehicleType})
                      </span>
                    </div>
                  </div>

                  <a
                    href={`tel:${order.rider.phone}`}
                    onClick={() => showToast(`Dialing rider ${order.rider?.name}...`)}
                    className="w-11 h-11 rounded-2xl bg-[#168568] hover:bg-[#0C4940] text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
                    title="Call Courier"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>

                <div className="bg-emerald-50 rounded-xl p-3 text-xs text-emerald-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#168568] shrink-0" />
                  <span>Rider carrying portable digital scale and soap leak tester.</span>
                </div>
              </div>
            )}

            {/* Order Items Breakdown */}
            <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-[#102B2A] font-display border-b border-slate-100 pb-3">
                Items in This Delivery
              </h3>

              <div className="space-y-3 text-xs">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-[#F8FAF8] border border-slate-200 p-1 shrink-0">
                        <img src={item.image} alt={item.name} className="h-full object-contain" />
                      </div>
                      <div>
                        <span className="font-bold text-[#102B2A] line-clamp-1">{item.name}</span>
                        <span className="text-[#697570]">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#102B2A] tabular-nums">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-[#697570]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#102B2A] tabular-nums">₦{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Logistics</span>
                  <span className="font-semibold text-[#102B2A] tabular-nums">₦{order.deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-[#102B2A] pt-2 border-t border-slate-100">
                  <span>Total Amount</span>
                  <span className="font-display tabular-nums text-base">₦{order.total.toLocaleString()}</span>
                </div>
                <div className="pt-2 flex justify-between text-[11px]">
                  <span>Payment:</span>
                  <span className="font-semibold text-[#168568]">{order.paymentMethod}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Map Simulation (Col-7) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#E1E8E3] overflow-hidden shadow-xs space-y-0">
              
              <div className="bg-[#102B2A] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F0AD45]" />
                  <span className="font-bold text-xs uppercase tracking-wider">
                    Live GPS Courier Route (Lagos)
                  </span>
                </div>
                <span className="text-[11px] text-emerald-300 font-mono">
                  GPS Signal: Strong · Updated 1s ago
                </span>
              </div>

              {/* Real Interactive Street Route Map */}
              <div className="relative">
                <RealRouteTrackerMap minsRemaining={minsRemaining} />
              </div>

              {/* Safety notice in footer */}
              <div className="p-4 bg-[#F8FAF8] border-t border-[#E1E8E3] flex items-center justify-between text-xs">
                <span className="text-[#697570]">
                  Need to change address or delivery instruction?
                </span>
                <button
                  onClick={() => showToast('Connecting to dispatch support...')}
                  className="font-bold text-[#168568] hover:underline"
                >
                  Contact Dispatch Support
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
