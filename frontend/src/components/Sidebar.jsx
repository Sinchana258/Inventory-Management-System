// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
    Boxes,
    LayoutDashboard,
    Package,
    TrendingUp,
    BarChart3,
    Settings,
} from "lucide-react";

const Sidebar = () => {
    return (
        <div className="w-64 bg-blue-800 text-white min-h-screen p-4">
            <div className="flex items-center gap-2 mb-6 text-2xl font-bold">
                <Boxes className="text-yellow-300" />
                InventorySys
            </div>
            <nav className="space-y-4">
                <NavLink to="/" className="flex items-center gap-2 hover:text-yellow-300">
                    <LayoutDashboard /> Dashboard
                </NavLink>
                <NavLink to="/products" className="flex items-center gap-2 hover:text-yellow-300">
                    <Package /> Products
                </NavLink>
                <NavLink to="/sales" className="flex items-center gap-2 hover:text-yellow-300">
                    <TrendingUp /> Sales
                </NavLink>
                <NavLink to="/sales-summary" className="flex items-center gap-2 hover:text-yellow-300">
                    <BarChart3 /> Summary
                </NavLink>
                <NavLink to="/settings" className="flex items-center gap-2 hover:text-yellow-300">
                    <Settings /> Settings
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
