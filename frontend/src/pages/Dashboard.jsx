import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { BarChart3 } from 'lucide-react';

import { PackageCheck, Truck, Send, FileText } from 'lucide-react';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function InventoryDashboard() {
    const [summary, setSummary] = useState({ products: 0, lowStock: 0, sales: 0, revenue: 0 });
    const [weeklyData, setWeeklyData] = useState([]);
    const [productQuantities, setProductQuantities] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [summaryRes, weeklyRes, productRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/dashboard/summary'),
                    axios.get('http://localhost:5000/api/sales/weekly'),
                    axios.get('http://localhost:5000/api/sales/quantity-by-product')
                ]);

                setSummary(summaryRes.data);
                setWeeklyData(weeklyRes.data);
                setProductQuantities(productRes.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex-1 p-6 space-y-6">
                <div className="flex items-center gap-2 text-2xl font-bold">
                    <BarChart3 className="text-blue-600" />
                    Inventory & Sales Dashboard
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="flex items-center gap-3 p-4">
                            <PackageCheck className="text-blue-600" size={28} />
                            <div>
                                <p className="text-sm text-gray-500">Products</p>
                                <p className="text-xl font-bold text-gray-800">{summary.products}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="flex items-center gap-3 p-4">
                            <Truck className="text-red-600" size={28} />
                            <div>
                                <p className="text-sm text-gray-500">Low Stock</p>
                                <p className="text-xl font-bold text-gray-800">
                                    {summary.lowStock} {summary.lowStock > 0 && <span className="text-red-600 text-sm">🔻 Low Stock</span>}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="flex items-center gap-3 p-4">
                            <Send className="text-purple-600" size={28} />
                            <div>
                                <p className="text-sm text-gray-500">Sales</p>
                                <p className="text-xl font-bold text-gray-800">{summary.sales}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="flex items-center gap-3 p-4">
                            <FileText className="text-green-600" size={28} />
                            <div>
                                <p className="text-sm text-gray-500">Revenue</p>
                                <p className="text-xl font-bold text-gray-800">₹{summary.revenue.toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Line Chart */}
                <Card className="shadow-sm">
                    <CardContent className="p-4">
                        <h2 className="font-semibold text-lg text-gray-700 mb-3">Weekly Revenue & Sales</h2>
                        {weeklyData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={weeklyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="week" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="salesCount" stroke="#8884d8" name="Sales Count" />
                                    <Line type="monotone" dataKey="totalRevenue" stroke="#00C49F" name="Revenue" />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-gray-500">No weekly sales data available.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Pie Chart */}
                <Card className="shadow-sm">
                    <CardContent className="p-4">
                        <h2 className="font-semibold text-lg text-gray-700 mb-3"> Quantity Sold by Product</h2>
                        {productQuantities.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={productQuantities}
                                        dataKey="totalQuantity"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label
                                    >
                                        {productQuantities.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-gray-500">No product quantity data available.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
