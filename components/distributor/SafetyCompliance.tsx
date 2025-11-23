import React from 'react';
import { 
    Shield, 
    FileText, 
    AlertTriangle, 
    Download, 
    CheckCircle, 
    Clock, 
    AlertCircle,
    Calendar
} from 'lucide-react';
import { MOCK_COMPLIANCE_DOCS, MOCK_SAFETY_INCIDENTS } from '../data/mockDistributorData';

const SafetyCompliance: React.FC = () => {
    // Calculate overall safety score based on mock logic or static for now as per requirements
    const safetyScore = 92;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'VALID': return 'bg-green-100 text-green-700 border-green-200';
            case 'EXPIRING_SOON': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'EXPIRED': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'LOW': return 'text-blue-600 bg-blue-50';
            case 'MEDIUM': return 'text-yellow-600 bg-yellow-50';
            case 'HIGH': return 'text-orange-600 bg-orange-50';
            case 'CRITICAL': return 'text-red-600 bg-red-50';
            default: return 'text-slate-600 bg-slate-50';
        }
    };

    return (
        <div className="space-y-6">
            {/* Top Section: Scorecard & Action Items */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Compliance Scorecard */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <Shield className="text-blue-600" size={20} />
                            Safety Score
                        </h3>
                        <span className="text-sm text-slate-500">Last Audit: Oct 25, 2023</span>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center py-4">
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-slate-100"
                                />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={440}
                                    strokeDashoffset={440 - (440 * safetyScore) / 100}
                                    className="text-green-500 transition-all duration-1000 ease-out"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-4xl font-bold text-slate-800">{safetyScore}%</span>
                                <span className="text-xs text-green-600 font-medium">Excellent</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 mt-4 text-center">
                            Your facility meets most safety standards. <br/>
                            <span className="text-blue-600 cursor-pointer hover:underline">View detailed report</span>
                        </p>
                    </div>
                </div>

                {/* Action Items */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <AlertTriangle className="text-orange-500" size={20} />
                            Action Items
                        </h3>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                            2 Urgent
                        </span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-100 rounded-lg">
                            <div className="p-2 bg-white rounded-full shadow-sm text-red-500">
                                <AlertCircle size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-red-900">Renew Fire Safety Certificate</h4>
                                <p className="text-sm text-red-700 mt-1">Certificate expires in 15 days. Schedule inspection immediately to avoid penalties.</p>
                                <button className="mt-3 text-xs font-medium bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition-colors">
                                    Schedule Inspection
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                            <div className="p-2 bg-white rounded-full shadow-sm text-yellow-600">
                                <FileText size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-yellow-900">Submit Monthly Safety Audit</h4>
                                <p className="text-sm text-yellow-800 mt-1">October 2023 audit report is pending submission.</p>
                                <button className="mt-3 text-xs font-medium bg-white border border-yellow-300 text-yellow-700 px-3 py-1.5 rounded hover:bg-yellow-100 transition-colors">
                                    Upload Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Document Repository */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <FileText className="text-blue-600" size={20} />
                            Compliance Documents
                        </h3>
                        <button className="text-sm text-blue-600 hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {MOCK_COMPLIANCE_DOCS.map((doc) => (
                            <div key={doc.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-800">{doc.title}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-slate-500">Expires: {doc.expiryDate}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(doc.status)}`}>
                                                {doc.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <Download size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Incident Log */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <AlertTriangle className="text-blue-600" size={20} />
                            Incident Log
                        </h3>
                        <button className="text-sm text-blue-600 hover:underline">Report Incident</button>
                    </div>
                    <div className="p-4">
                        <div className="relative pl-6 border-l-2 border-slate-100 space-y-8">
                            {MOCK_SAFETY_INCIDENTS.map((incident) => (
                                <div key={incident.id} className="relative">
                                    <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                                        incident.status === 'RESOLVED' ? 'bg-green-500' : 'bg-orange-500'
                                    }`}></div>
                                    
                                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${getSeverityColor(incident.severity)}`}>
                                                    {incident.severity}
                                                </span>
                                                <span className="ml-2 text-xs font-medium text-slate-500">{incident.type}</span>
                                            </div>
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <Calendar size={12} />
                                                {incident.date}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-700 font-medium mb-1">{incident.description}</p>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Shield size={12} />
                                                    {incident.location}
                                                </span>
                                                <span>•</span>
                                                <span>{incident.reportedBy}</span>
                                            </div>
                                            <span className={`text-xs font-medium ${
                                                incident.status === 'RESOLVED' ? 'text-green-600' : 'text-orange-600'
                                            }`}>
                                                {incident.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SafetyCompliance;