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

  const totalOrders = orders.length + 1; // 3
  const ongoingOrders = orders.filter((o) => o.status === 'out_for_delivery' || o.status === 'confirmed').length;
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;
  const cancelledOrders = 0;

  const handleViewOrder = (order: Order) => {
    setActiveOrder(order);
    navigateTo('order-tracking');
  };

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-20">
      
      {/* Top Banner */}
      <div className="bg-white border-b border-[#E1E8E3] py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#697570]">
            <button onClick={() => navigateTo('home')} className="hover:text-[#168568]">
              Home
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#102B2A] font-semibold">My Account</span>
          </div>

          <span className="text-[#168568] font-bold">LPGmart Customer Portal</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Menu (Col-3) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-[#E1E8E3] p-5 shadow-xs space-y-4">
            
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
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                  activeTab === 'orders'
                    ? 'bg-emerald-50 text-[#168568] font-bold'
                    : 'text-[#697570] hover:bg-[#F3F6F4] hover:text-[#102B2A]'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </button>

              <button
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
                onClick={() => showToast('Wishlist feature synced')}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[#697570] hover:bg-[#F3F6F4] hover:text-[#102B2A] transition-colors cursor-pointer text-left"
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </button>

              <button
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
                onClick={() => navigateTo('faqs')}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[#697570] hover:bg-[#F3F6F4] hover:text-[#102B2A] transition-colors cursor-pointer text-left"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Help & Support</span>
              </button>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => showToast('Signed out of demo session')}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>

          </div>

          {/* Right Content View (Col-9) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Header Greeting */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#102B2A]">
                Welcome back, Risqat 👋
              </h1>
              <p className="text-xs text-[#697570] mt-1">
                Manage your orders, addresses, and delivery preferences in Lagos.
              </p>
            </div>

            {/* 4 Metric Cards matching mockup */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-[#E1E8E3] p-4 text-center space-y-1 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#168568] flex items-center justify-center mx-auto mb-1">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-2xl font-bold font-display text-[#102B2A] tabular-nums block">
                  {totalOrders}
                </span>
                <span className="text-[11px] text-[#697570] block font-medium">Total Orders</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#E1E8E3] p-4 text-center space-y-1 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-1">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-2xl font-bold font-display text-blue-600 tabular-nums block">
                  {ongoingOrders}
                </span>
                <span className="text-[11px] text-[#697570] block font-medium">Ongoing</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#E1E8E3] p-4 text-center space-y-1 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#168568] flex items-center justify-center mx-auto mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-2xl font-bold font-display text-[#168568] tabular-nums block">
                  {deliveredOrders}
                </span>
                <span className="text-[11px] text-[#697570] block font-medium">Delivered</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#E1E8E3] p-4 text-center space-y-1 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-1">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <span className="text-2xl font-bold font-display text-[#697570] tabular-nums block">
                  {cancelledOrders}
                </span>
                <span className="text-[11px] text-[#697570] block font-medium">Cancelled</span>
              </div>
            </div>

            {/* Recent Orders List matching mockup */}
            <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-[#102B2A] font-display">
                  Recent Orders
                </h3>
                <span className="text-xs text-[#697570]">Live sync with Lagos depots</span>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl border border-[#E1E8E3] hover:border-[#168568] bg-[#F8FAF8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-xl bg-white border border-[#E1E8E3] p-2 flex items-center justify-center shrink-0">
                        <img
                          src={order.items[0]?.image}
                          alt={order.items[0]?.name}
                          className="max-h-full object-contain"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#102B2A]">
                            {order.items[0]?.name}
                          </span>
                          {order.items.length > 1 && (
                            <span className="text-[10px] text-[#697570] bg-white border border-slate-200 px-1.5 py-0.2 rounded">
                              +{order.items.length - 1} more item
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#697570]">
                          <span className="font-extrabold text-[#102B2A] tabular-nums">
                            ₦{order.total.toLocaleString()}
                          </span>
                          <span>·</span>
                          <span>{order.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                      {order.status === 'out_for_delivery' ? (
                        <span className="text-xs font-bold text-amber-800 bg-[#F0AD45]/20 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#F0AD45] animate-ping" />
                          Out for Delivery
                        </span>
                      ) : order.status === 'delivered' ? (
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                          ✓ Delivered
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                          {order.status}
                        </span>
                      )}

                      <button
                        onClick={() => handleViewOrder(order)}
                        className="px-4 py-2 bg-white hover:bg-[#168568] hover:text-white text-[#102B2A] border border-[#E1E8E3] rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Saved Addresses Tab View */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-base text-[#102B2A]">Saved Delivery Addresses</h3>
                  <button
                    onClick={() => showToast('Address creation modal')}
                    className="text-xs bg-[#168568] text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl border-2 border-[#168568] bg-emerald-50/40 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#168568]">Primary Residence (Default)</span>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-bold">Ikeja</span>
                    </div>
                    <p className="font-semibold text-[#102B2A]">14b Joel Ogunnaike Street, GRA Ikeja</p>
                    <p className="text-[#697570]">Near Police College Gate · Lagos State</p>
                  </div>

                  <div className="p-4 rounded-2xl border border-[#E1E8E3] bg-white space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#102B2A]">Family House</span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-bold">Surulere</span>
                    </div>
                    <p className="font-semibold text-[#102B2A]">18 Adeniran Ogunsanya Street</p>
                    <p className="text-[#697570]">Surulere · Lagos State</p>
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings Tab View */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-[#102B2A] border-b border-slate-100 pb-3">
                  Profile & Preferences
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#102B2A] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-[#F3F6F4] p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#102B2A] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full bg-[#F3F6F4] p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-[#102B2A] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-[#F3F6F4] p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => showToast('Profile settings saved')}
                    className="bg-[#168568] text-white text-xs font-semibold px-5 py-2.5 rounded-xl"
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
