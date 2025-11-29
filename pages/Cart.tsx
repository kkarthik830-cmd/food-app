import React, { useState } from 'react';
import { useApp } from '../store';
import { Header } from '../components/Layout';
import { Minus, Plus, MapPin, Wallet, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, addToCart, placeOrder, clearCart, user } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 2.5;
  const platformFee = 0.5;
  const finalTotal = total + deliveryFee + platformFee;

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    // Assumes items are from one restaurant due to logic in Store
    // In a real app we'd need to look up the restaurant name more robustly
    const restId = "1"; 
    const restName = "Current Restaurant"; 
    
    await placeOrder(restId, restName);
    setLoading(false);
    navigate('/tracking');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <Header title="Cart" showBack />
        <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" className="w-64 opacity-50 mb-6" alt="Empty Cart" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Good food is always cooking</h2>
        <p className="text-gray-500 text-center mb-8">Your cart is empty. Add something from the menu.</p>
        <Link to="/home" className="bg-rose-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-rose-200">
            Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="Summary" showBack />
      
      <div className="p-4 space-y-4">
        {/* Items Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
            {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-start gap-2 max-w-[70%]">
                        <div className={`mt-1.5 w-3 h-3 border ${item.isVeg ? 'border-green-600' : 'border-red-600'} rounded-sm flex items-center justify-center shrink-0`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-800 text-sm">{item.name}</span>
                            <span className="text-gray-500 text-xs">${item.price}</span>
                        </div>
                    </div>
                    <div className="flex items-center bg-rose-50 border border-rose-100 rounded-lg px-2 py-1 gap-3">
                        <button onClick={() => removeFromCart(item.id)} className="text-rose-600"><Minus size={14} strokeWidth={3} /></button>
                        <span className="text-sm font-bold text-rose-600">{item.quantity}</span>
                        {/* We need restId here strictly, passing a dummy or storing it in item is better pattern, but for mock: */}
                        <button onClick={() => addToCart(item, 'current')} className="text-rose-600"><Plus size={14} strokeWidth={3} /></button>
                    </div>
                    <span className="font-semibold text-gray-800 text-sm w-12 text-right">${item.price * item.quantity}</span>
                </div>
            ))}
            <div className="pt-4 mt-2">
                <input type="text" placeholder="Write instructions for chef..." className="w-full bg-gray-50 rounded-lg p-3 text-sm focus:outline-none" />
            </div>
        </div>

        {/* Offers */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">%</div>
                <div className="flex flex-col">
                    <span className="font-bold text-gray-800 text-sm">Apply Coupon</span>
                    <span className="text-xs text-gray-400">Save more on your order</span>
                </div>
            </div>
            <ChevronRight size={18} className="text-gray-400"/>
        </div>

        {/* Bill Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 mb-3">Bill Details</h3>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Item Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-3 pb-3 border-b border-gray-100">
                <span>Platform Fee</span>
                <span>${platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800 text-base">
                <span>To Pay</span>
                <span>${finalTotal.toFixed(2)}</span>
            </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
             <div className="flex items-start gap-3">
                 <MapPin className="text-gray-400 mt-1" size={20} />
                 <div>
                     <div className="flex items-center gap-2 mb-1">
                         <h3 className="font-bold text-gray-800 text-sm">Delivering to Home</h3>
                         <button className="text-rose-500 text-xs font-bold uppercase">Change</button>
                     </div>
                     <p className="text-xs text-gray-500">{user?.addresses[0].details}</p>
                 </div>
             </div>
        </div>
      </div>

      {/* Pay Button */}
      <div className="fixed bottom-0 w-full bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
        <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
                <Wallet className="text-gray-400" size={18} />
                <span className="text-sm font-semibold text-gray-700">Cash / UPI</span>
            </div>
            <span className="text-rose-500 font-bold text-xs uppercase">Change</span>
        </div>
        <button 
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-rose-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-rose-200 flex justify-between items-center px-6 active:scale-[0.99] transition-transform"
        >
            <div className="flex flex-col items-start leading-none">
                <span className="text-lg">${finalTotal.toFixed(2)}</span>
                <span className="text-[10px] font-medium opacity-80">TOTAL</span>
            </div>
            <span className="text-lg flex items-center gap-2">
                {loading ? 'Placing Order...' : 'Place Order'} {!loading && <ChevronRight size={20} />}
            </span>
        </button>
      </div>
    </div>
  );
};
