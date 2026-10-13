/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RefillModal } from './components/RefillModal';
import { SafetyModal } from './components/SafetyModal';
import { Toast } from './components/Toast';
import { MobileBottomNav } from './components/MobileBottomNav';

import { HomePage } from './pages/HomePage';
import { SuppliersPage } from './pages/SuppliersPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SupplierDetailPage } from './pages/SupplierDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AccountPage } from './pages/AccountPage';
import { SupplierPortalPage } from './pages/SupplierPortalPage';
import { SafetyPage } from './pages/SafetyPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FaqContactPage } from './pages/FaqContactPage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'suppliers':
        return <SuppliersPage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'supplier-detail':
        return <SupplierDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'account':
        return <AccountPage />;
      case 'supplier-portal':
        return <SupplierPortalPage />;
      case 'safety':
        return <SafetyPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'faqs':
        return <FaqContactPage initialTab="faqs" />;
      case 'contact':
        return <FaqContactPage initialTab="contact" />;
      case 'refill':
        return <HomePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-[#172321] selection:bg-[#168568] selection:text-white">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />

      {/* Global Interactive Overlays */}
      <RefillModal />
      <SafetyModal />
      <Toast />

      {/* Persistent Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
