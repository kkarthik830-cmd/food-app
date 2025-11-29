import React from 'react';
import { Star, Clock, Minus, Plus, Heart } from 'lucide-react';
import { MenuItem, Restaurant } from '../types';
import { useApp } from '../store';
import { Link } from 'react-router-dom';

export const RatingBadge: React.FC<{ rating: number }> = ({ rating }) => (
  <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-white text-xs font-bold ${rating >= 4.0 ? 'bg-green-600' : 'bg-yellow-500'}`}>
    {rating} <Star size={10} fill="currentColor" />
  </span>
);

export const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
    const { toggleFavorite, favorites } = useApp();
    const isFav = favorites.includes(restaurant.id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-4 border border-gray-100 relative group">
        <Link to={`/restaurant/${restaurant.id}`} className="block">
            <div className="relative h-48 w-full overflow-hidden">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {restaurant.promoted && (
                    <span className="absolute top-3 left-3 bg-gray-800/80 text-white text-[10px] font-semibold px-2 py-1 rounded uppercase tracking-wide">Promoted</span>
                )}
                {restaurant.discount && (
                    <div className="absolute bottom-3 left-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1">
                         % {restaurant.discount}
                    </div>
                )}
                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-gray-700 shadow-sm">
                    {restaurant.deliveryTime}
                </span>
            </div>
      </Link>
      
      <button 
        onClick={(e) => { e.preventDefault(); toggleFavorite(restaurant.id); }}
        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm z-10 hover:bg-white"
      >
        <Heart size={18} className={isFav ? "text-rose-500 fill-rose-500" : "text-gray-600"} />
      </button>

      <Link to={`/restaurant/${restaurant.id}`} className="block p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-800 truncate pr-2">{restaurant.name}</h3>
          <RatingBadge rating={restaurant.rating} />
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span className="truncate">{restaurant.cuisine.join(', ')}</span>
          <span className="text-gray-400">•</span>
          <span>${restaurant.priceForTwo} for two</span>
        </div>
        <hr className="border-dashed border-gray-200 mb-3"/>
        <div className="flex items-center gap-2 text-xs text-gray-500">
            <img src="https://cdn-icons-png.flaticon.com/128/683/683071.png" className="w-4 h-4 opacity-60" alt="" />
            <span>2000+ orders recently</span>
        </div>
      </Link>
    </div>
  );
};

export const MenuCard: React.FC<{ item: MenuItem; restaurantId: string }> = ({ item, restaurantId }) => {
  const { cart, addToCart, removeFromCart } = useApp();
  const cartItem = cart.find((i) => i.id === item.id);
  const qty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="flex justify-between items-start py-6 border-b border-gray-100 last:border-0">
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2 mb-1">
             {item.isVeg ? (
                 <span className="border border-green-600 p-[2px] rounded-[2px] flex items-center justify-center w-4 h-4"><div className="w-2 h-2 rounded-full bg-green-600"></div></span>
             ) : (
                 <span className="border border-red-600 p-[2px] rounded-[2px] flex items-center justify-center w-4 h-4"><div className="w-2 h-2 rounded-full bg-red-600"></div></span>
             )}
             <span className="text-xs font-semibold text-yellow-500 flex items-center gap-0.5"> <Star size={10} fill="currentColor"/> {item.rating}</span>
        </div>
        <h4 className="font-bold text-gray-800 text-base mb-1">{item.name}</h4>
        <p className="font-semibold text-gray-700 text-sm mb-2">${item.price}</p>
        <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{item.description}</p>
      </div>
      
      <div className="flex flex-col items-center relative">
        <div className="w-28 h-24 rounded-xl overflow-hidden mb-[-20px] shadow-md relative">
             <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-gray-100 w-24 h-9 flex items-center justify-between px-2 z-10">
          {qty > 0 ? (
            <>
              <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-rose-500 font-bold p-1"><Minus size={14} strokeWidth={3} /></button>
              <span className="text-sm font-bold text-rose-500">{qty}</span>
              <button onClick={() => addToCart(item, restaurantId)} className="text-gray-500 hover:text-rose-500 font-bold p-1"><Plus size={14} strokeWidth={3} /></button>
            </>
          ) : (
            <button onClick={() => addToCart(item, restaurantId)} className="w-full text-center text-sm font-bold text-rose-500 uppercase">
              Add
            </button>
          )}
        </div>
        <span className="text-[10px] text-gray-400 mt-2">customizable</span>
      </div>
    </div>
  );
};
