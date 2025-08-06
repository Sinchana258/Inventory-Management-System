
import React from "react";
import ProductList from "../../components/ProductList";
import AddProductForm from "../../components/AddProductForm";
import LowStockAlert from "../../components/LowStockAlert";

const ProductsPage = () => {
    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold"> Products</h2>

            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-medium mb-4">Add Product <span className="text-purple-600 text-xl font-bold">＋</span></h2>
                <AddProductForm />
            </div>

            <LowStockAlert />

            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium mb-4">Product Inventory</h3>
                <ProductList />
            </div>
        </div>
    );
};

export default ProductsPage;
