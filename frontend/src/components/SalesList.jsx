import React, { useEffect, useState } from 'react';
// import CSVExportButton from './ExportButton'; // adjust path if needed

const SalesList = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/sales')
            .then(res => res.json())
            .then(data => {
                console.log("🟢 Sales API response:", data);
                setSales(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error("❌ Error fetching sales:", err);
                setSales([]);
            });
    }, []);

    return (
        <div>
            {sales.length === 0 ? (
                <p>No sales found.</p>
            ) : (
                <table className="min-w-full border text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Unit Price</th>
                            <th className="py-2 px-4 border-b">Quantity</th>
                            <th className="py-2 px-4 border-b">Total Price</th>
                            <th className="py-2 px-4 border-b">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale, index) => {
                            const product = sale.Product || {};
                            return (
                                <tr key={sale.id}>
                                    <td className="py-1 px-4 border-b">{index + 1}</td>
                                    <td className="py-1 px-4 border-b">{product.name || '❓'}</td>
                                    <td className="py-1 px-4 border-b">{product.category || '-'}</td>
                                    <td className="py-1 px-4 border-b">₹{product.price || '-'}</td>
                                    <td className="py-1 px-4 border-b">{sale.quantity}</td>
                                    <td className="py-1 px-4 border-b">₹{sale.totalPrice}</td>
                                    <td className="py-1 px-4 border-b">{new Date(sale.createdAt).toLocaleString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SalesList;
