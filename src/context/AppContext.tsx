import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageRoute, Product, Supplier, CartItem, Order, DeliveryAddress } from '../types';
import { MOCK_PRODUCTS, MOCK_SUPPLIERS, MOCK_ORDERS } from '../data/mockData';

interface AppContextType {
  currentPage: PageRoute;
  navigateTo: (page: PageRoute) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product;
  setSelectedProduct: (p: Product) => void;
  selectedSupplier: Supplier;
  setSelectedSupplier: (s: Supplier) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartTotal: number;
  
  // Orders
  orders: Order[];
  activeOrder: Order;
  setActiveOrder: (order: Order) => void;
  createOrder: (data: {
    address: DeliveryAddress;
    slot: string;
    paymentMethod: string;
    supplier?: Supplier;
  }) => Order;
  
  // Modals & Popups
  refillModalOpen: boolean;
  setRefillModalOpen: (open: boolean) => void;
  safetyModalOpen: boolean;
  setSafetyModalOpen: (open: boolean) => void;
  contactModalSupplier: Supplier | null;
  setContactModalSupplier: (supplier: Supplier | null) => void;
  toast: string | null;
  showToast: (msg: string) => void;

  // Supplier Portal state
  supplierOrders: Order[];
  updateSupplierOrderStatus: (orderId: string, status: Order['status']) => void;
  supplierIsOnline: boolean;
  setSupplierIsOnline: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedArea, setSelectedArea] = useState<string>('Ikeja');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product>(MOCK_PRODUCTS[2]); // default to 12.5kg
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier>(MOCK_SUPPLIERS[0]); // GreenGas Energy
  
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'init-1',
      product: MOCK_PRODUCTS[2], // 12.5kg Cylinder
      quantity: 1,
      serviceType: 'cylinder',
      selectedSupplier: MOCK_SUPPLIERS[0],
    },
    {
      id: 'init-2',
      product: MOCK_PRODUCTS[4], // Gas Regulator
      quantity: 1,
      serviceType: 'accessory',
      selectedSupplier: MOCK_SUPPLIERS[0],
    },
    {
      id: 'init-3',
      product: MOCK_PRODUCTS[5], // Gas Hose
      quantity: 1,
      serviceType: 'accessory',
      selectedSupplier: MOCK_SUPPLIERS[0],
    },
  ]);

  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [activeOrder, setActiveOrder] = useState<Order>(MOCK_ORDERS[0]);
  
  // Supplier Portal order management
  const [supplierOrders, setSupplierOrders] = useState<Order[]>(MOCK_ORDERS);
  const [supplierIsOnline, setSupplierIsOnline] = useState<boolean>(true);

  // Modals
  const [refillModalOpen, setRefillModalOpen] = useState(false);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [contactModalSupplier, setContactModalSupplier] = useState<Supplier | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === newItem.product.id &&
        item.serviceType === newItem.serviceType &&
        item.refillDetails?.cylinderSize === newItem.refillDetails?.cylinderSize
    );

    if (existingIndex > -1) {
      setCart((prev) => {
        const next = [...prev];
        next[existingIndex].quantity += newItem.quantity;
        return next;
      });
      showToast(`Updated quantity for ${newItem.product.name}`);
    } else {
      const generatedId = `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      setCart((prev) => [...prev, { ...newItem, id: generatedId }]);
      showToast(`Added ${newItem.product.name} to cart`);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDeliveryFee = cart.length > 0 ? 1500 : 0;
  const cartTotal = cartSubtotal + cartDeliveryFee;

  // Create Order from Checkout
  const createOrder = (data: {
    address: DeliveryAddress;
    slot: string;
    paymentMethod: string;
    supplier?: Supplier;
  }): Order => {
    const orderNum = `LPG-${Math.floor(10000 + Math.random() * 90000)}`;
    const chosenSupplier = data.supplier || selectedSupplier || MOCK_SUPPLIERS[0];
    
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: 'Just now',
      status: 'confirmed',
      items: cart.map((c) => ({
        id: c.id,
        name: c.serviceType === 'refill' 
          ? `${c.refillDetails?.cylinderSize || '12.5kg'} Gas Refill (${c.refillDetails?.refillOption === 'exchange' ? 'Doorstep Exchange' : 'Pickup & Return'})`
          : c.product.name,
        quantity: c.quantity,
        price: c.product.price,
        image: c.product.image,
        capacity: c.product.capacity,
        serviceType: c.serviceType,
        supplierName: chosenSupplier.name,
      })),
      subtotal: cartSubtotal,
      deliveryFee: cartDeliveryFee,
      safetyCheckFee: 500,
      total: cartTotal + 500,
      deliveryAddress: data.address,
      deliverySlot: data.slot,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentMethod.includes('Online') ? 'paid' : 'pending',
      supplier: {
        name: chosenSupplier.name,
        phone: chosenSupplier.phone,
        address: chosenSupplier.address,
      },
      rider: {
        name: 'Olumide Fashola',
        phone: '+234 803 294 8812',
        vehiclePlate: 'APP-652-KS',
        vehicleType: 'Branded Express Gas Delivery Van',
        rating: 4.9,
      },
      estimatedDeliveryTime: 'Arriving in 35 – 45 mins',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setSupplierOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateSupplierOrderStatus = (orderId: string, status: Order['status']) => {
    setSupplierOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    if (activeOrder.id === orderId) {
      setActiveOrder((prev) => ({ ...prev, status }));
    }
    showToast(`Order status updated to: ${status.replace('_', ' ')}`);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedArea,
        setSelectedArea,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        selectedSupplier,
        setSelectedSupplier,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDeliveryFee,
        cartTotal,
        orders,
        activeOrder,
        setActiveOrder,
        createOrder,
        refillModalOpen,
        setRefillModalOpen,
        safetyModalOpen,
        setSafetyModalOpen,
        contactModalSupplier,
        setContactModalSupplier,
        toast,
        showToast,
        supplierOrders,
        updateSupplierOrderStatus,
        supplierIsOnline,
        setSupplierIsOnline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
