import React, { useState } from 'react';
import { Truck, MapPin, Navigation, Clock } from 'lucide-react';
import { MOCK_VEHICLES } from '../data/mockDistributorData';

const FleetTracker: React.FC = () => {
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

    // Deterministic position based on vehicle ID for the mock map
    const getPosition = (id: string) => {
        const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return {
            top: `${(hash * 17) % 80 + 10}%`,
            left: `${(hash * 23) % 80 + 10}%`
        };
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'DELIVERING': return 'text-green-500 bg-green-50 border-green-200';
            case 'RETURNING': return 'text-blue-500 bg-blue-50 border-blue-200';
            case 'IDLE': return 'text-slate-500 bg-slate-50 border-slate-200';
            default: return 'text-slate-500 bg-slate-50 border-slate-200';
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
            {/* Left Panel - Vehicle List */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Truck className="text-blue-600" size={20} />
                        Active Fleet
                        <span className="ml-auto text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {MOCK_VEHICLES.length} Vehicles
                        </span>
                    </h2>
                </div>
                
                <div className="overflow-y-auto flex-1 p-2 space-y-2">
                    {MOCK_VEHICLES.map((vehicle) => (
                        <div 
                            key={vehicle.id}
                            onClick={() => setSelectedVehicle(vehicle.id)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                                selectedVehicle === vehicle.id 
                                ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-200' 
                                : 'border-slate-200 hover:border-blue-300 bg-white'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-medium text-slate-900">{vehicle.plateNumber}</h3>
                                    <p className="text-xs text-slate-500">{vehicle.driverName}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getStatusColor(vehicle.status)}`}>
                                    {vehicle.status}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mt-2">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={12} className="text-slate-400" />
                                    <span className="truncate">{vehicle.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={12} className="text-slate-400" />
                                    <span>ETA: {vehicle.eta}</span>
                                </div>
                            </div>

                            <div className="mt-3">
                                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                    <span>Load Capacity</span>
                                    <span className={vehicle.load < 20 ? 'text-red-500 font-bold' : ''}>{vehicle.load}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${
                                            vehicle.load < 20 ? 'bg-red-500' : 'bg-blue-500'
                                        }`} 
                                        style={{ width: `${vehicle.load}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel - Map Visualization */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <Navigation size={16} className="text-blue-600" />
                        Live Tracking
                    </h3>
                </div>

                {/* Map Container */}
                <div className="flex-1 bg-slate-100 relative overflow-hidden group">
                    {/* Grid Pattern for Map Effect */}
                    <div className="absolute inset-0 opacity-10" 
                        style={{ 
                            backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', 
                            backgroundSize: '20px 20px' 
                        }}
                    ></div>
                    
                    {/* Map Roads/Features (Abstract) */}
                    <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-200 -translate-y-1/2"></div>
                    <div className="absolute top-0 left-1/3 w-2 h-full bg-slate-200"></div>
                    <div className="absolute top-0 left-2/3 w-2 h-full bg-slate-200"></div>
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-4 border-slate-200 rounded-3xl"></div>

                    {/* Vehicle Markers */}
                    {MOCK_VEHICLES.map((vehicle) => {
                        const pos = getPosition(vehicle.id);
                        const isSelected = selectedVehicle === vehicle.id;
                        
                        return (
                            <div
                                key={vehicle.id}
                                className={`absolute transition-all duration-500 cursor-pointer transform hover:scale-110 ${
                                    isSelected ? 'z-20 scale-110' : 'z-10'
                                }`}
                                style={{ top: pos.top, left: pos.left }}
                                onClick={() => setSelectedVehicle(vehicle.id)}
                            >
                                <div className="relative flex flex-col items-center">
                                    {/* Tooltip */}
                                    <div className={`absolute bottom-full mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded whitespace-nowrap transition-opacity ${
                                        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                    }`}>
                                        {vehicle.plateNumber}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                                    </div>

                                    {/* Marker Icon */}
                                    <div className={`p-2 rounded-full shadow-lg ${
                                        isSelected 
                                        ? 'bg-blue-600 text-white ring-4 ring-blue-600/20' 
                                        : vehicle.status === 'IDLE' 
                                            ? 'bg-slate-200 text-slate-500' 
                                            : 'bg-white text-blue-600'
                                    }`}>
                                        <Truck size={20} fill={isSelected ? "currentColor" : "none"} />
                                    </div>
                                    
                                    {/* Pulse Effect for Moving Vehicles */}
                                    {vehicle.status === 'DELIVERING' && (
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20 animate-ping"></span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Selected Vehicle Details Footer */}
                {selectedVehicle && (
                    <div className="bg-white border-t border-slate-200 p-4 flex justify-between items-center animate-in slide-in-from-bottom-4">
                        {(() => {
                            const v = MOCK_VEHICLES.find(v => v.id === selectedVehicle);
                            if (!v) return null;
                            return (
                                <>
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                            <Truck size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{v.plateNumber}</h4>
                                            <p className="text-sm text-slate-500">{v.driverName} • {v.status}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 text-sm">
                                        <div>
                                            <p className="text-slate-400 text-xs">Current Location</p>
                                            <p className="font-medium text-slate-700">{v.location}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs">Estimated Arrival</p>
                                            <p className="font-medium text-slate-700">{v.eta}</p>
                                        </div>
                                        <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md text-xs font-medium transition-colors">
                                            Contact Driver
                                        </button>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FleetTracker;