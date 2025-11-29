import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { Phone, ArrowRight, Mail } from 'lucide-react';

export const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (phone.length < 10) return alert('Please enter a valid phone number');
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') { // Mock OTP
      login('Demo User', phone);
      navigate('/home');
    } else {
      alert('Invalid OTP. Try 1234');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      <div className="h-2/5 bg-gray-900 relative">
        <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" 
            className="w-full h-full object-cover opacity-50" 
            alt="Food"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
             <h1 className="text-4xl font-bold text-white mb-2">Crave</h1>
             <p className="text-gray-200 text-lg">Delicious food delivered to your doorstep.</p>
        </div>
      </div>

      <div className="flex-1 px-6 py-8 -mt-6 rounded-t-3xl bg-white z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            {step === 'phone' ? 'Get Started' : 'Verify OTP'}
            <div className="h-1 flex-1 bg-gray-100 ml-4 rounded-full overflow-hidden">
                <div className={`h-full bg-rose-500 transition-all duration-300 ${step === 'phone' ? 'w-1/2' : 'w-full'}`}></div>
            </div>
        </h2>
        
        {step === 'phone' ? (
          <div className="space-y-6">
            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Phone Number</label>
                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-500 transition-all">
                  <Phone size={20} className="text-gray-400 mr-3" />
                  <span className="text-gray-600 font-medium mr-2">+1</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile Number"
                    className="flex-1 outline-none text-gray-800 font-medium placeholder:font-normal"
                  />
                </div>
            </div>
            
            <button 
                onClick={handleSendOtp}
                className="w-full bg-rose-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-200 hover:bg-rose-600 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
            >
                Continue <ArrowRight size={20} />
            </button>

            <div className="flex items-center gap-4 py-4">
                <div className="h-[1px] bg-gray-200 flex-1"></div>
                <span className="text-xs text-gray-400">OR</span>
                <div className="h-[1px] bg-gray-200 flex-1"></div>
            </div>

            <div className="flex justify-center gap-4">
                 <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50"><img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" className="w-6 h-6" alt="Google"/></button>
                 <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50"><Mail size={24} className="text-gray-600" /></button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
             <p className="text-sm text-gray-500">We sent a verification code to <span className="font-bold text-gray-800">+1 {phone}</span></p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 4-digit OTP (1234)"
              maxLength={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] font-bold text-gray-800 focus:border-rose-500 focus:outline-none"
            />
             <button 
                onClick={handleVerifyOtp}
                className="w-full bg-rose-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-200 hover:bg-rose-600 active:scale-[0.98] transition-all"
            >
                Verify & Login
            </button>
            <button onClick={() => setStep('phone')} className="w-full text-rose-500 font-semibold text-sm">
                Change Phone Number
            </button>
          </div>
        )}
        
        <p className="text-center text-[10px] text-gray-400 mt-auto pt-8">
            By continuing, you agree to our Terms of Service & Privacy Policy
        </p>
      </div>
    </div>
  );
};
