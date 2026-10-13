import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Star,
  Check,
  Flame,
  ArrowRight,
  Truck,
  ChevronRight,
} from 'lucide-react';
import { REFILL_RATES, MOCK_PRODUCTS } from '../data/mockData';

export const SupplierDetailPage: React.FC = () => {
  const {
    selectedSupplier,
    setRefillModalOpen,
    setSelectedProduct,
    navigateTo,
    addToCart,
    showToast,
  } = useApp();

  const supplier = selectedSupplier;

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-20">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E1E8E3] py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#697570]">
          <button onClick={() => navigateTo('home')} className="hover:text-[#168568]">
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => navigateTo('suppliers')} className="hover:text-[#168568]">
            Find Gas Suppliers
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#102B2A] font-semibold">{supplier.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        
        {/* Supplier Profile Banner Card */}
        <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-2xl bg-[#0C4940] text-white flex items-center justify-center text-4xl shadow-md shrink-0">
                {supplier.logo}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#102B2A]">
                    {supplier.name}
                  </h1>
                  {supplier.verified && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#168568]" />
                      NMDPRA Licensed Vendor
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-[#697570]">
                  <span className="font-bold text-[#F0AD45] flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {supplier.rating}
                  </span>
                  <span>({supplier.reviewCount} customer reviews)</span>
                  <span>·</span>
                  <span className="text-[#102B2A] font-semibold">{supplier.area}, Lagos</span>
                </div>

                <p className="text-xs text-[#697570] flex items-center gap-1.5 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#168568] shrink-0" />
                  <span>{supplier.address}</span>
                </p>
              </div>
            </div>

            {/* CTA action */}
            <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
              <button
                onClick={() => setRefillModalOpen(true)}
                className="bg-[#168568] hover:bg-[#0C4940] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Flame className="w-4 h-4 text-[#F0AD45]" />
                <span>Order Refill From This Depot</span>
              </button>
              <span className="text-[11px] text-[#697570]">
                Average doorstep delivery: {supplier.deliveryTime}
              </span>
            </div>

          </div>

          {/* Quick Info Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-xs">
            <div className="space-y-1">
              <span className="text-[#697570] block">Operating Hours</span>
              <span className="font-bold text-[#102B2A] block">{supplier.operatingHours}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#697570] block">Delivery Fleet</span>
              <span className="font-bold text-[#102B2A] block">Express Trikes & Vans</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#697570] block">Standard Logistics Fee</span>
              <span className="font-bold text-[#102B2A] block tabular-nums">₦{supplier.deliveryFee.toLocaleString()}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#697570] block">Direct Dispatch Hotline</span>
              <a href={`tel:${supplier.phone}`} className="font-bold text-[#168568] block hover:underline">
                {supplier.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Refill Rate Board */}
        <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-display text-[#102B2A]">
                Official Refill Price Board ({supplier.name})
              </h2>
              <p className="text-xs text-[#697570] mt-0.5">
                Regulated Nigerian LPG pricing with tare weight and leak inspection included.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#168568] bg-emerald-50 px-2.5 py-1 rounded-lg">
              Updated Today
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {REFILL_RATES.map((rate) => (
              <div
                key={rate.size}
                className="p-4 rounded-2xl border border-[#E1E8E3] hover:border-[#168568] bg-[#F8FAF8] flex flex-col justify-between space-y-3 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base text-[#102B2A]">{rate.size} Refill</span>
                    {rate.popular && (
                      <span className="text-[9px] font-bold bg-[#F0AD45] text-slate-900 px-1.5 py-0.2 rounded">
                        Popular
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#697570] mt-1 block">{rate.desc}</span>
                </div>

                <div>
                  <span className="text-xl font-extrabold text-[#102B2A] tabular-nums block">
                    ₦{rate.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => setRefillModalOpen(true)}
                    className="w-full mt-2.5 bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Select Refill
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products in this Storefront */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-display text-[#102B2A]">
            Available Cylinders & Accessories at {supplier.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {MOCK_PRODUCTS.slice(0, 4).map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-[#E1E8E3] hover:border-[#168568] p-4 flex flex-col justify-between transition-all hover:shadow-md"
              >
                <div>
                  <div
                    onClick={() => {
                      setSelectedProduct(prod);
                      navigateTo('product-detail');
                    }}
                    className="aspect-square rounded-xl bg-[#F8FAF8] mb-3 p-3 flex items-center justify-center cursor-pointer"
                  >
                    <img src={prod.image} alt={prod.name} className="max-h-full object-contain" />
                  </div>
                  <h3
                    onClick={() => {
                      setSelectedProduct(prod);
                      navigateTo('product-detail');
                    }}
                    className="font-bold text-xs sm:text-sm text-[#102B2A] hover:text-[#168568] cursor-pointer line-clamp-1"
                  >
                    {prod.name}
                  </h3>
                  <span className="font-extrabold text-sm sm:text-base text-[#102B2A] block mt-1 tabular-nums">
                    ₦{prod.price.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => {
                    addToCart({
                      product: prod,
                      quantity: 1,
                      serviceType: prod.category === 'cylinders' ? 'cylinder' : 'accessory',
                      selectedSupplier: supplier,
                    });
                  }}
                  className="w-full mt-3 bg-[#168568] hover:bg-[#0C4940] text-white text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
