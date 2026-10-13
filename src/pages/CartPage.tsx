import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  ChevronRight,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,
    navigateTo,
    setRefillModalOpen,
  } = useApp();

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-20">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E1E8E3] py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#697570]">
          <button onClick={() => navigateTo('home')} className="hover:text-[#168568]">
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#102B2A] font-semibold">Your Cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#102B2A]">
            Your Cart
          </h1>
          <p className="text-xs text-[#697570] mt-1">
            Review your cooking gas cylinders, refills, and accessories before checkout.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E1E8E3] p-12 text-center max-w-md mx-auto space-y-4 my-10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#168568] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-[#102B2A]">Your cart is currently empty</h3>
            <p className="text-xs text-[#697570]">
              Need a quick cooking gas refill or new cylinder? Connect with nearby suppliers now.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => setRefillModalOpen(true)}
                className="bg-[#168568] text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#0C4940] transition-colors"
              >
                Order Gas Refill
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className="border border-[#E1E8E3] text-[#102B2A] text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#F3F6F4] transition-colors"
              >
                Shop Accessories
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Cart Items List (Col-8) */}
            <div className="lg:col-span-8 space-y-4">
              
              <div className="bg-white rounded-3xl border border-[#E1E8E3] p-4 sm:p-6 divide-y divide-slate-100 shadow-xs">
                {cart.map((item) => (
                  <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    
                    {/* Item info */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-[#F8FAF8] border border-[#E1E8E3] p-2 flex items-center justify-center shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-bold text-sm sm:text-base text-[#102B2A]">
                          {item.product.name}
                        </h3>
                        
                        {item.selectedSupplier && (
                          <span className="text-[11px] text-[#697570] block">
                            By {item.selectedSupplier.name} · {item.selectedSupplier.area}
                          </span>
                        )}

                        {item.refillDetails && (
                          <span className="inline-block text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                            {item.refillDetails.refillOption === 'exchange'
                              ? 'Doorstep Cylinder Exchange'
                              : 'Pick Up, Refill & Return'}
                          </span>
                        )}

                        <span className="font-bold text-xs text-[#168568] block sm:hidden tabular-nums">
                          ₦{item.product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      
                      <div className="flex items-center border border-[#E1E8E3] rounded-xl bg-white p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-[#F3F6F4] rounded-lg transition-colors cursor-pointer text-[#697570]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold tabular-nums text-[#102B2A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-[#F3F6F4] rounded-lg transition-colors cursor-pointer text-[#697570]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[90px]">
                        <span className="font-extrabold text-sm sm:text-base text-[#102B2A] tabular-nums block">
                          ₦{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-[#697570] tabular-nums hidden sm:block">
                          ₦{item.product.price.toLocaleString()} each
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#697570] hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </div>
                ))}
              </div>

              {/* Trust message */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-[#168568] shrink-0" />
                <span>
                  <strong>LPGmart Guarantee:</strong> Every cylinder is weight-inspected with tare weight deduction and given a free soapy water leak test upon delivery.
                </span>
              </div>

            </div>

            {/* Order Summary Box (Col-4) */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 shadow-xs space-y-5">
                <h2 className="font-bold text-base text-[#102B2A] font-display border-b border-slate-100 pb-3">
                  Order Summary
                </h2>

                <div className="space-y-3 text-xs text-[#697570]">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#102B2A] tabular-nums text-sm">
                      ₦{cartSubtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Lagos Doorstep Delivery Fee</span>
                    <span className="font-bold text-[#102B2A] tabular-nums text-sm">
                      ₦{cartDeliveryFee.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Safety Inspection & Leak Test</span>
                    <span className="font-semibold text-emerald-700">FREE</span>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex items-baseline justify-between text-base font-extrabold text-[#102B2A]">
                    <span className="font-display">Total</span>
                    <span className="font-display text-xl text-[#102B2A] tabular-nums">
                      ₦{cartTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('checkout')}
                  className="w-full bg-[#168568] hover:bg-[#0C4940] text-white font-semibold text-sm py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-[#697570]">
                  Pay on delivery with Card/Transfer or pay securely online.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
