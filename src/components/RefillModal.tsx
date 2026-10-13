import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, Shield, MapPin, Truck, Flame, ArrowRight } from 'lucide-react';
import { REFILL_RATES, MOCK_SUPPLIERS, LAGOS_AREAS, ASSET_IMAGES } from '../data/mockData';

export const RefillModal: React.FC = () => {
  const {
    refillModalOpen,
    setRefillModalOpen,
    addToCart,
    navigateTo,
    selectedArea,
    setSelectedArea,
  } = useApp();

  const [selectedSize, setSelectedSize] = useState('12.5kg');
  const [refillOption, setRefillOption] = useState<'exchange' | 'pickup_refill'>('exchange');
  const [chosenSupplierId, setChosenSupplierId] = useState(MOCK_SUPPLIERS[0].id);
  const [replaceWasher, setReplaceWasher] = useState(true);
  const [cylinderBrand, setCylinderBrand] = useState('Standard Nigerian Steel');

  if (!refillModalOpen) return null;

  const currentRate = REFILL_RATES.find((r) => r.size === selectedSize) || REFILL_RATES[2];
  const chosenSupplier = MOCK_SUPPLIERS.find((s) => s.id === chosenSupplierId) || MOCK_SUPPLIERS[0];
  const deliveryFee = chosenSupplier.deliveryFee;
  const washerFee = replaceWasher ? 500 : 0;
  const totalCost = currentRate.price + deliveryFee + washerFee;

  const handleBookNow = (goToCheckout: boolean) => {
    const refillProduct = {
      id: `refill-${selectedSize}-${Date.now()}`,
      name: `${selectedSize} Cooking Gas Refill`,
      category: 'cylinders' as const,
      capacity: selectedSize,
      price: currentRate.price,
      inStock: true,
      stockCount: 99,
      brand: cylinderBrand,
      rating: 4.9,
      reviewCount: 140,
      image:
        currentRate.size === '6kg'
          ? ASSET_IMAGES.cylinderRed
          : currentRate.size === '3kg'
          ? ASSET_IMAGES.cylinderOrange
          : ASSET_IMAGES.cylinderBlue,
      description: `${selectedSize} cooking gas refill serviced by ${chosenSupplier.name}. Guaranteed accurate weight calibration and leak inspection.`,
      features: [
        'Accurately measured LPG filling (Tare weight verified)',
        'Free safety valve leak-detection test',
        replaceWasher ? 'New heavy-duty gas washer seal fitted' : 'Standard washer checked',
        `${chosenSupplier.name} verified dispatch`,
      ],
      deliveryEstimate: 'Delivered in 30 – 50 mins in Lagos',
    };

    addToCart({
      product: refillProduct,
      quantity: 1,
      serviceType: 'refill',
      selectedSupplier: chosenSupplier,
      refillDetails: {
        cylinderSize: selectedSize,
        refillOption,
        safetyCheck: true,
        replacementWasher: replaceWasher,
        cylinderBrand,
      },
    });

    setRefillModalOpen(false);

    if (goToCheckout) {
      navigateTo('checkout');
    } else {
      navigateTo('cart');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-[#E1E8E3]">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#102B2A] text-white p-4 sm:p-5 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#168568] flex items-center justify-center text-white shrink-0">
              <Flame className="w-5 h-5 text-[#F0AD45]" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold">
                Book Cooking Gas Refill
              </h3>
              <p className="text-[11px] sm:text-xs text-emerald-200/80">
                Doorstep exchange & pickup in Lagos · Accurate tare weight
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRefillModalOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
          
          {/* Step 1: Location in Lagos */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102B2A] mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#168568]" />
              <span>1. Your Delivery Location in Lagos</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-[#F3F6F4] border border-[#E1E8E3] rounded-xl p-2.5 text-base sm:text-sm font-semibold text-[#172321] focus:outline-none focus:border-[#168568]"
              >
                {LAGOS_AREAS.filter((a) => a !== 'All Areas in Lagos').map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-800 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#168568] shrink-0" />
                <span>Express courier available in {selectedArea}</span>
              </div>
            </div>
          </div>

          {/* Step 2: Select Cylinder Size */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102B2A] mb-2">
              2. Choose Cylinder Capacity
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5">
              {REFILL_RATES.map((rate) => {
                const isSelected = selectedSize === rate.size;
                return (
                  <button
                    key={rate.size}
                    type="button"
                    onClick={() => setSelectedSize(rate.size)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#168568] bg-emerald-50/80 shadow-xs ring-2 ring-[#168568]/20'
                        : 'border-[#E1E8E3] hover:border-slate-300 bg-white'
                    }`}
                  >
                    {rate.popular && (
                      <span className="hidden xs:inline absolute -top-2 right-1.5 bg-[#F0AD45] text-slate-900 text-[8px] font-bold px-1.5 py-0.2 rounded">
                        Popular
                      </span>
                    )}
                    <span className="block font-bold text-sm sm:text-base text-[#102B2A]">
                      {rate.size}
                    </span>
                    <span className="block text-[11px] sm:text-xs font-semibold text-[#168568] mt-0.5 sm:mt-1 tabular-nums">
                      ₦{rate.price.toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] sm:text-xs text-[#697570] mt-1.5">{currentRate.desc}</p>
          </div>

          {/* Step 3: Refill Method */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102B2A] mb-2">
              3. Fulfilment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setRefillOption('exchange')}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  refillOption === 'exchange'
                    ? 'border-[#168568] bg-emerald-50/70 ring-1 ring-[#168568]/30'
                    : 'border-[#E1E8E3] bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    refillOption === 'exchange'
                      ? 'border-[#168568] bg-[#168568] text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {refillOption === 'exchange' && <Check className="w-3 h-3" />}
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm text-[#102B2A] block">
                    Instant Doorstep Exchange
                  </span>
                  <span className="text-[11px] text-[#697570] mt-0.5 block leading-relaxed">
                    Rider swaps your empty cylinder on the spot with a tested, full cylinder. (Fastest: 35 mins)
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRefillOption('pickup_refill')}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  refillOption === 'pickup_refill'
                    ? 'border-[#168568] bg-emerald-50/70 ring-1 ring-[#168568]/30'
                    : 'border-[#E1E8E3] bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    refillOption === 'pickup_refill'
                      ? 'border-[#168568] bg-[#168568] text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {refillOption === 'pickup_refill' && <Check className="w-3 h-3" />}
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm text-[#102B2A] block">
                    Pick Up, Refill & Return
                  </span>
                  <span className="text-[11px] text-[#697570] mt-0.5 block leading-relaxed">
                    Rider refills your exact cylinder at our partner plant and returns it in 90 mins.
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Step 4: Choose Verified Supplier */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102B2A] mb-2">
              4. Select Gas Supplier
            </label>
            <div className="space-y-2">
              {MOCK_SUPPLIERS.slice(0, 3).map((sup) => {
                const isSelected = chosenSupplierId === sup.id;
                return (
                  <div
                    key={sup.id}
                    onClick={() => setChosenSupplierId(sup.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#168568] bg-emerald-50/60 ring-1 ring-[#168568]/20'
                        : 'border-[#E1E8E3] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl sm:text-2xl">{sup.logo}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs sm:text-sm text-[#102B2A]">{sup.name}</span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                            Verified
                          </span>
                        </div>
                        <span className="text-[11px] text-[#697570] block truncate max-w-[180px] sm:max-w-none">
                          {sup.address}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-semibold text-[#168568] block">
                        ⭐ {sup.rating}
                      </span>
                      <span className="text-[10px] text-[#697570]">
                        ETA: {sup.deliveryTime}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Safety Protocols */}
          <div className="bg-[#F3F6F4] p-3.5 sm:p-4 rounded-xl space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#102B2A] flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#168568]" />
              Mandatory Safety Protocols
            </h5>
            <div className="flex items-center justify-between text-xs text-[#172321]">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#168568]" />
                Electronic Tare & Weight Verification (Accurate kg)
              </span>
              <span className="font-semibold text-emerald-700">FREE</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#172321]">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#168568]" />
                Soap Water Safety Leak Inspection at Doorstep
              </span>
              <span className="font-semibold text-emerald-700">FREE</span>
            </div>
            <label className="flex items-center justify-between text-xs text-[#172321] cursor-pointer pt-1 border-t border-[#E1E8E3]">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={replaceWasher}
                  onChange={(e) => setReplaceWasher(e.target.checked)}
                  className="rounded text-[#168568] focus:ring-[#168568]"
                />
                <span className="font-medium">
                  Replace Valve O-Ring Washer (Recommended)
                </span>
              </div>
              <span className="font-bold text-[#102B2A] tabular-nums">+₦500</span>
            </label>
          </div>

        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="border-t border-[#E1E8E3] bg-[#F8FAF8] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="w-full sm:w-auto flex sm:flex-col items-baseline justify-between sm:justify-start">
            <span className="text-[11px] text-[#697570] block">Estimated Total:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold font-display text-[#102B2A] tabular-nums">
                ₦{totalCost.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#697570] hidden xs:inline">
                (Refill + Delivery {washerFee > 0 ? '+ Washer' : ''})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleBookNow(false)}
              className="flex-1 sm:flex-initial px-4 py-3 border border-[#168568] text-[#168568] hover:bg-emerald-50 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer text-center"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => handleBookNow(true)}
              className="flex-1 sm:flex-initial px-5 py-3 bg-[#168568] hover:bg-[#0C4940] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center"
            >
              <span>Checkout Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
