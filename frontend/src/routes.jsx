// src/routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/Welcome/HomePage";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import AdminDashboard from "./pages/Admin/Dashboard";
import SellerDashboard from "./pages/Seller/Dashboard";
import BuyerDashboard from "./pages/Buyer/Dashboard";
import ProtectedRoute from "./components/Layout/ProtectedRoute";

const RoutesConfig = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            {/* Protected Routes */}
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute role="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/seller/dashboard"
                element={
                    <ProtectedRoute role="seller">
                        <SellerDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/buyer/dashboard"
                element={
                    <ProtectedRoute role="buyer">
                        <BuyerDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default RoutesConfig;