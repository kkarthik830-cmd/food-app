import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Home, Search, ShoppingBag, User, MapPin, ChevronLeft } from 'lucide-react';
import { useApp } from '../store';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { cart } = useApp();
  const activeClass = "text-rose-500";
  const inactiveClass = "text-gray-400";

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Don't show on product details or specialized pages if desired, but typically always shown in mobile apps
  // Hiding on splash/onboarding/login handled in App.tsx structure usually.
  
  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-100 py-2 px-6 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <Link to="/home" className={`flex flex-col items-center gap-1 ${location.pathname === '/home' ? activeClass : inactiveClass}`}>
        <Home size={24} />
        <span className="text-xs font-medium">Home</span>
      </Link>
      <Link to="/search" className={`flex flex-col items-center gap-1 ${location.pathname === '/search' ? activeClass : inactiveClass}`}>
        <Search size={24} />
        <span className="text-xs font-medium">Search</span>
      </Link>
      <Link to="/cart" className={`relative flex flex-col items-center gap-1 ${location.pathname === '/cart' ? activeClass : inactiveClass}`}>
        <div className="relative">
            <ShoppingBag size={24} />
            {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartItemCount}
                </span>
            )}
        </div>
        <span className="text-xs font-medium">Cart</span>
      </Link>
      <Link to="/profile" className={`flex flex-col items-center gap-1 ${location.pathname === '/profile' ? activeClass : inactiveClass}`}>
        <User size={24} />
        <span className="text-xs font-medium">Profile</span>
      </Link>
    </div>
  );
};

export const Header: React.FC<{ title?: string; showBack?: boolean; showAddress?: boolean }> = ({ title, showBack, showAddress }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();

  const handleBack = () => {
    // Check if there is a history stack to go back to within the app
    // 'default' key usually implies the start of the stack for this session
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      // If direct landing or no history, go to home
      navigate('/home');
    }
  };

  return (
    <div className="sticky top-0 bg-white z-40 px-4 py-3 shadow-sm flex items-center gap-3 w-full">
      {showBack && (
        <button 
            type="button"
            onClick={handleBack} 
            className="p-1 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Go back"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
      )}
      
      {showAddress ? (
        <div className="flex flex-col">
            <div className="flex items-center gap-1 text-rose-500 font-bold text-lg">
                <MapPin size={20} fill="currentColor" />
                <span>Home</span>
                <span className="text-gray-400 font-normal text-sm">▼</span>
            </div>
            <p className="text-xs text-gray-500 truncate max-w-[250px]">
                {user?.addresses[0]?.details || 'Select a location'}
            </p>
        </div>
      ) : (
        <h1 className="text-lg font-bold text-gray-800 flex-1">{title}</h1>
      )}
    </div>
  );
};
