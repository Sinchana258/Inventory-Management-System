import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/Layout/ProtectedRoute";

// Layout
import DashboardLayout from "./components/DashBoardLayout";

// Common
import HomePage from "./pages/common/HomePage";
import LoginForm from "./pages/common/LoginForm";
import RegisterForm from "./pages/common/RegisterForm";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/ProductsPage";
import AdminSales from "./pages/admin/SalesPage";
import AdminSummary from "./pages/admin/SalesSummary";
import SettingsPage from "./pages/admin/SettingsPage";

// Seller Pages
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProducts from "./pages/seller/ProductsPage"
import SellerSales from "./pages/seller/SalesPage";
import SellerSummary from "./pages/seller/SalesSummary";

// Buyer Pages
// import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import BuyerProducts from "./pages/buyer/ProductsPage";

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/sales" element={<AdminSales />} />
            <Route path="/admin/summary" element={<AdminSummary />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Seller Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/products" element={<SellerProducts />} />
            <Route path="/seller/sales" element={<SellerSales />} />
            <Route path="/seller/summary" element={<SellerSummary />} />
          </Route>
        </Route>

        {/* Buyer Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["buyer"]} />}>
          <Route element={<DashboardLayout />}>
            {/* <Route path="/buyer/dashboard" element={<BuyerDashboard />} /> */}
            <Route path="/buyer/products" element={<BuyerProducts />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
