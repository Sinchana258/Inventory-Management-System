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

    // CSV headers
    // const headers = [
    //     { label: "ID", key: "id" },
    //     { label: "Name", resolve: (row) => row.Product?.name || '❓' },
    //     { label: "Category", resolve: (row) => row.Product?.category || '-' },
    //     { label: "Unit Price", resolve: (row) => row.Product?.price || '-' },
    //     { label: "Quantity", key: "quantity" },
    //     { label: "Total Price", key: "totalPrice" },
    //     { label: "Date", resolve: (row) => new Date(row.createdAt).toLocaleString() },
    // ];

    return (
        <div>
            {/* <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Sales Tracker</h3>
                <CSVExportButton data={sales} headers={headers} filename="all_sales.csv" />
            </div> */}

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
