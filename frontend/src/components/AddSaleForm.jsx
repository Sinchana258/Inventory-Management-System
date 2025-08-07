import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddSaleForm = ({ onSaleAdded }) => {
    const [formData, setFormData] = useState({
        productId: "",
        quantitySold: 1,
        price: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/sales", formData);
            toast.success("Sale recorded!");
            setFormData({ productId: "", quantitySold: 1, price: "" });
            onSaleAdded(); // Trigger update
        } catch (err) {
            toast.error("Failed to record sale");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow p-4 rounded-md mb-4 max-w-xl mx-auto"
        >
            <h2 className="text-xl font-semibold mb-4">Add Sale</h2>
            <div className="mb-3">
                <label className="block mb-1">Product ID</label>
                <input
                    type="text"
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="block mb-1">Quantity Sold</label>
                <input
                    type="number"
                    name="quantitySold"
                    value={formData.quantitySold}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                    min="1"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="block mb-1">Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
                Record Sale
            </button>
        </form>
    );
};

export default AddSaleForm;
