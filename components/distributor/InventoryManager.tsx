import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    Download, 
    AlertTriangle, 
    CheckCircle2, 
    XCircle,
    MoreVertical
} from 'lucide-react';
import StockChart from '../StockChart';
import { CylinderStatus, CylinderType } from '../../types';
import { MOCK_INVENTORY } from '../data/mockDistributorData';

const InventoryManager: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('ALL');

    // Chart Data Preparation
    const chartData = [
        { 
            name: 'Domestic', 
            filled: MOCK_INVENTORY.filter(i => i.type === CylinderType.DOMESTIC_14KG && i.status === CylinderStatus.FILLED).length, 
            empty: MOCK_INVENTORY.filter(i => i.type === CylinderType.DOMESTIC_14KG && i.status === CylinderStatus.EMPTY).length, 
            defective: MOCK_INVENTORY.filter(i => i.type === CylinderType.DOMESTIC_14KG && i.status === CylinderStatus.DEFECTIVE).length 
        },
        { 
            name: 'Commercial', 
            filled: MOCK_INVENTORY.filter(i => i.type === CylinderType.COMMERCIAL_19KG && i.status === CylinderStatus.FILLED).length, 
            empty: MOCK_INVENTORY.filter(i => i.type === CylinderType.COMMERCIAL_19KG && i.status === CylinderStatus.EMPTY).length, 
            defective: MOCK_INVENTORY.filter(i => i.type === CylinderType.COMMERCIAL_19KG && i.status === CylinderStatus.DEFECTIVE).length 
        },
        { 
            name: 'Industrial', 
            filled: MOCK_INVENTORY.filter(i => i.type === CylinderType.INDUSTRIAL_47KG && i.status === CylinderStatus.FILLED).length, 
            empty: MOCK_INVENTORY.filter(i => i.type === CylinderType.INDUSTRIAL_47KG && i.status === CylinderStatus.EMPTY).length, 
            defective: MOCK_INVENTORY.filter(i => i.type === CylinderType.INDUSTRIAL_47KG && i.status === CylinderStatus.DEFECTIVE).length 
        },
    ];

    // Filter Logic
    const filteredInventory = MOCK_INVENTORY.filter(item => {
        const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'ALL' || item.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: CylinderStatus) => {
        switch (status) {
            case CylinderStatus.FILLED: return 'bg-green-100 text-green-700';
            case CylinderStatus.EMPTY: return 'bg-slate-100 text-slate-700';
            case CylinderStatus.DEFECTIVE: return 'bg-red-100 text-red-700';
            case CylinderStatus.WITH_CUSTOMER: return 'bg-blue-100 text-blue-700';
            case CylinderStatus.IN_TRANSIT: return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* TOP SECTION: CHART & SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Stock Distribution</h3>
                        <div className="flex gap-2">
                            <button className="text-xs px-3 py-1 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200">Daily</button>
                            <button className="text-xs px-3 py-1 bg-blue-100 rounded-full text-blue-600 font-medium">Weekly</button>
                        </div>
                    </div>
                    <StockChart data={chartData} />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
                    <div className="space-y-3 flex-1">
                        <button className="w-full p-3 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-3 group">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100">
                                <CheckCircle2 size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Log New Batch</p>
                                <p className="text-xs text-slate-500">Register incoming cylinders</p>
                            </div>
                        </button>
                        <button className="w-full p-3 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-3 group">
                            <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-100">
                                <AlertTriangle size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Report Defective</p>
                                <p className="text-xs text-slate-500">Flag cylinders for repair</p>
                            </div>
                        </button>
                        <button className="w-full p-3 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-3 group">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-100">
                                <Download size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Export Report</p>
                                <p className="text-xs text-slate-500">Download inventory CSV</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* INVENTORY TABLE */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
                    <h3 className="text-lg font-bold text-slate-800">Detailed Inventory</h3>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search ID or Location..." 
                                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <select 
                                className="pl-10 pr-8 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="ALL">All Status</option>
                                <option value={CylinderStatus.FILLED}>Filled</option>
                                <option value={CylinderStatus.EMPTY}>Empty</option>
                                <option value={CylinderStatus.DEFECTIVE}>Defective</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Cylinder ID</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Last Updated</th>
                                <th className="px-6 py-4">Expiry Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredInventory.slice(0, 10).map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{item.id}</td>
                                    <td className="px-6 py-4 text-slate-600">{item.type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{item.location}</td>
                                    <td className="px-6 py-4 text-slate-600">{item.lastUpdated}</td>
                                    <td className="px-6 py-4 text-slate-600">{item.expiryDate}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-sm text-slate-500">
                    <span>Showing {Math.min(10, filteredInventory.length)} of {filteredInventory.length} items</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-slate-200 rounded bg-white disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryManager;