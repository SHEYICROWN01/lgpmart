export type ServiceType = 'refill' | 'cylinder' | 'accessory';

export interface Product {
  id: string;
  name: string;
  category: 'cylinders' | 'regulators' | 'hoses' | 'cookers' | 'safety' | 'accessories';
  capacity?: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  brand: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  features: string[];
  supplierId?: string;
  supplierName?: string;
  deliveryEstimate: string;
}

export interface Supplier {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  address: string;
  area: string;
  phone: string;
  email: string;
  pricePerKg: number;
  minPrice: number;
  deliveryTime: string;
  deliveryFee: number;
  supportedServices: ('Refill' | 'Delivery' | 'Cylinder Exchange' | 'Pickup')[];
  availableSizes: ('3kg' | '6kg' | '12.5kg' | '25kg' | '50kg')[];
  operatingHours: string;
  isOpen: boolean;
  coordinates: { lat: number; lng: number };
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  serviceType: ServiceType;
  selectedSupplier?: Supplier;
  refillDetails?: {
    cylinderSize: string;
    refillOption: 'exchange' | 'pickup_refill';
    safetyCheck: boolean;
    replacementWasher: boolean;
    cylinderBrand?: string;
  };
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  altPhone?: string;
  state: string;
  area: string;
  streetAddress: string;
  landmark?: string;
  deliveryNotes?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  capacity?: string;
  serviceType: ServiceType;
  supplierName?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'placed' | 'confirmed' | 'dispatched' | 'out_for_delivery' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  safetyCheckFee: number;
  total: number;
  deliveryAddress: DeliveryAddress;
  deliverySlot: string;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending';
  supplier: {
    name: string;
    phone: string;
    address: string;
  };
  rider?: {
    name: string;
    phone: string;
    vehiclePlate: string;
    vehicleType: string;
    rating: number;
  };
  estimatedDeliveryTime: string;
}

export type PageRoute =
  | 'home'
  | 'suppliers'
  | 'refill'
  | 'shop'
  | 'product-detail'
  | 'supplier-detail'
  | 'cart'
  | 'checkout'
  | 'order-tracking'
  | 'account'
  | 'supplier-portal'
  | 'safety'
  | 'how-it-works'
  | 'faqs'
  | 'contact';
