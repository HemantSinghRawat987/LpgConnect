import React, { useState } from 'react';
import DistributorLayout from './distributor/DistributorLayout';
import DashboardOverview from './distributor/DashboardOverview';
import InventoryManager from './distributor/InventoryManager';

const DistributorDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <DashboardOverview />;
            case 'inventory':
                return <InventoryManager />;
            case 'deliveries':
                return (
                    <div className="flex items-center justify-center h-96 bg-white rounded-xl border border-slate-100 border-dashed">
                        <div className="text-center">
                            <h3 className="text-lg font-medium text-slate-900">Fleet Tracking Module</h3>
                            <p className="text-slate-500 mt-1">Coming in Phase 2</p>
                        </div>
                    </div>
                );
            case 'analytics':
                return (
                    <div className="flex items-center justify-center h-96 bg-white rounded-xl border border-slate-100 border-dashed">
                        <div className="text-center">
                            <h3 className="text-lg font-medium text-slate-900">Geo-Analytics Module</h3>
                            <p className="text-slate-500 mt-1">Coming in Phase 2</p>
                        </div>
                    </div>
                );
            case 'compliance':
                return (
                    <div className="flex items-center justify-center h-96 bg-white rounded-xl border border-slate-100 border-dashed">
                        <div className="text-center">
                            <h3 className="text-lg font-medium text-slate-900">Safety & Compliance Module</h3>
                            <p className="text-slate-500 mt-1">Coming in Phase 2</p>
                        </div>
                    </div>
                );
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <DistributorLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {renderContent()}
        </DistributorLayout>
    );
};

export default DistributorDashboard;