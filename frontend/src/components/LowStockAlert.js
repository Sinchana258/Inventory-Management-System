import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

const LowStockAlert = () => {
    const [lowStockItems, setLowStockItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products/low-stock')
            .then((res) => res.json())
            .then((data) => {
                console.log("Low stock data:", data);
                setLowStockItems(data);
            });
    }, []);

    if (lowStockItems.length === 0) return null;

    return (
        <div className="bg-red-100 border border-red-300 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-red-700 font-semibold">
                <AlertCircle className="h-5 w-5" />
                Low Stock Alert
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700">
                {lowStockItems.map((item) => (
                    <li key={item.id}>
                        <span className="font-medium text-gray-800">{item.name}</span>{' '}
                        — only <span className="text-red-600 font-bold">{item.quantity}</span> left
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LowStockAlert;
