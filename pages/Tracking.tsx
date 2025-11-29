import React, { useEffect, useState } from 'react';
import { useApp } from '../store';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle, Clock, MapPin, ChefHat, Truck, Home } from 'lucide-react';
import { OrderStatus } from '../types';

export const OrderTracking: React.FC = () => {
  const [status, setStatus] = useState<OrderStatus>('placed');
  
  // Simulation of status updates
  useEffect(() => {
    const sequence: OrderStatus[] = ['confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setStatus(sequence[i]);
        i++;
      }
    }, 4000); // Fast simulation for demo
    return () => clearInterval(interval);
  }, []);

  const getStatusIndex = (s: OrderStatus) => {
      const order = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
      return order.indexOf(s);
  };
  
  const currentIdx = getStatusIndex(status);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Map Placeholder */}
      <div className="h-[40vh] w-full bg-gray-200 relative">
        <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover opacity-60 grayscale" />
        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg border-2 border-rose-500 animate-bounce">
             <Truck className="text-rose-500" size={24} />
        </div>
        <Link to="/home" className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md z-10">
            <Home size={20} className="text-gray-700" />
        </Link>
      </div>

      <div className="bg-white -mt-6 rounded-t-3xl px-6 py-8 relative z-10 min-h-[60vh] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-start mb-8">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Arriving in 25 mins</h2>
                <p className="text-sm text-gray-500 mt-1">On time | Spice Symphony</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" />
            </div>
        </div>

        {/* Steps */}
        <div className="space-y-6 relative mb-8">
             <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gray-100"></div>
             {/* Dynamic progress line */}
             <div 
                className="absolute left-[15px] top-2 w-[2px] bg-green-500 transition-all duration-1000 ease-linear"
                style={{ height: `${currentIdx * 25}%` }}
             ></div>

             {[
                { s: 'placed', label: 'Order Placed', icon: CheckCircle },
                { s: 'preparing', label: 'Preparing your food', icon: ChefHat },
                { s: 'out_for_delivery', label: 'Out for delivery', icon: Truck },
                { s: 'delivered', label: 'Delivered', icon: MapPin }
             ].map((step, idx) => {
                 const isActive = currentIdx >= (idx === 0 ? 0 : idx + 1); // rough mapping
                 const isCompleted = currentIdx > (idx === 0 ? 0 : idx + 1);
                 
                 return (
                    <div key={step.s} className="flex items-center gap-4 relative z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${isActive ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                             <step.icon size={14} />
                        </div>
                        <div>
                            <h4 className={`text-sm font-bold ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>{step.label}</h4>
                            {isActive && !isCompleted && <span className="text-xs text-rose-500 animate-pulse">Processing...</span>}
                        </div>
                    </div>
                 )
             })}
        </div>

        {/* Delivery Guy */}
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-800">Michael R.</h4>
                    <p className="text-xs text-gray-500">Delivery Partner</p>
                </div>
            </div>
            <div className="flex gap-3">
                 <button className="p-2 bg-white rounded-full border border-gray-200 text-rose-500"><Phone size={18} /></button>
                 <button className="p-2 bg-white rounded-full border border-gray-200 text-rose-500"><MessageCircle size={18} /></button>
            </div>
        </div>

        {status === 'delivered' && (
             <div className="mt-6">
                <Link to="/home" className="block w-full text-center bg-rose-500 text-white font-bold py-3 rounded-xl shadow-lg">Order Again</Link>
             </div>
        )}
      </div>
    </div>
  );
};
