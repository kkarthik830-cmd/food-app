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
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                <User size={32} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.phone}</p>
                <p className="text-xs text-rose-500 font-bold mt-1">Edit Profile</p>
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
      </div>
      <BottomNav />
    </div>
  );
};