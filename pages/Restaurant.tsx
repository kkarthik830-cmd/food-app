import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { RESTAURANTS } from '../data';
import { Header } from '../components/Layout';
import { MenuCard, RatingBadge } from '../components/Shared';
import { Clock, MapPin, Search } from 'lucide-react';
import { useApp } from '../store';

export const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const restaurant = RESTAURANTS.find((r) => r.id === id);
  const { cart } = useApp();
  
  // Calculate cart total quantity for the floating button
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div className="min-h-screen bg-white pb-24 relative">
      <Header title="" showBack />
      
      <div className="px-4 pt-2">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-2">{restaurant.name}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
                <RatingBadge rating={restaurant.rating} />
                <span className="text-xs text-gray-400">(1K+ ratings)</span>
            </div>
            <span>•</span>
            <span>{restaurant.cuisine.join(', ')}</span>
        </div>

        {/* Info Card */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100 flex justify-between items-center">
             <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                     <Clock size={16} /> <span>{restaurant.deliveryTime}</span>
                 </div>
                 <span className="text-xs text-gray-400 pl-6">Delivery to Home</span>
             </div>
             <div className="h-8 w-[1px] bg-gray-200"></div>
             <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                     <MapPin size={16} /> <span>{restaurant.distance}</span>
                 </div>
                 <span className="text-xs text-gray-400 pl-6">Distance</span>
             </div>
        </div>

        {/* Menu Search */}
        <div className="mb-6 relative">
            <input 
                type="text" 
                placeholder="Search in menu" 
                className="w-full bg-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <Search size={16} className="absolute left-3 top-3.5 text-gray-400" />
        </div>

        {/* Menu Section */}
        <div>
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-gray-800">Recommended</h3>
                <span className="bg-rose-500/10 text-rose-500 text-[10px] font-bold px-1.5 py-0.5 rounded-md">{restaurant.menu.length} ITEMS</span>
            </div>
            
            <div className="space-y-1">
                {restaurant.menu.map((item) => (
                    <MenuCard key={item.id} item={item} restaurantId={restaurant.id} />
                ))}
            </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
          <div className="fixed bottom-4 left-4 right-4 z-50">
              <Link to="/cart">
                  <div className="bg-rose-500 rounded-xl p-3 shadow-xl flex justify-between items-center text-white">
                      <div className="flex flex-col pl-2">
                          <span className="text-xs font-medium uppercase opacity-90">{totalItems} Items</span>
                          <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2 pr-2 font-bold text-sm">
                          View Cart <span className="text-lg">→</span>
                      </div>
                  </div>
              </Link>
          </div>
      )}
    </div>
  );
};
