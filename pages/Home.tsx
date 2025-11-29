import React, { useState, useEffect } from 'react';
import { Header, BottomNav } from '../components/Layout';
import { RestaurantCard } from '../components/Shared';
import { CUISINES, RESTAURANTS } from '../data';
import { Search, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtering Logic
  const filteredRestaurants = RESTAURANTS.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header showAddress />
      
      {/* Search Bar - Stickyish */}
      <div className="px-4 py-2 sticky top-[60px] bg-gray-50 z-30">
        <Link to="/search">
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center shadow-sm">
            <Search size={20} className="text-rose-500" />
            <span className="ml-3 text-gray-400 text-sm flex-1">Restaurant name, cuisine, or a dish...</span>
            <div className="border-l border-gray-200 pl-3">
                <Mic size={18} className="text-gray-400" />
            </div>
            </div>
        </Link>
      </div>

      <div className="px-4 py-4 space-y-6">
        
        {/* Promotional Banner */}
        <div className="overflow-x-auto no-scrollbar flex gap-4 snap-x">
            <div className="snap-center shrink-0 w-80 h-40 rounded-2xl overflow-hidden relative shadow-md">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-6">
                    <span className="text-yellow-400 font-bold text-xs uppercase tracking-wider mb-1">Limited Offer</span>
                    <h3 className="text-white text-2xl font-bold leading-tight">50% OFF<br/>First Order</h3>
                    <button className="mt-3 bg-white text-black text-xs font-bold px-4 py-2 rounded-full w-fit">Order Now</button>
                </div>
            </div>
            <div className="snap-center shrink-0 w-80 h-40 rounded-2xl overflow-hidden relative shadow-md">
                <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-6">
                    <span className="text-yellow-400 font-bold text-xs uppercase tracking-wider mb-1">New Arrival</span>
                    <h3 className="text-white text-2xl font-bold leading-tight">Gourmet<br/>Burgers</h3>
                    <button className="mt-3 bg-white text-black text-xs font-bold px-4 py-2 rounded-full w-fit">Try It</button>
                </div>
            </div>
        </div>

        {/* Cuisines */}
        <div>
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-lg font-bold text-gray-800">What's on your mind?</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {CUISINES.map((cuisine) => (
              <div key={cuisine.name} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm">
                  <img src={cuisine.image} alt={cuisine.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-medium text-gray-600">{cuisine.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
             <button className="whitespace-nowrap px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 shadow-sm flex items-center gap-1">Sort <span className="text-[10px]">▼</span></button>
             <button className="whitespace-nowrap px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 shadow-sm">Nearest</button>
             <button className="whitespace-nowrap px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 shadow-sm">Rating 4.0+</button>
             <button className="whitespace-nowrap px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 shadow-sm">Pure Veg</button>
        </div>

        {/* Restaurant List */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">All Restaurants</h2>
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
          <div className="h-10 text-center text-xs text-gray-400 mt-4">
             Yay! You have seen it all.
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};
