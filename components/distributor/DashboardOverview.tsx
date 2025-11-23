import React, { useState, useEffect } from 'react';
import { 
    Package, 
    Truck, 
    AlertTriangle, 
    RefreshCcw, 
    ArrowUpRight, 
    Map, 
    BrainCircuit,
    UserX,
    ClipboardList,
    History
} from 'lucide-react';
import StockChart from '../StockChart';
import { CylinderStatus, CylinderType } from '../../types';
import { predictInventoryDemand } from '../../services/geminiService';
import { 
    MOCK_INVENTORY, 
    MOCK_VEHICLES, 
    MOCK_REGIONS, 
    MOCK_SALES_HISTORY 
} from '../data/mockDistributorData';

const DashboardOverview: React.FC = () => {
    const [aiPrediction, setAiPrediction] = useState<string | null>(null);
    const [aiLoading, setAiLoading] = useState(false);

    // Stats calculation
    const filled = MOCK_INVENTORY.filter(i => i.status === CylinderStatus.FILLED).length;
    const empty = MOCK_INVENTORY.filter(i => i.status === CylinderStatus.EMPTY).length;
    const defective = MOCK_INVENTORY.filter(i => i.status === CylinderStatus.DEFECTIVE).length;
    const total = filled + empty + defective;

    const chartData = [
        { name: 'Domestic', filled: 320, empty: 145, defective: 12 },
        { name: 'Commercial', filled: 50, empty: 15, defective: 2 },
        { name: 'Industrial', filled: 20, empty: 5, defective: 1 },
    ];

    useEffect(() => {
        handleGenerateForecast();
    }, []);

    const handleGenerateForecast = async () => {
        setAiLoading(true);
        const result = await predictInventoryDemand(MOCK_INVENTORY, MOCK_SALES_HISTORY);
        setAiPrediction(result);
        setAiLoading(false);
    };

    return (
        <div className="space-y-6">
            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Circulation</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{total}</h3>
                        </div>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Package size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-slate-500">
                        <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-medium mr-2 flex items-center">
                            <ArrowUpRight size={12} className="mr-1"/> 2.4%
                        </span>
                        vs last month
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Returned Today</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{empty}</h3>
                        </div>
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <RefreshCcw size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-slate-500">
                        <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-medium mr-2 flex items-center">
                            <ArrowUpRight size={12} className="mr-1"/> 12%
                        </span>
                        Efficiency rate
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Pending Deliveries</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">48</h3>
                        </div>
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <Truck size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-slate-500">
                        <span className="text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded font-medium mr-2 flex items-center">
                            3 Delayed
                        </span>
                        Due to traffic
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-1 bg-red-500"></div>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Safety Checks Due</p>
                            <h3 className="text-2xl font-bold text-red-600 mt-1">15</h3>
                        </div>
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                            <AlertTriangle size={20} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-slate-500">
                        <span className="text-red-600 font-medium mr-2 cursor-pointer hover:underline">
                            View List
                        </span>
                        Immediate Action Required
                    </div>
                </div>
            </div>

            {/* ROW 2: ANALYTICS & MAP */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Geo-Insight Heatmap Simulation */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Map className="text-blue-500" size={20} />
                            Regional Inventory Intelligence
                        </h3>
                        <div className="flex gap-2">
                            <span className="flex items-center text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div> Healthy</span>
                            <span className="flex items-center text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div> Hoarding Risk</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {MOCK_REGIONS.slice(0, 4).map((region) => (
                            <div key={region.id} className="border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-slate-50">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-semibold text-slate-700">{region.name}</span>
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${region.healthScore > 80 ? 'bg-green-100 text-green-700' : region.healthScore > 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                        Score: {region.healthScore}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-500 mb-2">
                                    <span>Distributed:</span>
                                    <span className="font-medium text-slate-900">{region.totalDistributed}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-500 mb-3">
                                    <span>Idle Assets:</span>
                                    <span className={`font-medium ${region.idleCount > 100 ? 'text-red-600' : 'text-slate-900'}`}>{region.idleCount}</span>
                                </div>
                                <div className="w-full bg-slate-200 h-1.5 rounded-full">
                                    <div 
                                        className={`h-full rounded-full ${region.healthScore > 80 ? 'bg-green-500' : region.healthScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                        style={{ width: `${region.healthScore}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fleet Tracking */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Live Fleet</h3>
                        <button className="text-blue-600 text-xs font-medium hover:underline">View Map</button>
                    </div>
                    <div className="space-y-4">
                        {MOCK_VEHICLES.slice(0, 3).map((vehicle) => (
                            <div key={vehicle.id} className="flex items-start gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                <div className={`p-2 rounded-full ${vehicle.status === 'DELIVERING' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                    <Truck size={16} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="text-sm font-semibold text-slate-800">{vehicle.plateNumber}</p>
                                        <span className="text-xs text-slate-400">{vehicle.eta}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5">{vehicle.driverName} • {vehicle.location}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-full bg-slate-100 h-1 rounded-full">
                                            <div className="bg-slate-400 h-full rounded-full" style={{ width: `${vehicle.load}%` }}></div>
                                        </div>
                                        <span className="text-[10px] text-slate-400">{vehicle.load}% Load</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ROW 3: INVENTORY & AI */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Inventory Overview</h3>
                        <select className="bg-slate-50 border border-slate-200 rounded-lg text-sm px-2 py-1">
                            <option>This Week</option>
                            <option>This Month</option>
                        </select>
                    </div>
                    <StockChart data={chartData} />
                </div>

                <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                            <BrainCircuit className="text-blue-400" />
                            <h3 className="text-lg font-bold">AI Demand Forecast</h3>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto custom-scrollbar text-sm text-blue-100 leading-relaxed space-y-3">
                            {aiLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                </div>
                            ) : (
                                aiPrediction ? (
                                    <div className="prose prose-invert prose-sm">
                                        {aiPrediction}
                                    </div>
                                ) : (
                                    <p>AI prediction unavailable.</p>
                                )
                            )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/10">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-blue-300">Confidence Level</p>
                                    <p className="font-bold text-green-400">High (92%)</p>
                                </div>
                                <button onClick={handleGenerateForecast} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded border border-white/20 transition-colors">
                                    Recalculate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ROW 4: IDLE ASSETS & SAFETY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <UserX className="text-red-500" size={20} />
                            Idle Asset Alert ({'>'}60 Days)
                        </h3>
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">5 Critical</span>
                    </div>
                    <div className="space-y-3">
                        {[
                            { name: 'Rahul Verma', days: 72, area: 'Old City', id: 'C003' },
                            { name: 'Sita Enterprises', days: 65, area: 'Ind. Sector', id: 'C104' },
                            { name: 'Amit General Store', days: 62, area: 'Market', id: 'C099' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                                    <p className="text-xs text-slate-500">{item.area} • ID: {item.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-red-600">{item.days} Days</p>
                                    <button className="text-[10px] text-blue-600 hover:underline mt-1">Send Reminder</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <ClipboardList className="text-orange-500" size={20} />
                            Compliance Widget
                        </h3>
                        <button className="text-slate-400 hover:text-slate-600"><History size={18} /></button>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-600">Regulators Tested</span>
                                <span className="font-semibold text-slate-900">85%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full">
                                <div className="bg-green-500 h-full rounded-full" style={{width: '85%'}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-600">Cylinders Due for Hydro-Test</span>
                                <span className="font-semibold text-red-600">120 Pending</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full">
                                <div className="bg-red-500 h-full rounded-full" style={{width: '30%'}}></div>
                            </div>
                        </div>
                        <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg text-xs text-yellow-800 flex items-start gap-2">
                            <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                            <p>Upcoming Audit: Safety inspection scheduled for 15th Nov by HPCL Regional Office.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;