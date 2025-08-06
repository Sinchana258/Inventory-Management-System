// import { Outlet } from "react-router-dom";
// import { useState } from "react";
// import Sidebar from "./Sidebar";

// const DashboardLayout = () => {
//     const [collapsed, setCollapsed] = useState(false);
//     return (
//         <div className="flex">
//             {/* Sidebar */}
//             <aside
//                 className={`h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-md fixed top-0 left-0 z-50 transition-all duration-300 ${collapsed ? "w-16" : "w-60"
//                     }`}
//             >
//                 <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
//             </aside>

//             {/* Main content */}
//             <main
//                 className={`transition-all duration-300 flex-1 p-6 ${collapsed ? "ml-16" : "ml-60"
//                     }`}
//             >
//                 <Outlet />
//             </main>
//         </div>
//     );
// };
// export default DashboardLayout;

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex">
            <aside
                className={`h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-md fixed top-0 left-0 z-50 transition-all duration-300 ${collapsed ? "w-16" : "w-60"
                    }`}
            >
                {/* ✅ Pass props here */}
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            </aside>

            <main
                className={`transition-all duration-300 flex-1 p-6 ${collapsed ? "ml-16" : "ml-60"
                    }`}
            >
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
