import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './contexts/WishlistContext';
import { QuoteProvider } from './contexts/QuoteContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';
import GalleryPage from './pages/GalleryPage';
import QuotePage from './pages/QuotePage';
import QuoteRequestPage from './pages/QuoteRequestPage';
import CollectionPage from './pages/CollectionPage';

function App() {
  return (
    <Router>
      <WishlistProvider>
        <QuoteProvider>
          <div className="min-h-screen bg-stone-50">
            <ScrollToTop />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:category" element={<ShopPage />} />
                <Route path="/collection" element={<CollectionPage />} />
                <Route path="/collection/:category" element={<CollectionPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/quote" element={<QuotePage />} />
                <Route path="/quote-request" element={<QuoteRequestPage />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </QuoteProvider>
      </WishlistProvider>
    </Router>
  );
}

export default App;