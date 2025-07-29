// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (

        <div className="flex flex-col md:flex-row">
            <Sidebar className="sticky top-0 h-screen" />

            <main className="flex-1 bg-gray-100 min-h-screen p-6">
                <Outlet />  {/* This renders the nested route components */}
            </main>
        </div>

    );
};

export default Layout;
