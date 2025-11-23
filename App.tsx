import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DistributorDashboard from './components/DistributorDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import { UserRole } from './types';
import { Store, User, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.LANDING);

  const renderContent = () => {
    switch (userRole) {
      case UserRole.DISTRIBUTOR:
        return <DistributorDashboard />;
      case UserRole.CUSTOMER:
        return <CustomerDashboard />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
             <div className="text-center max-w-4xl mx-auto mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase mb-6">
                    Hackathon Challenge 6.4
                </span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  Invisible Inventories, <br/>
                  <span className="text-blue-600">Visible Impact.</span>
                </h1>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                  HP SmartTrack reinvents LPG inventory management with AI-driven demand prediction, real-time fleet tracking, and customer safety compliance.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500 mb-12">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
                        <TrendingUp size={16} className="text-green-500" /> AI Demand Prediction
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
                        <ShieldCheck size={16} className="text-blue-500" /> Safety Compliance
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
                        <User size={16} className="text-orange-500" /> Smart Customer Credits
                    </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                {/* Distributor Card */}
                <button 
                  onClick={() => setUserRole(UserRole.DISTRIBUTOR)}
                  className="group bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300 text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200">
                      <Store size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Distributor Portal</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                      Command center for inventory, fleet tracking, and geo-analytics. Includes AI-forecasting and idle asset recovery.
                    </p>
                    <div className="flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                      Access Dashboard <ArrowRight size={20} className="ml-2" />
                    </div>
                  </div>
                </button>

                {/* Customer Card */}
                <button 
                  onClick={() => setUserRole(UserRole.CUSTOMER)}
                  className="group bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:border-orange-200 hover:shadow-2xl transition-all duration-300 text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-50 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                   <div className="relative z-10">
                    <div className="w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-orange-200">
                      <User size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">Customer App</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                      Mobile-first experience for booking refills, checking safety expiry, and earning smart credits.
                    </p>
                    <div className="flex items-center text-orange-600 font-bold group-hover:translate-x-2 transition-transform">
                      Launch App <ArrowRight size={20} className="ml-2" />
                    </div>
                  </div>
                </button>
             </div>
             
             <div className="mt-20 text-xs text-slate-400 font-medium tracking-wide">
                HP SMART TRACK • HACKATHON PROTOTYPE 2024
             </div>
          </div>
        );
    }
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      {userRole !== UserRole.LANDING && <Navbar role={userRole} onLogout={() => setUserRole(UserRole.LANDING)} />}
      {renderContent()}
    </div>
  );
};

export default App;