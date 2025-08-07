import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout
import DashboardLayout from "./components/DashBoardLayout";

// Common
import HomePage from "./pages/common/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import About from './pages/common/About';
import Contact from './pages/common/Contact';
import ForgotPassword from './pages/common/ForgotPassword';

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
import BuyerProducts from "./pages/buyer/ProductsPage";

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      {/* ✅ Toast Container should be outside Routes but inside Router */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

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
            <Route path="/buyer/products" element={<BuyerProducts />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
