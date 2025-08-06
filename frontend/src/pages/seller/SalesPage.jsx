import React, { useEffect, useState } from "react";
import RecordSaleForm from "../../components/RecordSaleForm";
import SalesList from "../../components/SalesList";
// import CSVExportButton from "../components/ExportButton";
import { TrendingUp } from "lucide-react";

const SalesPage = () => {
    const [sales, setSales] = useState([]);

    const fetchSales = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/sales");
            const data = await res.json();
            setSales(data);
        } catch (err) {
            console.error("Failed to fetch sales:", err);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    // const headers = [
    //     { label: "ID", key: "id" },
    //     { label: "Name", key: "name" },
    //     { label: "Category", key: "category" },
    //     { label: "Unit Price", key: "unitPrice" },
    //     { label: "Quantity", key: "quantity" },
    //     { label: "Total Price", key: "totalPrice" },
    //     { label: "Date", key: "date" },
    // ];

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-2xl font-semibold">
                    <TrendingUp className="text-purple-700" />
                    Sales
                </div>
                {/* <CSVExportButton
                    data={sales}
                    headers={headers}
                    filename="all_sales.csv"
                /> */}
            </div>

            {/* Record Sale Form */}
            <div className="bg-white rounded-xl shadow p-6">
                <RecordSaleForm onSuccess={fetchSales} />
            </div>

            {/* Sales List */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4"> Sales Tracker</h3>
                <SalesList sales={sales} />
            </div>
        </div>
    );
};

export default SalesPage;
