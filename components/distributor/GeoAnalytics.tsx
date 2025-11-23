import React from 'react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
    Cell
} from 'recharts';
import { Map, Activity, Users, TrendingUp } from 'lucide-react';
import { MOCK_GEO_METRICS } from '../data/mockDistributorData';

const GeoAnalytics: React.FC = () => {
    // Prepare data for charts
    const chartData = MOCK_GEO_METRICS.map(m => ({
        name: m.regionName,
        customers: m.activeCustomers,
        efficiency: m.deliveryEfficiency,
        density: m.demandDensity * 100
    }));

    // Generate heatmap data (mock grid)
    const heatmapData = Array(16).fill(0).map((_, i) => ({
        id: i,
        intensity: Math.random(), // 0-1
        label: `Zone ${String.fromCharCode(65 + i)}`
    }));

    const getHeatmapColor = (intensity: number) => {
        // Blue scale
        if (intensity > 0.8) return 'bg-blue-600';
        if (intensity > 0.6) return 'bg-blue-500';
        if (intensity > 0.4) return 'bg-blue-400';
        if (intensity > 0.2) return 'bg-blue-300';
        return 'bg-blue-200';
    };

    return (
        <div className="space-y-6">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Map size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Total Regions</p>
                        <h3 className="text-2xl font-bold text-slate-900">{MOCK_GEO_METRICS.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Total Coverage</p>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {MOCK_GEO_METRICS.reduce((acc, curr) => acc + curr.activeCustomers, 0)}
                        </h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                        <Activity size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Avg Efficiency</p>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {Math.round(MOCK_GEO_METRICS.reduce((acc, curr) => acc + curr.deliveryEfficiency, 0) / MOCK_GEO_METRICS.length)}%
                        </h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Regional Performance Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                            <TrendingUp size={18} className="text-blue-600" />
                            Regional Performance
                        </h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f1f5f9' }}
                                />
                                <Legend />
                                <Bar dataKey="customers" name="Active Customers" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="efficiency" name="Efficiency Score" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Demand Heatmap */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                            <Activity size={18} className="text-red-500" />
                            Demand Intensity Heatmap
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="w-3 h-3 bg-blue-200 rounded-sm"></span> Low
                            <span className="w-3 h-3 bg-blue-600 rounded-sm"></span> High
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 h-[300px]">
                        {heatmapData.map((zone) => (
                            <div 
                                key={zone.id}
                                className={`${getHeatmapColor(zone.intensity)} rounded-lg flex items-center justify-center text-white font-medium text-sm transition-all hover:opacity-90 cursor-pointer relative group`}
                            >
                                <span className="opacity-50 group-hover:opacity-100 transition-opacity">{zone.label}</span>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 rounded-lg transition-opacity">
                                    {Math.round(zone.intensity * 100)}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Metrics Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <h3 className="font-semibold text-slate-800">Detailed Regional Metrics</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-3 font-medium">Region Name</th>
                                <th className="px-6 py-3 font-medium">Coordinates</th>
                                <th className="px-6 py-3 font-medium">Active Customers</th>
                                <th className="px-6 py-3 font-medium">Demand Density</th>
                                <th className="px-6 py-3 font-medium">Delivery Efficiency</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_GEO_METRICS.map((metric) => (
                                <tr key={metric.regionId} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{metric.regionName}</td>
                                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                        {metric.coordinates[0].toFixed(4)}, {metric.coordinates[1].toFixed(4)}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{metric.activeCustomers}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-500 rounded-full"
                                                    style={{ width: `${metric.demandDensity * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-slate-500">{metric.demandDensity}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`font-medium ${
                                            metric.deliveryEfficiency > 90 ? 'text-green-600' : 
                                            metric.deliveryEfficiency > 75 ? 'text-amber-600' : 'text-red-600'
                                        }`}>
                                            {metric.deliveryEfficiency}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GeoAnalytics;