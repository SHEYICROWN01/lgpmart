import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Store,
  TrendingUp,
  Package,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
  FileText,
  DollarSign,
  ToggleLeft,
  ToggleRight,
  Plus,
} from 'lucide-react';
import { ASSET_IMAGES, LAGOS_AREAS } from '../data/mockData';
import { Order } from '../types';

export const SupplierPortalPage: React.FC = () => {
  const {
    supplierOrders,
    updateSupplierOrderStatus,
    supplierIsOnline,
    setSupplierIsOnline,
    showToast,
  } = useApp();

  const [activePortalTab, setActivePortalTab] = useState<'dashboard' | 'register'>('dashboard');

  // Registration Form State
  const [businessName, setBusinessName] = useState('');
  const [cacNumber, setCacNumber] = useState('');
  const [nmdpraPermit, setNmdpraPermit] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>(['Ikeja', 'Maryland']);
  const [tankCapacity, setTankCapacity] = useState('15,000 kg');
  const [regSuccess, setRegSuccess] = useState(false);

  // Pricing State
  const [pricePerKg, setPricePerKg] = useState(1100);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSuccess(true);
    showToast('Supplier application received! Our inspection team will contact you within 24 hours.');
  };

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-32 lg:pb-20">
      
      {/* Top Banner */}
      <div className="bg-[#102B2A] text-white py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F0AD45]">
              Merchant & Depot Operations
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display">
              LPGmart Supplier Portal
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80">
              Manage incoming orders, delivery fleet, inventory, and expand your cooking gas business across Lagos.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={() => setActivePortalTab('dashboard')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activePortalTab === 'dashboard'
                  ? 'bg-[#168568] text-white shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Supplier Dashboard
            </button>
            <button
              onClick={() => setActivePortalTab('register')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activePortalTab === 'register'
                  ? 'bg-[#168568] text-white shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Become a Supplier
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        
        {activePortalTab === 'dashboard' ? (
          <div className="space-y-6 sm:space-y-8">
            
            {/* Depot Status Header */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E1E8E3] p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0C4940] text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0">
                  🌿
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-bold text-base sm:text-lg text-[#102B2A]">
                      GreenGas Energy (Ikeja Depot #1)
                    </h2>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Verified Depot
                    </span>
                  </div>
                  <p className="text-xs text-[#697570]">
                    Plot 14 Commercial Avenue, Ikeja · NMDPRA: <strong>LPG/LG/2026/894</strong>
                  </p>
                </div>
              </div>

              {/* Online / Offline switch */}
              <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3 bg-[#F3F6F4] p-2 px-3.5 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-[#102B2A]">
                  Receiving Orders:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSupplierIsOnline(!supplierIsOnline);
                    showToast(supplierIsOnline ? 'Depot set to OFFLINE' : 'Depot set to ONLINE');
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    supplierIsOnline
                      ? 'bg-[#168568] text-white shadow-xs'
                      : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${supplierIsOnline ? 'bg-white' : 'bg-slate-500'}`} />
                  <span>{supplierIsOnline ? 'Online' : 'Offline'}</span>
                </button>
              </div>
            </div>

            {/* KPI Metrics: 2x2 grid on mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <div className="bg-white rounded-3xl border border-[#E1E8E3] p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-[#697570]">
                  <span>Today's Total Sales</span>
                  <DollarSign className="w-4 h-4 text-[#168568]" />
                </div>
                <span className="text-2xl font-extrabold font-display text-[#102B2A] tabular-nums block">
                  ₦485,000
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold block">
                  +18% compared to yesterday
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-[#E1E8E3] p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-[#697570]">
                  <span>Orders Today</span>
                  <Package className="w-4 h-4 text-[#168568]" />
                </div>
                <span className="text-2xl font-extrabold font-display text-[#102B2A] tabular-nums block">
                  32 Orders
                </span>
                <span className="text-[11px] text-[#697570] block">
                  4 currently out for delivery
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-[#E1E8E3] p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-[#697570]">
                  <span>Bulk LPG Tank Level</span>
                  <TrendingUp className="w-4 h-4 text-[#F0AD45]" />
                </div>
                <span className="text-2xl font-extrabold font-display text-[#102B2A] tabular-nums block">
                  14,200 kg
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold block">
                  71% capacity remaining
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-[#E1E8E3] p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-[#697570]">
                  <span>Active Couriers</span>
                  <Truck className="w-4 h-4 text-[#168568]" />
                </div>
                <span className="text-2xl font-extrabold font-display text-[#102B2A] tabular-nums block">
                  8 Riders
                </span>
                <span className="text-[11px] text-[#697570] block">
                  All carrying digital tare scales
                </span>
              </div>
            </div>

            {/* Live Incoming Orders Management */}
            <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-[#102B2A]">
                    Live Incoming Orders Dispatch Queue
                  </h3>
                  <p className="text-xs text-[#697570]">
                    Manage orders, update status, and track doorstep deliveries in real time.
                  </p>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
                  {supplierOrders.length} Orders in Queue
                </span>
              </div>

              <div className="space-y-4">
                {supplierOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl border border-[#E1E8E3] bg-[#F8FAF8] space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-[#102B2A]">
                            Order {ord.orderNumber}
                          </span>
                          <span className="text-xs text-[#697570]">({ord.createdAt})</span>
                        </div>
                        <p className="text-xs text-[#697570] mt-0.5">
                          Customer: <strong>{ord.deliveryAddress.fullName}</strong> ({ord.deliveryAddress.phone}) · {ord.deliveryAddress.streetAddress}, {ord.deliveryAddress.area}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-extrabold text-[#102B2A] tabular-nums block">
                          ₦{ord.total.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-[#168568] font-semibold block">
                          {ord.paymentMethod}
                        </span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                      {ord.items.map((it) => (
                        <div key={it.id} className="flex justify-between items-center text-[#172321]">
                          <span>
                            {it.quantity}x {it.name}
                          </span>
                          <span className="font-bold tabular-nums">₦{(it.price * it.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {/* Order Status Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#697570] font-medium">Status:</span>
                        <span className="font-bold uppercase tracking-wider text-xs px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                          {ord.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {ord.status === 'confirmed' && (
                          <button
                            onClick={() => updateSupplierOrderStatus(ord.id, 'dispatched')}
                            className="bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
                          >
                            Assign Rider & Dispatch
                          </button>
                        )}
                        {ord.status === 'dispatched' && (
                          <button
                            onClick={() => updateSupplierOrderStatus(ord.id, 'out_for_delivery')}
                            className="bg-[#F0AD45] hover:bg-amber-600 text-slate-900 text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
                          >
                            Mark Out for Delivery
                          </button>
                        )}
                        {ord.status === 'out_for_delivery' && (
                          <button
                            onClick={() => updateSupplierOrderStatus(ord.id, 'delivered')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
                          >
                            Confirm Delivery & Leak Test Passed
                          </button>
                        )}
                        {ord.status === 'delivered' && (
                          <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Completed Successfully
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Price Adjuster */}
            <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold font-display text-[#102B2A]">
                Adjust Depot LPG Refill Pricing (₦ / kg)
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
                <div className="flex items-center gap-2 bg-[#F3F6F4] p-3 rounded-xl border border-slate-200 flex-1 w-full">
                  <span className="font-bold text-[#102B2A]">Current Price per KG:</span>
                  <input
                    type="number"
                    value={pricePerKg}
                    onChange={(e) => setPricePerKg(Number(e.target.value))}
                    className="bg-transparent font-bold text-[#168568] text-sm tabular-nums w-28 focus:outline-none"
                  />
                  <span className="text-[#697570]">₦ / kg (Lagos Average: ₦1,100 – ₦1,200)</span>
                </div>
                <button
                  onClick={() => showToast(`Updated depot refill rate to ₦${pricePerKg}/kg`)}
                  className="bg-[#168568] text-white font-semibold text-xs px-6 py-3.5 rounded-xl hover:bg-[#0C4940] transition-colors cursor-pointer w-full sm:w-auto"
                >
                  Save New Price Board
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* BECOME A SUPPLIER REGISTRATION FORM */
          <div className="max-w-3xl mx-auto space-y-8">
            
            <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 sm:p-8 shadow-xs space-y-6">
              
              <div className="text-center max-w-lg mx-auto space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#168568] flex items-center justify-center mx-auto mb-2">
                  <Store className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-extrabold font-display text-[#102B2A]">
                  Register Your Gas Depot on LPGmart
                </h2>
                <p className="text-xs text-[#697570]">
                  Reach thousands of households and businesses in Lagos. We provide the ordering app, logistics dispatch, and secure payments.
                </p>
              </div>

              {regSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#168568] mx-auto" />
                  <h3 className="font-bold text-lg text-emerald-950">Application Submitted!</h3>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Thank you, <strong>{businessName}</strong>. Our Lagos vendor compliance officer will contact you within 24 hours to schedule an on-site safety and scale audit.
                  </p>
                  <button
                    onClick={() => setActivePortalTab('dashboard')}
                    className="bg-[#168568] text-white text-xs font-semibold px-5 py-2.5 rounded-xl mt-2"
                  >
                    View Demo Dashboard
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#102B2A] mb-1">
                        Gas Business / Plant Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Apex CleanGas Depot Ltd"
                        className="w-full bg-[#F3F6F4] p-3 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#102B2A] mb-1">
                        CAC Registration Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={cacNumber}
                        onChange={(e) => setCacNumber(e.target.value)}
                        placeholder="e.g. RC-1849204"
                        className="w-full bg-[#F3F6F4] p-3 rounded-xl border border-slate-200 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#102B2A] mb-1">
                        NMDPRA / DPR Plant License Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={nmdpraPermit}
                        onChange={(e) => setNmdpraPermit(e.target.value)}
                        placeholder="e.g. NMDPRA/LPG/LAG/2025/112"
                        className="w-full bg-[#F3F6F4] p-3 rounded-xl border border-slate-200 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#102B2A] mb-1">
                        Bulk Storage Tank Capacity
                      </label>
                      <select
                        value={tankCapacity}
                        onChange={(e) => setTankCapacity(e.target.value)}
                        className="w-full bg-[#F3F6F4] p-3 rounded-xl border border-slate-200"
                      >
                        <option value="5,000 kg">5,000 kg Bulk Tank</option>
                        <option value="15,000 kg">15,000 kg Bulk Tank</option>
                        <option value="30,000 kg">30,000 kg Bulk Tank</option>
                        <option value="50,000+ kg">50,000+ kg Major Depot</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-[#102B2A] mb-1">
                        Physical Depot Address in Lagos *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Plot 18 Ikorodu Road, Maryland, Lagos"
                        className="w-full bg-[#F3F6F4] p-3 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#102B2A] mb-1">
                        Contact Person Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Babajide Ogundipe"
                        className="w-full bg-[#F3F6F4] p-3 rounded-xl border border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#102B2A] mb-1">
                        Direct Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +234 802 000 0000"
                        className="w-full bg-[#F3F6F4] p-3 rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>

                  {/* Safety compliance agreement */}
                  <div className="bg-[#F3F6F4] p-4 rounded-xl border border-slate-200 space-y-2">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" required className="mt-0.5 text-[#168568] focus:ring-[#168568]" />
                      <span className="text-[#172321] leading-relaxed">
                        I confirm that our plant operates certified electronic digital scales for tare weight deduction, conducts soapy water leak tests on every cylinder, and holds valid NMDPRA compliance permits.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#168568] hover:bg-[#0C4940] text-white font-semibold text-sm py-4 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Submit Supplier Partnership Application
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
