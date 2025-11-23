import React, { useState } from 'react';
import { 
    ShieldCheck, AlertTriangle, Calendar, RefreshCw, 
    MapPin, CheckCircle2, Info, MessageSquare, Bell,
    Wallet, CreditCard, Clock, ArrowRight, Flame,
    ChevronRight, Star, Sparkles, Phone, History,
    TrendingUp, Box, Truck
} from 'lucide-react';
import { CustomerAsset, Transaction } from '../types';
import { getSafetyAdvice } from '../services/geminiService';

// --- MOCK DATA ---
const CUSTOMER_DATA: CustomerAsset = {
    customerId: 'C001',
    name: 'Amit Sharma',
    activeCylinders: 2,
    lastRefillDate: '2023-08-15',
    regulatorExpiryDate: '2025-01-01',
    safetyCheckDue: false,
    address: 'Sector 4, Rohini, Delhi',
    credits: 65,
    phone: '+91 98765 43210'
};

const HISTORY: Transaction[] = [
    { id: 'TX-101', date: '15 Aug 2023', type: 'REFILL', amount: 1103, status: 'COMPLETED' },
    { id: 'TX-100', date: '10 Jun 2023', type: 'REFILL', amount: 1050, status: 'COMPLETED' },
    { id: 'TX-099', date: '01 Feb 2023', type: 'SERVICE', amount: 250, status: 'COMPLETED' },
];

const CustomerDashboard: React.FC = () => {
    const [chatInput, setChatInput] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [returnRequestStatus, setReturnRequestStatus] = useState<'idle' | 'requested'>('idle');

    const handleSafetyCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        
        setIsTyping(true);
        const response = await getSafetyAdvice(chatInput);
        setChatResponse(response);
        setIsTyping(false);
    };

    const handleReturnRequest = () => {
        setReturnRequestStatus('requested');
        setTimeout(() => setReturnRequestStatus('idle'), 3000); // Reset after 3s for demo
    };

    const calculateDaysSinceRefill = (dateStr: string) => {
        const diff = new Date().getTime() - new Date(dateStr).getTime();
        return Math.floor(diff / (1000 * 3600 * 24));
    };
    
    const daysSince = calculateDaysSinceRefill(CUSTOMER_DATA.lastRefillDate);
    const usageCycle = 60; // avg days per cylinder
    const daysLeft = usageCycle - daysSince;
    const percentageUsed = Math.min(100, (daysSince / usageCycle) * 100);

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            {/* HEADER EXTENSION (Blends with Global Navbar) */}
            <div className="bg-blue-700 pb-20 pt-6 px-4 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
                {/* Abstract Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500 opacity-30 rounded-full -ml-10 -mb-10 blur-2xl"></div>

                <div className="max-w-5xl mx-auto relative z-10 flex justify-between items-start">
                    <div className="flex items-center gap-4">
                         <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-1 shadow-inner">
                            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-white rounded-xl flex items-center justify-center text-blue-700 text-2xl font-bold shadow-sm">
                                {CUSTOMER_DATA.name.charAt(0)}
                            </div>
                         </div>
                         <div className="text-white">
                             <p className="text-blue-100 text-xs font-medium tracking-wider uppercase mb-1">Welcome Back</p>
                             <h1 className="text-2xl font-bold leading-none shadow-black drop-shadow-md">{CUSTOMER_DATA.name}</h1>
                             <div className="flex items-center gap-1 mt-2 text-xs text-blue-200 bg-blue-800/30 px-2 py-1 rounded-full w-fit">
                                 <MapPin size={10} /> {CUSTOMER_DATA.address.split(',')[0]}
                             </div>
                         </div>
                    </div>
                    
                    {/* Notifications Badge */}
                    <button className="relative p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm">
                        <Bell size={20} className="text-white" />
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-blue-700 rounded-full animate-pulse"></span>
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT CONTAINER */}
            <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-20 space-y-6">
                
                {/* HERO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    
                    {/* 1. REFILL STATUS CARD (Main Action) */}
                    <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-lg shadow-blue-900/5 border border-slate-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <Flame className="text-orange-500" size={20} fill="currentColor" />
                                    Cylinder Status
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">Estimated depletion based on usage</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-slate-900">{Math.max(0, daysLeft)}</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Days Left</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6 mb-2">
                            <div className="flex justify-between text-xs font-medium mb-2 text-slate-600">
                                <span>Refilled {daysSince} days ago</span>
                                <span className={daysLeft < 5 ? "text-red-500 animate-pulse" : "text-green-600"}>
                                    {daysLeft < 5 ? 'Refill Critical' : 'Good Level'}
                                </span>
                            </div>
                            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${daysLeft < 7 ? 'bg-red-500' : 'bg-gradient-to-r from-orange-400 to-orange-600'}`} 
                                    style={{width: `${percentageUsed}%`}}
                                ></div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-6 flex gap-3">
                            <button className="flex-1 bg-slate-900 hover:bg-black text-white py-3 rounded-xl font-semibold shadow-lg shadow-slate-200 flex items-center justify-center gap-2 transition-all active:scale-95">
                                Book Refill <ArrowRight size={16} />
                            </button>
                            {daysLeft < 10 && (
                                <div className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center border border-red-100">
                                    <AlertTriangle size={14} className="mr-1" /> Due Soon
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 2. GAMIFIED WALLET (Rewards) */}
                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                        <div className="absolute top-10 -right-10 w-20 h-20 bg-yellow-400 opacity-20 rounded-full blur-xl"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                                    <Wallet size={18} className="text-yellow-300" />
                                </div>
                                <span className="text-sm font-bold tracking-wide text-indigo-100">HP Star Rewards</span>
                            </div>

                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-4xl font-extrabold text-white">{CUSTOMER_DATA.credits}</span>
                                <span className="text-sm text-indigo-200 font-medium">Coins</span>
                            </div>

                            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles size={14} className="text-yellow-400" />
                                    <p className="text-xs font-medium text-indigo-100">Bonus Challenge</p>
                                </div>
                                <p className="text-xs text-white/90 leading-relaxed">
                                    Refill within <span className="text-yellow-300 font-bold">3 days</span> to earn <span className="text-yellow-300 font-bold">+10 Coins</span>.
                                </p>
                                <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                                    <div className="bg-yellow-400 h-full w-[70%] rounded-full shadow-[0_0_10px_rgba(250,204,21,0.6)]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECONDARY ACTIONS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    
                    {/* Action: Active Inventory */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors group">
                        <div className="flex justify-between items-start mb-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                <Box size={20} />
                            </div>
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold text-slate-900">{CUSTOMER_DATA.activeCylinders}</span>
                            <div className="flex mb-1.5 gap-0.5">
                                {[...Array(CUSTOMER_DATA.activeCylinders)].map((_, i) => (
                                    <Flame key={i} size={12} className="text-orange-500 fill-orange-500" />
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Cylinders at home</p>
                    </div>

                    {/* Action: Safety Certificate */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-green-200 transition-colors group">
                        <div className="flex justify-between items-start mb-3">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-100 transition-colors">
                                <ShieldCheck size={20} />
                            </div>
                            <Info size={16} className="text-slate-300" />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Regulator</p>
                        <p className="text-sm font-bold text-slate-900 mt-0.5">Valid till 2025</p>
                        <div className="flex items-center gap-1 mt-2 text-[10px] text-green-600 font-medium bg-green-50 w-fit px-2 py-0.5 rounded">
                            <CheckCircle2 size={10} /> Safety Checked
                        </div>
                    </div>

                    {/* Action: Return Idle */}
                    <button 
                        onClick={handleReturnRequest}
                        className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-orange-200 hover:shadow-md transition-all text-left group relative overflow-hidden"
                    >
                        {returnRequestStatus === 'requested' && (
                            <div className="absolute inset-0 bg-green-500 text-white flex flex-col items-center justify-center z-10">
                                <CheckCircle2 size={24} className="mb-1" />
                                <span className="text-xs font-bold">Request Sent!</span>
                            </div>
                        )}
                        <div className="flex justify-between items-start mb-3">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-100 transition-colors">
                                <RefreshCw size={20} />
                            </div>
                        </div>
                        <p className="text-sm font-bold text-slate-900">Return Idle Cylinder</p>
                        <p className="text-xs text-slate-500 mt-1 group-hover:text-orange-600 transition-colors">Request pickup & refund</p>
                    </button>

                     {/* Action: Support */}
                     <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-purple-200 transition-colors group">
                        <div className="flex justify-between items-start mb-3">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100 transition-colors">
                                <Phone size={20} />
                            </div>
                        </div>
                        <p className="text-sm font-bold text-slate-900">Emergency Support</p>
                        <p className="text-xs text-slate-500 mt-1">24/7 Helpline</p>
                    </div>
                </div>

                {/* HISTORY & NOTIFICATIONS SPLIT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Notification Center */}
                    <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
                         <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Bell size={18} className="text-blue-600" /> 
                                Alerts & Offers
                            </h3>
                            <span className="text-xs font-bold bg-blue-200 text-blue-800 px-2 py-1 rounded-full">3 New</span>
                         </div>
                         
                         <div className="space-y-3">
                             <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100 flex gap-3">
                                 <div className="bg-yellow-100 p-2 rounded-lg h-fit text-yellow-700">
                                     <Star size={16} />
                                 </div>
                                 <div>
                                     <p className="text-sm font-bold text-slate-800">Double Points Weekend!</p>
                                     <p className="text-xs text-slate-500 mt-0.5">Book a refill this Saturday to earn 2x credits.</p>
                                 </div>
                             </div>

                             <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100 flex gap-3">
                                 <div className="bg-red-100 p-2 rounded-lg h-fit text-red-700">
                                     <AlertTriangle size={16} />
                                 </div>
                                 <div>
                                     <p className="text-sm font-bold text-slate-800">Safety Inspection Due</p>
                                     <p className="text-xs text-slate-500 mt-0.5">Your generic regulator expires in 45 days.</p>
                                     <button className="text-xs text-red-600 font-bold mt-1 hover:underline">Schedule Check</button>
                                 </div>
                             </div>
                         </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <History size={18} className="text-slate-400" />
                                Recent Activity
                            </h3>
                            <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {HISTORY.map(tx => (
                                <div key={tx.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'REFILL' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {tx.type === 'REFILL' ? <Flame size={16} /> : <Truck size={16} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{tx.type === 'REFILL' ? 'Cylinder Refill' : 'Maintenance'}</p>
                                            <p className="text-xs text-slate-400">{tx.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-900">- ₹{tx.amount}</p>
                                        <div className="flex items-center justify-end gap-1 text-[10px] text-green-600 font-bold uppercase">
                                            <CheckCircle2 size={10} /> {tx.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* AI SAFETY WIDGET (Full Width) */}
                <div className="bg-white rounded-3xl p-1 shadow-lg shadow-blue-200/50 border border-blue-100 mt-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[1.3rem] p-6">
                         <div className="flex flex-col md:flex-row gap-6">
                             <div className="md:w-1/3">
                                 <div className="flex items-center gap-2 mb-2">
                                     <div className="p-2 bg-blue-600 text-white rounded-lg shadow-md shadow-blue-300">
                                         <MessageSquare size={20} />
                                     </div>
                                     <h3 className="text-lg font-bold text-slate-800">Safety Assistant</h3>
                                 </div>
                                 <p className="text-sm text-slate-600 leading-relaxed">
                                     Not sure if your cylinder is leaking? Need help with installation? Ask our AI expert instantly.
                                 </p>
                             </div>

                             <div className="flex-1">
                                 {chatResponse && (
                                     <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-blue-100 mb-4 text-sm text-slate-700 animate-in fade-in slide-in-from-bottom-2">
                                         <p className="font-bold text-blue-600 text-xs mb-1">HP Safety AI says:</p>
                                         {chatResponse}
                                     </div>
                                 )}
                                 
                                 <form onSubmit={handleSafetyCheck} className="relative">
                                     <input 
                                         type="text" 
                                         value={chatInput}
                                         onChange={(e) => setChatInput(e.target.value)}
                                         placeholder="Type 'How to check for leaks?' or 'Regulator expiry'..."
                                         className="w-full pl-4 pr-12 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm text-sm"
                                     />
                                     <button 
                                         type="submit" 
                                         disabled={isTyping}
                                         className="absolute right-1 top-1 bottom-1 aspect-square bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors"
                                     >
                                         {isTyping ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <ArrowRight size={18} />}
                                     </button>
                                 </form>
                             </div>
                         </div>
                    </div>
                </div>

                <div className="text-center pt-8 pb-4">
                    <p className="text-xs text-slate-400 font-medium">HP SmartTrack Customer App • v2.4.0</p>
                </div>

            </div>
        </div>
    );
};

export default CustomerDashboard;