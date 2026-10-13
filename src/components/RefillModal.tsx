import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, Shield, MapPin, Truck, Flame, ArrowRight } from 'lucide-react';
import { REFILL_RATES, MOCK_SUPPLIERS, LAGOS_AREAS } from '../data/mockData';

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
    // Construct a refill product representation
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
      image: currentRate.size === '6kg'
        ? '/src/assets/images/gas_cylinder_red_1791888544166.jpg'
        : currentRate.size === '3kg'
        ? '/src/assets/images/gas_cylinder_orange_1791888580571.jpg'
        : '/src/assets/images/gas_cylinder_blue_1791888544072.jpg',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E1E8E3]">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#102B2A] text-white p-5 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#168568] flex items-center justify-center text-white">
              <Flame className="w-5 h-5 text-[#F0AD45]" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Book Cooking Gas Refill</h3>
              <p className="text-xs text-emerald-200/80">
                Doorstep delivery & cylinder pickup in Lagos · Verified accurate weight
              </p>
            </div>
          </div>
          <button
            onClick={() => setRefillModalOpen(false)}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Step 1: Location in Lagos */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102B2A] mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#168568]" />
              1. Your Delivery Location in Lagos
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-[#F3F6F4] border border-[#E1E8E3] rounded-lg p-2.5 text-sm font-medium text-[#172321] focus:outline-none focus:border-[#168568]"
              >
                {LAGOS_AREAS.filter((a) => a !== 'All Areas in Lagos').map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-xs text-emerald-800 flex items-center gap-2">
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
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {REFILL_RATES.map((rate) => {
                const isSelected = selectedSize === rate.size;
                return (
                  <button
                    key={rate.size}
                    type="button"
                    onClick={() => setSelectedSize(rate.size)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#168568] bg-emerald-50/70 shadow-xs'
                        : 'border-[#E1E8E3] hover:border-slate-300 bg-white'
                    }`}
                  >
                    {rate.popular && (
                      <span className="absolute -top-2 right-2 bg-[#F0AD45] text-slate-900 text-[9px] font-bold px-1.5 py-0.2 rounded">
                        Most Popular
                      </span>
                    )}
                    <span className="block font-bold text-base text-[#102B2A]">
                      {rate.size}
                    </span>
                    <span className="block text-xs font-semibold text-[#168568] mt-1 tabular-nums">
                      ₦{rate.price.toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[#697570] mt-1.5">{currentRate.desc}</p>
          </div>

          {/* Step 3: Refill Method */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#102B2A] mb-2">
              3. Fulfilment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRefillOption('exchange')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  refillOption === 'exchange'
                    ? 'border-[#168568] bg-emerald-50/70'
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
                  <span className="font-semibold text-sm text-[#102B2A] block">
                    Instant Doorstep Exchange
                  </span>
                  <span className="text-xs text-[#697570] mt-0.5 block">
                    Rider arrives with an inspected, full cylinder and swaps your empty one on the spot. (Fastest: 35 mins)
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRefillOption('pickup_refill')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  refillOption === 'pickup_refill'
                    ? 'border-[#168568] bg-emerald-50/70'
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
                  <span className="font-semibold text-sm text-[#102B2A] block">
                    Pick Up, Refill & Return
                  </span>
                  <span className="text-xs text-[#697570] mt-0.5 block">
                    Rider takes your exact cylinder to our partner depot, refills it, and brings it back to your doorstep within 90 mins.
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
                        ? 'border-[#168568] bg-emerald-50/50'
                        : 'border-[#E1E8E3] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sup.logo}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#102B2A]">{sup.name}</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                            Verified
                          </span>
                        </div>
                        <span className="text-xs text-[#697570]">{sup.address}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-[#168568] block">
                        ⭐ {sup.rating} ({sup.reviewCount})
                      </span>
                      <span className="text-[11px] text-[#697570]">
                        ETA: {sup.deliveryTime}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Safety Add-ons */}
          <div className="bg-[#F3F6F4] p-4 rounded-xl space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#102B2A] flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#168568]" />
              Mandatory Safety Protocols
            </h5>
            <div className="flex items-center justify-between text-xs text-[#172321]">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#168568]" />
                Electronic Tare & Weight Verification (Accurate kg)
              </span>
              <span className="font-semibold text-emerald-700">Included FREE</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#172321]">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#168568]" />
                Soap Water Safety Leak Inspection at Doorstep
              </span>
              <span className="font-semibold text-emerald-700">Included FREE</span>
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
                  Replace Valve O-Ring Rubber Washer (Recommended to prevent micro-leaks)
                </span>
              </div>
              <span className="font-bold text-[#102B2A] tabular-nums">+₦500</span>
            </label>
          </div>

          {/* Pricing Summary */}
          <div className="border-t border-[#E1E8E3] pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#697570] block">Estimated Total (No Hidden Fees)</span>
              <span className="text-2xl font-bold font-display text-[#102B2A] tabular-nums">
                ₦{totalCost.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#697570] block">
                Refill ₦{currentRate.price.toLocaleString()} + Logistics ₦{deliveryFee.toLocaleString()}
                {washerFee > 0 ? ' + Washer ₦500' : ''}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleBookNow(false)}
                className="w-1/2 sm:w-auto px-5 py-3 border border-[#168568] text-[#168568] hover:bg-emerald-50 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => handleBookNow(true)}
                className="w-1/2 sm:w-auto px-6 py-3 bg-[#168568] hover:bg-[#0C4940] text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Checkout Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
