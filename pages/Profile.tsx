import React from 'react';
import { useApp } from '../store';
import { Header, BottomNav } from '../components/Layout';
import { User, MapPin, Heart, Settings, CreditCard, ChevronRight } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="My Profile" />
      
      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 flex items-center gap-4">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                <User size={32} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.phone}</p>
                <div className="mt-2 flex gap-2">
                   <span className="text-[10px] bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full">GOLD MEMBER</span>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
             {[
                 { icon: Heart, label: 'Favorites', sub: 'Your loved restaurants' },
                 { icon: CreditCard, label: 'Payments', sub: 'Manage cards & wallets' },
                 { icon: MapPin, label: 'Address Book', sub: 'Add or remove addresses' },
                 { icon: Settings, label: 'Settings', sub: 'Notifications & Permissions' },
             ].map((item, idx) => (
                 <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer">
                     <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                             <item.icon size={20} />
                         </div>
                         <div>
                             <h4 className="font-semibold text-gray-800 text-sm">{item.label}</h4>
                             <p className="text-xs text-gray-400">{item.sub}</p>
                         </div>
                     </div>
                     <ChevronRight size={18} className="text-gray-300" />
                 </div>
             ))}
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-400">Crave App v1.0.0</p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};