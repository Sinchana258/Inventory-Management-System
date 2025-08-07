import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import AddProductForm from "../../components/AddProductForm";
import LowStockAlert from "../../components/LowStockAlert";
import { toast } from 'react-toastify';
import axios from "axios";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/products');
            setProducts(res.data);
        } catch (err) {
            toast.error("Failed to fetch products");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="w-full px-6 py-4">
            <LowStockAlert products={products} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                    <AddProductForm fetchProducts={fetchProducts} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <ProductList products={products} fetchProducts={fetchProducts} />
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
