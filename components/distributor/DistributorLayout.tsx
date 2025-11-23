import React from 'react';
import {
    LayoutDashboard,
    Package,
    Truck,
    Map,
    ClipboardList,
    ArrowUpRight,
    Bell,
    LogOut
} from 'lucide-react';
import FleetTracker from './FleetTracker';
import GeoAnalytics from './GeoAnalytics';
import SafetyCompliance from './SafetyCompliance';

interface DistributorLayoutProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    children: React.ReactNode;
}

const DistributorLayout: React.FC<DistributorLayoutProps> = ({ activeTab, setActiveTab, children }) => {
    const navItems = [
        { id: 'overview', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'inventory', icon: Package, label: 'Inventory' },
        { id: 'deliveries', icon: Truck, label: 'Fleet Tracking' },
        { id: 'analytics', icon: Map, label: 'Geo-Analytics' },
        { id: 'compliance', icon: ClipboardList, label: 'Safety & Reports' },
    ];

    return (
        <div className="flex h-[calc(100vh-64px)] bg-slate-50">
            {/* SIDEBAR */}
            <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                        <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                        HP SmartTrack
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 ml-4">Distributor Portal</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                activeTab === item.id 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <div className="bg-slate-800 rounded-xl p-4 mb-4">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Turnaround Ratio</h4>
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-2xl font-bold text-green-400">4.2 Days</span>
                            <span className="text-xs text-green-400 mb-1 flex items-center"><ArrowUpRight size={12}/> +5%</span>
                        </div>
                        <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full w-[85%] rounded-full"></div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1">Target: 4.0 Days</p>
                    </div>
                    
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm">
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                {navItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
                            </h1>
                            <p className="text-slate-500 text-sm">Welcome back, H.P. Gas Agencies (Code: 12458)</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 relative">
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-200 flex items-center gap-2">
                                <Package size={16} /> New Order
                            </button>
                        </div>
                    </div>

                    {activeTab === 'deliveries' ? (
                        <FleetTracker />
                    ) : activeTab === 'analytics' ? (
                        <GeoAnalytics />
                    ) : activeTab === 'compliance' ? (
                        <SafetyCompliance />
                    ) : (
                        children
                    )}
                </div>
            </main>
        </div>
    );
};

export default DistributorLayout;