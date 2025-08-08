import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex">
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <main
                className={`flex-1 bg-gray-100 min-h-screen p-6 transition-all duration-300`}
                style={{
                    marginLeft: isCollapsed ? "5rem" : "16rem"
                }}
            >
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;

