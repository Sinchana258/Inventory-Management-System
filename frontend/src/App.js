// src/App.js
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import SalesPage from "./pages/SalesPage";
import SalesSummary from "./pages/SalesSummary";

// const express = require('express');
// const app = express();

// app.use(express.json());

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Layout wraps all pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="sales-summary" element={<SalesSummary />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
