import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Plus,
  Shield,
} from 'lucide-react';
import { MOCK_ORDERS } from '../data/mockData';
import { Order } from '../types';

export const AccountPage: React.FC = () => {
  const { orders, setActiveOrder, navigateTo, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'settings'>('overview');
  const [userName, setUserName] = useState('Risqat Adeleke');
  const [userEmail, setUserEmail] = useState('risqat.adeleke@gmail.com');
  const [userPhone, setUserPhone] = useState('+234 803 456 7890');

  const totalOrders = orders.length + 1;
  const ongoingOrders = orders.filter((o) => o.status === 'out_for_delivery' || o.status === 'confirmed').length;
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;

  const handleViewOrder = (order: Order) => {
    setActiveOrder(order);
    navigateTo('order-tracking');
  };

  const navTabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-28 lg:pb-20">
      
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-[#E1E8E3] py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#697570]">
            <button onClick={() => navigateTo('home')} className="hover:text-[#168568]">
              Home
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#102B2A] font-semibold">My Account</span>
          </div>

          <span className="text-[#168568] font-bold">Gas Now Now Customer Portal</span>
        </div>
      </div>

      {/* User Header Card on Mobile */}
      <div className="lg:hidden bg-[#102B2A] text-white p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md">
            RA
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-base text-white truncate">{userName}</h2>
            <p className="text-xs text-emerald-200/80 truncate">{userEmail} · {userPhone}</p>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Tab Navigation */}
      <div className="lg:hidden bg-white border-b border-[#E1E8E3] px-3 py-2 sticky top-16 z-20 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSel
                    ? 'bg-[#168568] text-white shadow-xs'
                    : 'bg-[#F3F6F4] text-[#697570] hover:text-[#102B2A]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Desktop Left Sidebar Menu (Col-3, hidden on mobile in favor of horizontal tabs) */}
          <div className="hidden lg:block lg:col-span-3 bg-white rounded-3xl border border-[#E1E8E3] p-5 shadow-xs space-y-4">
            
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#168568] flex items-center justify-center font-bold text-lg">
                RA
              </div>
              <div className="overflow-hidden">
                <span className="font-bold text-sm text-[#102B2A] block truncate">{userName}</span>
                <span className="text-xs text-[#697570] block truncate">{userEmail}</span>
              </div>
            </div>

            <nav className="space-y-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                  activeTab === 'overview'
                    ? 'bg-emerald-50 text-[#168568] font-bold'
                    : 'text-[#697570] hover:bg-[#F3F6F4] hover:text-[#102B2A]'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                  activeTab === 'orders'
                    ? 'bg-emerald-50 text-[#168568] font-bold'
                    : 'text-[#697570] hover:bg-[#F3F6F4] hover:text-[#102B2A]'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>My Orders ({orders.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                  activeTab === 'addresses'
                    ? 'bg-emerald-50 text-[#168568] font-bold'
                    : 'text-[#697570] hover:bg-[#F3F6F4] hover:text-[#102B2A]'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                  activeTab === 'settings'
                    ? 'bg-emerald-50 text-[#168568] font-bold'
                    : 'text-[#697570] hover:bg-[#F3F6F4] hover:text-[#102B2A]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </button>

              <button
                type="button"
                onClick={() => navigateTo('faqs')}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[#697570] hover:bg-[#F3F6F4] hover:text-[#102B2A] transition-colors cursor-pointer text-left"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Help & Support</span>
              </button>
            </nav>
          </div>

          {/* Right Main Content Area (Col-9) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Stats 4-Grid: Responsive 2x2 on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#E1E8E3] shadow-xs">
                    <span className="text-[11px] font-bold text-[#697570] block uppercase tracking-wider">
                      Total Orders
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold font-display text-[#102B2A] block mt-1 tabular-nums">
                      {totalOrders}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
                      Lifetime fulfilled
                    </span>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#E1E8E3] shadow-xs">
                    <span className="text-[11px] font-bold text-[#697570] block uppercase tracking-wider">
                      Active In-Transit
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold font-display text-[#F0AD45] block mt-1 tabular-nums">
                      {ongoingOrders}
                    </span>
                    <span className="text-[11px] text-amber-700 font-semibold mt-1 block">
                      Express dispatch
                    </span>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#E1E8E3] shadow-xs">
                    <span className="text-[11px] font-bold text-[#697570] block uppercase tracking-wider">
                      Delivered
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold font-display text-[#168568] block mt-1 tabular-nums">
                      {deliveredOrders}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
                      100% Tested
                    </span>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#E1E8E3] shadow-xs">
                    <span className="text-[11px] font-bold text-[#697570] block uppercase tracking-wider">
                      Account Status
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold font-display text-emerald-700 block mt-1">
                      Verified
                    </span>
                    <span className="text-[11px] text-[#697570] mt-1 block">
                      Lagos Island / Mainland
                    </span>
                  </div>
                </div>

                {/* Recent Orders Section */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E1E8E3] p-5 sm:p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-base text-[#102B2A] font-display">
                      Recent Orders
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#168568] hover:underline cursor-pointer"
                    >
                      View All Orders ({orders.length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {orders.slice(0, 2).map((ord) => (
                      <div
                        key={ord.id}
                        onClick={() => handleViewOrder(ord)}
                        className="p-4 rounded-2xl border border-[#E1E8E3] hover:border-[#168568] bg-[#F8FAF8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer transition-all hover:shadow-xs group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shrink-0">
                            {ord.supplier.logo || '🌿'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs sm:text-sm text-[#102B2A] group-hover:text-[#168568] transition-colors">
                                #{ord.orderNumber}
                              </span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.2 rounded-full">
                                {ord.status.replace('_', ' ')}
                              </span>
                            </div>
                            <span className="text-xs text-[#697570] block mt-0.5">
                              {ord.supplier.name} · {ord.createdAt}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                          <span className="font-extrabold text-sm text-[#102B2A] tabular-nums">
                            ₦{ord.total.toLocaleString()}
                          </span>
                          <span className="text-xs text-[#168568] font-bold flex items-center gap-1">
                            Track <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: MY ORDERS */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E1E8E3] p-5 sm:p-6 shadow-xs space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-base text-[#102B2A] font-display">
                    Order History & Live Tracking
                  </h3>
                  <span className="text-xs text-[#697570]">{orders.length} orders total</span>
                </div>

                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 sm:p-5 rounded-2xl border border-[#E1E8E3] bg-[#F8FAF8] space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-[#102B2A]">
                              Order #{ord.orderNumber}
                            </span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              {ord.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-[#697570] mt-0.5">
                            Supplier: <strong>{ord.supplier.name}</strong> · Placed: {ord.createdAt}
                          </p>
                        </div>

                        <span className="text-base font-extrabold text-[#102B2A] tabular-nums">
                          ₦{ord.total.toLocaleString()}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                        {ord.items.map((it) => (
                          <div key={it.id} className="flex justify-between items-center text-[#172321]">
                            <span>
                              {it.quantity}x {it.name}
                            </span>
                            <span className="font-bold tabular-nums">
                              ₦{(it.price * it.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-[#697570]">
                          Delivered to: {ord.deliveryAddress.streetAddress}, {ord.deliveryAddress.area}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleViewOrder(ord)}
                          className="bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl cursor-pointer"
                        >
                          Live GPS Tracker
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E1E8E3] p-5 sm:p-6 shadow-xs space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-base text-[#102B2A] font-display">
                    Saved Lagos Delivery Addresses
                  </h3>
                  <button
                    type="button"
                    onClick={() => showToast('New address added')}
                    className="flex items-center gap-1 text-xs font-bold text-[#168568] hover:underline cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl border-2 border-[#168568] bg-emerald-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#102B2A]">Home (Primary)</span>
                      <span className="text-[10px] bg-[#168568] text-white font-bold px-2 py-0.5 rounded">
                        Default
                      </span>
                    </div>
                    <p className="text-[#697570] leading-relaxed">
                      14b Joel Ogunnaike Street, GRA Ikeja, Lagos State.
                      <br />
                      Landmark: Near Police College Gate
                      <br />
                      Recipient: Risqat Adeleke (+234 803 456 7890)
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-[#E1E8E3] bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#102B2A]">Office / Restaurant</span>
                    </div>
                    <p className="text-[#697570] leading-relaxed">
                      Plot 8 Commercial Avenue, Yaba, Lagos State.
                      <br />
                      Landmark: Opposite Tech Hub
                      <br />
                      Recipient: Risqat Adeleke (+234 803 456 7890)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E1E8E3] p-5 sm:p-6 shadow-xs space-y-5 animate-fadeIn">
                <h3 className="font-bold text-base text-[#102B2A] font-display border-b border-slate-100 pb-3">
                  Account Settings
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#102B2A] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-[#F3F6F4] border border-[#E1E8E3] rounded-xl p-2.5 text-base sm:text-xs font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#102B2A] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-[#F3F6F4] border border-[#E1E8E3] rounded-xl p-2.5 text-base sm:text-xs font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#102B2A] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full bg-[#F3F6F4] border border-[#E1E8E3] rounded-xl p-2.5 text-base sm:text-xs font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => showToast('Profile settings saved successfully!')}
                    className="bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
