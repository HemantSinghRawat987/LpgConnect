import React from 'react';
import { Flame, LogOut } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
    role: UserRole;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ role, onLogout }) => {
    return (
        <nav className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-1.5 rounded-lg text-blue-700">
                            <Flame size={24} fill="currentColor" />
                        </div>
                        <div>
                            <span className="font-bold text-xl tracking-tight block leading-none">HP SmartTrack</span>
                            <span className="font-light text-[10px] tracking-widest block leading-none opacity-80 mt-1">FUTURE ENERGY</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {role !== UserRole.LANDING && (
                            <div className="hidden md:block px-3 py-1 rounded-full bg-blue-800/50 border border-blue-600 text-xs font-medium uppercase tracking-wide">
                                {role === UserRole.DISTRIBUTOR ? 'Enterprise Portal' : 'Customer App'}
                            </div>
                        )}
                        {role !== UserRole.LANDING && (
                            <button 
                                onClick={onLogout}
                                className="p-2 hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-2 text-sm border border-transparent hover:border-blue-600"
                            >
                                <LogOut size={18} />
                                <span className="hidden sm:inline">Exit</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;