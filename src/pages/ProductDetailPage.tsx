import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  Check,
  Star,
  Plus,
  Minus,
  ArrowRight,
  Phone,
  Store,
  MapPin,
  Clock,
  HelpCircle,
  ShoppingBag,
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_SUPPLIERS } from '../data/mockData';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    navigateTo,
    setSelectedSupplier,
    setRefillModalOpen,
    showToast,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(selectedProduct.image);
  const [activeTab, setActiveTab] = useState<'specs' | 'delivery' | 'reviews'>('specs');

  const defaultSupplier = MOCK_SUPPLIERS[0]; // GreenGas Energy

  const handleAddToCart = () => {
    addToCart({
      product: selectedProduct,
      quantity,
      serviceType: selectedProduct.category === 'cylinders' ? 'cylinder' : 'accessory',
      selectedSupplier: defaultSupplier,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      product: selectedProduct,
      quantity,
      serviceType: selectedProduct.category === 'cylinders' ? 'cylinder' : 'accessory',
      selectedSupplier: defaultSupplier,
    });
    navigateTo('checkout');
  };

  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== selectedProduct.id).slice(0, 4);

  return (
    <div className="bg-[#F8FAF8] min-h-screen pb-32 lg:pb-20">
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#E1E8E3] py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2 text-xs text-[#697570] overflow-x-auto no-scrollbar">
          <button onClick={() => navigateTo('home')} className="hover:text-[#168568] whitespace-nowrap">
            Home
          </button>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <button onClick={() => navigateTo('shop')} className="hover:text-[#168568] whitespace-nowrap">
            Accessories
          </button>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-[#102B2A] font-semibold truncate max-w-[140px] sm:max-w-xs">
            {selectedProduct.name}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-10 sm:space-y-12">
        
        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          
          {/* Left: Product Media Gallery (Col-6) */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            <div className="bg-white rounded-3xl border border-[#E1E8E3] p-6 sm:p-8 aspect-square flex items-center justify-center relative overflow-hidden shadow-xs">
              <img
                src={selectedImage || selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-full max-w-full object-contain transition-all"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-emerald-50 text-emerald-800 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                100% SON Safety Certified
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2.5">
              {[selectedProduct.image, selectedProduct.image].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl border-2 border-[#168568] p-2 flex items-center justify-center cursor-pointer shadow-xs"
                >
                  <img src={img} alt="Thumbnail" className="max-h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Purchase Module (Col-6) */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            <div className="space-y-1.5 sm:space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#168568]">
                {selectedProduct.brand} · {selectedProduct.category.toUpperCase()}
              </span>
              <h1 className="text-xl sm:text-3xl font-extrabold font-display text-[#102B2A] leading-tight">
                {selectedProduct.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs flex-wrap">
                <div className="flex items-center gap-1 text-[#F0AD45] font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-[#697570] font-normal">
                    ({selectedProduct.reviewCount} reviews)
                  </span>
                </div>
                <span>·</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                  ✓ In Stock ({selectedProduct.stockCount} in Lagos)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E1E8E3] flex items-baseline justify-between shadow-xs">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold font-display text-[#102B2A] tabular-nums">
                  ₦{selectedProduct.price.toLocaleString()}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-slate-400 line-through tabular-nums">
                    ₦{selectedProduct.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-[11px] sm:text-xs text-[#697570]">Lagos VAT included</span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#697570] leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Key Specifications Bulleted */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#102B2A]">
                Key Highlights
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs text-[#172321]">
                {selectedProduct.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#168568] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sold by Supplier Card */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#E1E8E3] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-[#168568] flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
                  {defaultSupplier.logo}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-[#102B2A]">
                      {defaultSupplier.name}
                    </span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                      Verified
                    </span>
                  </div>
                  <span className="text-[11px] text-[#697570] block truncate max-w-[160px] sm:max-w-none">
                    {defaultSupplier.address}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedSupplier(defaultSupplier);
                  navigateTo('supplier-detail');
                }}
                className="text-xs font-bold text-[#168568] hover:underline cursor-pointer shrink-0 ml-2"
              >
                Visit Store
              </button>
            </div>

            {/* Delivery Options */}
            <div className="bg-[#F3F6F4] p-3.5 sm:p-4 rounded-2xl border border-[#E1E8E3] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#102B2A] font-semibold">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#168568]" />
                  Doorstep Home Delivery
                </span>
                <span className="text-[#168568]">1 – 2 hours (₦1,500)</span>
              </div>
              <div className="flex items-center justify-between text-[#697570]">
                <span className="flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-[#697570]" />
                  Pickup Option
                </span>
                <span>FREE at Ikeja Depot</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-[#102B2A]">Quantity:</span>
                <div className="flex items-center border border-[#E1E8E3] rounded-xl bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 hover:bg-[#F3F6F4] rounded-lg transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold tabular-nums">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 hover:bg-[#F3F6F4] rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#168568] hover:bg-[#0C4940] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer text-center active:scale-95"
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#102B2A] hover:bg-black text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer text-center active:scale-95"
                >
                  Buy Now
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => showToast('Connecting to GreenGas Energy support line...')}
                  className="text-xs text-[#697570] hover:text-[#168568] inline-flex items-center gap-1 cursor-pointer"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Depot: +234 802 334 1120</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Section */}
        <div className="pt-8 border-t border-[#E1E8E3] space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl font-bold font-display text-[#102B2A]">
            Customers Also Purchased
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedProduct(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-2xl border border-[#E1E8E3] hover:border-[#168568] p-3 sm:p-4 cursor-pointer transition-all hover:shadow-md group"
              >
                <div className="aspect-square rounded-xl bg-[#F8FAF8] mb-2.5 p-2 sm:p-3 flex items-center justify-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="font-bold text-xs text-[#102B2A] line-clamp-1 group-hover:text-[#168568]">
                  {p.name}
                </h4>
                <span className="font-bold text-xs sm:text-sm text-[#102B2A] block mt-1 tabular-nums">
                  ₦{p.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
