// AddProductForm.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddProductForm = ({ fetchProducts }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, category, price, quantity }),
            });

            if (response.ok) {
                toast.success("Product added successfully");
                setName('');
                setCategory('');
                setPrice('');
                setQuantity('');
                if (fetchProducts) fetchProducts();
            } else {
                toast.error("Failed to add product");
            }
        } catch (err) {
            console.error("Error adding product:", err);
            toast.error("Failed to add product");
        }
    };

    return (
        <div className="container mt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required className="border rounded p-2 w-full" />
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-2 w-full" />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className="border rounded p-2 w-full" />
                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required className="border rounded p-2 w-full" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductForm;
