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
    { key: 'placed', label: 'Order Placed & Verified', time: '11:20 AM', done: true },
    { key: 'confirmed', label: 'Depot Tare-Weight Calibrated', time: '11:24 AM', done: true },
    { key: 'dispatched', label: 'Rider Dispatched from Plant', time: '11:32 AM', done: true },
    { key: 'out_for_delivery', label: 'Out for Doorstep Delivery', time: 'In Progress', done: true, active: true },
    { key: 'delivered', label: 'Delivered & Soapy Water Leak Tested', time: 'Estimated 11:50 AM', done: order.status === 'delivered' },
  ];

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-32 lg:pb-20">
      
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

          <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-[11px]">
            Live GPS Tracking
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        
        {/* Status Hero Card */}
        <div className="bg-[#102B2A] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden border border-[#0C4940]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
            
            <div className="space-y-1.5 sm:space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Order #{order.orderNumber} · {order.supplier.name}
              </span>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-display leading-tight">
                {order.status === 'delivered' ? 'Gas Delivered & Tested!' : 'Your Gas is on the Way!'}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/80">
                Delivering to <strong>{order.deliveryAddress.streetAddress}, {order.deliveryAddress.area}</strong>
              </p>
            </div>

            {/* Live countdown pill */}
            <div className="bg-white/10 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/20 text-center min-w-[140px] sm:min-w-[160px] self-start sm:self-auto">
              <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
                Estimated Arrival
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-display text-white tabular-nums block mt-0.5">
                {order.status === 'delivered' ? 'Completed' : `${minsRemaining} Mins`}
              </span>
              <span className="text-[9px] sm:text-[10px] text-white/70 block mt-0.5">
                Real-time Dispatch
              </span>
            </div>

          </div>

          {/* Stepper Timeline: Responsive on both mobile & desktop */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/15 relative z-10">
            {/* Desktop Horizontal View */}
            <div className="hidden sm:grid sm:grid-cols-5 gap-4">
              {steps.map((st, i) => (
                <div key={st.key} className="space-y-1.5">
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
                    <span className="text-[11px] text-emerald-200/60 tabular-nums">
                      {st.time}
                    </span>
                  </div>
                  <span className={`text-xs font-bold block ${st.active ? 'text-[#F0AD45]' : 'text-white'}`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="sm:hidden space-y-3.5">
              {steps.map((st, i) => (
                <div key={st.key} className="flex items-start gap-3 relative">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 z-10 ${
                      st.done
                        ? 'bg-[#168568] text-white ring-2 ring-white/20'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {st.done ? '✓' : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-white/15 -translate-x-1/2 -z-0" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${st.active ? 'text-[#F0AD45]' : 'text-white'}`}>
                        {st.label}
                      </span>
                      <span className="text-[10px] text-emerald-200/60 tabular-nums">
                        {st.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Split: Dispatch Rider Details & Interactive Route Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Rider & Order Summary (Col-5) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            
            {/* Rider Card */}
            {order.rider && (
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E1E8E3] p-5 sm:p-6 shadow-xs space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#102B2A] block">
                  Assigned Express Courier
                </span>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 border border-emerald-300 text-[#168568] flex items-center justify-center font-bold text-xl shrink-0">
                      🏍️
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm sm:text-base text-[#102B2A]">
                          {order.rider.name}
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                          Certified
                        </span>
                      </div>
                      <span className="text-xs text-[#697570] block">
                        Vehicle: {order.rider.vehicle || `${order.rider.vehicleType} (${order.rider.vehiclePlate})`}
                      </span>
                      <span className="text-[11px] text-[#F0AD45] font-bold block mt-0.5">
                        ⭐ {order.rider.rating} (420+ trips in Lagos)
                      </span>
                    </div>
                  </div>

                  <a
                    href={`tel:${order.rider.phone}`}
                    className="p-3 bg-emerald-50 hover:bg-[#168568] text-[#168568] hover:text-white rounded-2xl border border-emerald-200 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                    title="Call Courier"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>

                <div className="bg-[#F8FAF8] p-3 rounded-xl border border-slate-100 text-xs text-[#697570] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#168568] shrink-0" />
                  <span>Equipped with electronic digital hanging scale & soap leak test kit.</span>
                </div>
              </div>
            )}

            {/* Order Items Receipt Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E1E8E3] p-5 sm:p-6 shadow-xs space-y-3.5">
              <h3 className="font-bold text-sm text-[#102B2A] font-display border-b border-slate-100 pb-2">
                Order Items ({order.items.length})
              </h3>
              <div className="space-y-2 text-xs">
                {order.items.map((it) => (
                  <div key={it.id} className="flex justify-between items-center text-[#172321]">
                    <span>{it.quantity}x {it.name}</span>
                    <span className="font-bold tabular-nums">₦{(it.price * it.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-2 flex justify-between text-sm font-extrabold text-[#102B2A]">
                <span>Total Paid</span>
                <span className="text-base text-[#168568] tabular-nums">₦{order.total.toLocaleString()}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Route Map (Col-7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-[#E1E8E3] overflow-hidden shadow-xs">
            <div className="p-3.5 sm:p-4 border-b border-[#E1E8E3] flex items-center justify-between bg-[#102B2A] text-white">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F0AD45]" />
                <span className="font-bold text-xs text-white">
                  Live Dispatch Route Tracker
                </span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                GPS Active
              </span>
            </div>

            {/* Real Map */}
            <RealRouteTrackerMap minsRemaining={minsRemaining} />

            <div className="p-3 sm:p-4 bg-[#F8FAF8] border-t border-[#E1E8E3] text-xs text-[#697570] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>Depot: Commercial Ave, Ikeja → Destination: Joel Ogunnaike, GRA</span>
              <span className="text-emerald-700 font-bold">Speed: ~34 km/h (Moderate Traffic)</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
