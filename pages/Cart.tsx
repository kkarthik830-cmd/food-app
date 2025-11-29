
import React, { useState } from 'react';
import { useApp } from '../store';
import { Header } from '../components/Layout';
import { Minus, Plus, MapPin, Wallet, ChevronRight, Calendar, Clock, X, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { RESTAURANTS } from '../data';
import { PaymentMethod } from '../types';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, addToCart, placeOrder, user, cartRestaurantId, updateAddress } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Helper to get default time (1 hour from now) formatted for datetime-local
  const getDefaultScheduleTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    // Adjust for timezone to ensure input displays correct local time
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now.getTime() - offset)).toISOString().slice(0, 16);
    return localISOTime;
  };
  
  const getMinTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return (new Date(now.getTime() - offset)).toISOString().slice(0, 16);
  };

  const getMaxTime = () => {
    const now = new Date();
    now.setDate(now.getDate() + 2); // Max 2 days in future
    const offset = now.getTimezoneOffset() * 60000;
    return (new Date(now.getTime() - offset)).toISOString().slice(0, 16);
  };

  // Schedule state
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleTime, setScheduleTime] = useState(getDefaultScheduleTime());

  // Address editing state
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState('');

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 2.5;
  const platformFee = 0.5;
  const finalTotal = total + deliveryFee + platformFee;

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    
    // Validate schedule if selected
    if (isScheduled && !scheduleTime) {
        alert("Please select a date and time for your scheduled order.");
        return;
    }

    setLoading(true);
    
    const restaurant = RESTAURANTS.find(r => r.id === cartRestaurantId);
    const restName = restaurant?.name || "Restaurant"; 
    const restId = cartRestaurantId || "1";

    const orderId = await placeOrder(restId, restName, isScheduled ? scheduleTime : undefined, paymentMethod);
    setLoading(false);
    navigate(`/tracking/${orderId}`);
  };
  
  const toggleSchedule = (scheduled: boolean) => {
      setIsScheduled(scheduled);
      if (scheduled && !scheduleTime) {
          setScheduleTime(getDefaultScheduleTime());
      }
  };

  const handleAddressChange = () => {
    if (isEditingAddress) {
        if (tempAddress.trim()) {
            updateAddress(tempAddress);
        }
        setIsEditingAddress(false);
    } else {
        setTempAddress(user?.addresses[0]?.details || '');
        setIsEditingAddress(true);
    }
  };

  const paymentOptions: { id: PaymentMethod; label: string; icon: string }[] = [
    { id: 'Google Pay', label: 'Google Pay', icon: 'https://cdn-icons-png.flaticon.com/128/6124/6124998.png' },
    { id: 'PhonePe', label: 'PhonePe', icon: 'https://cdn-icons-png.flaticon.com/128/6124/6124991.png' },
    { id: 'UPI', label: 'UPI ID', icon: 'https://cdn-icons-png.flaticon.com/128/10096/10096338.png' },
    { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: 'https://cdn-icons-png.flaticon.com/128/2331/2331941.png' },
  ];

  const selectedPaymentOption = paymentOptions.find(p => p.id === paymentMethod);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header title="Cart" showBack />
        <div className="flex-1 flex flex-col items-center justify-center p-6 -mt-10">
            <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" className="w-64 opacity-50 mb-6" alt="Empty Cart" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Good food is always cooking</h2>
            <p className="text-gray-500 text-center mb-8">Your cart is empty. Add something from the menu.</p>
            <Link to="/home" className="bg-rose-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-rose-200">
                Browse Restaurants
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-40">
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
                        <button onClick={() => addToCart(item, cartRestaurantId || '1')} className="text-rose-600"><Plus size={14} strokeWidth={3} /></button>
                    </div>
                    <span className="font-semibold text-gray-800 text-sm w-12 text-right">${item.price * item.quantity}</span>
                </div>
            ))}
            <div className="pt-4 mt-2">
                <input type="text" placeholder="Write instructions for chef..." className="w-full bg-gray-50 rounded-lg p-3 text-sm focus:outline-none" />
            </div>
        </div>
        
        {/* Delivery Options / Scheduling */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 mb-3">Delivery Preference</h3>
            <div className="flex gap-3 mb-3">
                <button 
                    onClick={() => toggleSchedule(false)}
                    className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${!isScheduled ? 'bg-rose-50 border-rose-500 text-rose-600' : 'bg-white border-gray-200 text-gray-500'}`}
                >
                    <Clock size={16} /> Standard
                </button>
                <button 
                    onClick={() => toggleSchedule(true)}
                    className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${isScheduled ? 'bg-rose-50 border-rose-500 text-rose-600' : 'bg-white border-gray-200 text-gray-500'}`}
                >
                    <Calendar size={16} /> Schedule
                </button>
            </div>
            
            {isScheduled && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-xs text-gray-500 mb-1 block font-medium">Select Date & Time</label>
                    <input 
                        type="datetime-local" 
                        value={scheduleTime}
                        min={getMinTime()}
                        max={getMaxTime()}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 font-sans text-gray-700"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Schedule your order within 2 days before</p>
                </div>
            )}
            {!isScheduled && (
                <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} /> Delivery in 30-45 mins
                </div>
            )}
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
            <div className="flex justify-between font-bold text-gray-800 text-base mb-3 pb-3 border-b border-gray-100">
                <span>To Pay</span>
                <span>${finalTotal.toFixed(2)}</span>
            </div>
            
            {/* Payment Method Selector */}
            <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                onClick={() => setShowPaymentOptions(true)}
            >
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Payment via</span>
                    <div className="flex items-center gap-2">
                        {selectedPaymentOption?.icon && (
                            <img src={selectedPaymentOption.icon} className="w-5 h-5 object-contain" alt="" />
                        )}
                        <span className="font-semibold text-gray-800 text-sm">{paymentMethod}</span>
                    </div>
                 </div>
                 <span className="text-rose-500 text-xs font-bold uppercase flex items-center gap-1">Change <ChevronRight size={14}/></span>
            </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
             <div className="flex items-start gap-3">
                 <MapPin className="text-gray-400 mt-1" size={20} />
                 <div className="flex-1">
                     <div className="flex items-center justify-between mb-1">
                         <h3 className="font-bold text-gray-800 text-sm">Delivering to Home</h3>
                         <button 
                             onClick={handleAddressChange} 
                             className="text-rose-500 text-xs font-bold uppercase hover:bg-rose-50 px-2 py-1 rounded transition-colors"
                         >
                             {isEditingAddress ? 'Save' : 'Change'}
                         </button>
                     </div>
                     {isEditingAddress ? (
                         <textarea 
                             value={tempAddress} 
                             onChange={(e) => setTempAddress(e.target.value)}
                             className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-rose-500 font-sans"
                             rows={2}
                             placeholder="Enter delivery address..."
                             autoFocus
                         />
                     ) : (
                         <p className="text-xs text-gray-500 leading-relaxed">{user?.addresses[0].details}</p>
                     )}
                 </div>
             </div>
        </div>
      </div>

      {/* Pay Button */}
      <div className="fixed bottom-0 w-full bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40">
        <button 
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`w-full text-white font-bold py-3.5 rounded-xl shadow-lg flex justify-between items-center px-6 active:scale-[0.99] transition-transform ${isScheduled ? 'bg-gray-800 shadow-gray-200' : 'bg-rose-500 shadow-rose-200'}`}
        >
            <div className="flex flex-col items-start leading-none">
                <span className="text-lg">${finalTotal.toFixed(2)}</span>
                <span className="text-[10px] font-medium opacity-80">TOTAL</span>
            </div>
            <span className="text-lg flex items-center gap-2">
                {loading ? 'Processing...' : (isScheduled ? 'Confirm Schedule' : 'Place Order')} {!loading && <ChevronRight size={20} />}
            </span>
        </button>
      </div>

      {/* Payment Options Drawer/Modal */}
      {showPaymentOptions && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPaymentOptions(false)}></div>
            <div className="bg-white rounded-t-3xl p-6 relative z-10 animate-in slide-in-from-bottom duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Payment Options</h3>
                    <button onClick={() => setShowPaymentOptions(false)} className="p-1 bg-gray-100 rounded-full"><X size={20} className="text-gray-500"/></button>
                </div>
                <div className="space-y-3 mb-4">
                    {paymentOptions.map((opt) => (
                        <div 
                            key={opt.id}
                            onClick={() => {
                                setPaymentMethod(opt.id);
                                setShowPaymentOptions(false);
                            }}
                            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === opt.id ? 'border-rose-500 bg-rose-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center p-1">
                                    <img src={opt.icon} alt={opt.label} className="w-full h-full object-contain" />
                                </div>
                                <span className="font-semibold text-gray-800">{opt.label}</span>
                            </div>
                            {paymentMethod === opt.id && (
                                <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                                    <Check size={14} className="text-white" strokeWidth={3} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
