import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ProductProvider } from './context/ProductContext';
import { ReviewProvider } from './context/ReviewContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';
export function App() {
  return (
    <ProductProvider>
      <ReviewProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-brand-light">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#111111',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0px'
                }
              }} />
            
          </Router>
        </CartProvider>
      </ReviewProvider>
    </ProductProvider>);

}