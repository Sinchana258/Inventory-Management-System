import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {
    LayoutDashboard,
    Box,
    Boxes,
    LineChart,
    ShoppingCart,
    LogOut,
    Menu,
    X
} from "lucide-react";

const Sidebar = () => {
    const { user, logout } = useAuth();
    const role = user?.role;
    const location = useLocation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    const navItems = {
        admin: [
            { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
            { label: "Products", icon: Box, path: "/admin/products" },
            { label: "Sales", icon: ShoppingCart, path: "/admin/sales" },
            { label: "Summary", icon: LineChart, path: "/admin/summary" },
        ],
        seller: [
            { label: "Dashboard", icon: LayoutDashboard, path: "/seller/dashboard" },
            { label: "Products", icon: Box, path: "/seller/products" },
            { label: "Sales", icon: ShoppingCart, path: "/seller/sales" },
            { label: "Summary", icon: LineChart, path: "/seller/summary" },
        ],
        buyer: [
            { label: "Products", icon: Box, path: "/buyer/products" },
        ]
    };

    const links = navItems[role] || [];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout(); // from your AuthContext
        navigate("/login");
    };

    return (
        <aside
            className={`h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-lg transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
                }`}
        >

            <div className="flex justify-between items-center p-4 border-b border-blue-600">
                <div className="flex items-center gap-2">
                    <Boxes size={30} color="#d9ba0aff" />

                    {!isCollapsed && <span className="text-xl font-bold tracking-wide">InventorySys</span>}


                </div>
                <button onClick={toggleSidebar}>
                    {isCollapsed ? <Menu size={40} /> : <X size={40} />}
                </button>
            </div>

            <nav className="p-4 space-y-2">
                {links.map(({ label, icon: Icon, path }) => (
                    <Link
                        key={path}
                        to={path}
                        className={`flex items-center gap-4 p-2 rounded-lg transition ${isActive(path)
                            ? "bg-white text-blue-700 font-semibold"
                            : "hover:bg-blue-600"
                            }`}
                    >
                        <Icon size={30} />
                        {!isCollapsed && <span>{label}</span>}
                    </Link>
                ))}

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-red-600 mt-6 w-full"
                >
                    <LogOut size={30} />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
