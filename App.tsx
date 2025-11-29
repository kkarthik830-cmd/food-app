import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store';
import { Home } from './pages/Home';
import { RestaurantDetails } from './pages/Restaurant';
import { Cart } from './pages/Cart';
import { OrderTracking } from './pages/Tracking';
import { Profile } from './pages/Profile';
import { Search } from './pages/Search';

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => setShowSplash(false), 2000);
      return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
      return (
          <div className="h-screen w-screen bg-rose-500 flex flex-col items-center justify-center text-white">
              <h1 className="text-6xl font-extrabold tracking-tighter mb-2">Crave</h1>
              <p className="text-rose-200 font-medium tracking-widest text-sm uppercase">Food Delivery</p>
          </div>
      )
  }

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/tracking" element={<OrderTracking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;