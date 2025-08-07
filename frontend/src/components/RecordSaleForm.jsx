import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CalendarIcon, PackageCheck, ShoppingCart } from 'lucide-react';

const RecordSaleForm = ({ onSuccess }) => {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        // Set today's date by default
        const today = new Date().toISOString().split('T')[0];
        setDate(today);

        fetch('http://localhost:5000/api/products')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const saleData = {
            productId: Number(productId),
            quantity: Number(quantity),
            date
        };

        try {
            const response = await fetch('http://localhost:5000/api/sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saleData),
            });

            if (response.ok) {
                toast.success(" Sale recorded successfully!");
                setProductId('');
                setQuantity('');
                const today = new Date().toISOString().split('T')[0];
                setDate(today);
                if (onSuccess) onSuccess();
            } else {
                toast.error(" Failed to record sale.");
            }
        } catch (err) {
            console.error(err);
            toast.error(" Error recording sale.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
        >
            <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                <ShoppingCart className="text-blue-700" size={22} />
                Record a Sale
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                    <select
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
                        required
                    >
                        <option value="">-- Select Product --</option>
                        {products.map((p) => (
                            <option
                                key={p.id}
                                value={p.id}
                                disabled={p.stock <= 0}
                            >
                                {p.name} {p.stock <= 0 ? '(Out of stock)' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                        type="number"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
                        required
                        min={1}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <div className="flex items-center border border-gray-300 rounded-md px-2">
                        <CalendarIcon className="text-gray-500 mr-2" size={18} />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 focus:outline-none bg-transparent"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
                >
                    <PackageCheck className="inline-block mr-2" size={18} />
                    Record Sale
                </button>
            </div>
        </form>
    );
};

export default RecordSaleForm;

