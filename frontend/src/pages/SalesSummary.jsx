import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { SalesChart, SalesWeeklyChart } from "../components/SalesChart";
import CSVExportButton from "../components/ExportButton";
import { BarChart3, IndianRupee, PackageSearch, ShoppingCart } from "lucide-react";

const SalesSummary = () => {
    const [salesData, setSalesData] = useState({
        totalSales: 0,
        totalRevenue: 0,
        totalQuantitySold: 0,
    });

    useEffect(() => {
        fetch("http://localhost:5000/api/sales/summary")
            .then((res) => res.json())
            .then((data) => setSalesData(data))
            .catch((err) => console.error("❌ Failed to fetch sales summary:", err));
    }, []);

    const summaryHeaders = [
        { label: "Total Sales", key: "totalSales" },
        { label: "Total Revenue", key: "totalRevenue" },
        { label: "Total Quantity Sold", key: "totalQuantitySold" },
    ];

    const summaryData = [salesData];

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <BarChart3 className="w-7 h-7 text-blue-700" />
                    Sales Summary
                </h2>
                <CSVExportButton
                    data={summaryData}
                    headers={summaryHeaders}
                    filename="sales_summary.csv"
                />
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="shadow-md">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-3">
                            <ShoppingCart className="text-blue-600 w-6 h-6" />
                            <h3 className="text-lg font-medium">Total Sales</h3>
                        </div>
                        <p className="text-2xl mt-2 font-semibold">{salesData.totalSales}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-md">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-3">
                            <IndianRupee className="text-green-600 w-6 h-6" />
                            <h3 className="text-lg font-medium">Total Revenue</h3>
                        </div>
                        <p className="text-2xl mt-2 font-semibold">₹ {salesData.totalRevenue}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-md">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-3">
                            <PackageSearch className="text-purple-600 w-6 h-6" />
                            <h3 className="text-lg font-medium">Total Quantity Sold</h3>
                        </div>
                        <p className="text-2xl mt-2 font-semibold">{salesData.totalQuantitySold}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="shadow">
                    <CardContent className="p-6">
                        <SalesChart />
                    </CardContent>
                </Card>
                <Card className="shadow">
                    <CardContent className="p-6">
                        <SalesWeeklyChart />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SalesSummary;
