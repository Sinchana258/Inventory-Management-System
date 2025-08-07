import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, LineChart, Line,
    XAxis, YAxis, Tooltip, CartesianGrid,
    ResponsiveContainer
} from 'recharts';

export const SalesChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/sales')
            .then(res => res.json())
            .then(data => {
                const grouped = data.reduce((acc, sale) => {
                    const name = sale.Product?.name || 'Unknown';
                    acc[name] = acc[name] || 0;
                    acc[name] += sale.quantity;
                    return acc;
                }, {});

                const chartData = Object.entries(grouped).map(([name, quantity]) => ({
                    name,
                    quantity
                }));
                setData(chartData);
            })
            .catch(err => console.error(' Error loading chart data:', err));
    }, []);

    return (
        <div className="w-full h-[300px]">
            <h3 className="text-lg font-semibold mb-4"> Quantity Sold by Product</h3>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 10, bottom: 50 }} // bottom increased
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            angle={-30}
                            textAnchor="end"
                            interval={0}
                            height={60} // extra space for rotated labels
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="quantity" fill="#60a5fa" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export const SalesWeeklyChart = () => {
    const [weeklyData, setWeeklyData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/sales/weekly')
            .then(res => res.json())
            .then(data => {
                const formatted = data.map(item => ({
                    week: `W${item.week}`,
                    totalRevenue: Number(item.totalRevenue),
                    totalQuantity: Number(item.totalQuantity)
                }));
                setWeeklyData(formatted);
            })
            .catch(err => console.error(' Error loading weekly sales chart:', err));
    }, []);

    return (
        <div className="w-full h-[300px]">
            <h3 className="text-lg font-semibold mb-4"> Weekly Sales Overview</h3>
            {weeklyData.length > 0 ? (


                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyData}
                        margin={{ top: 20, right: 30, left: 10, bottom: 50 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="week"
                            angle={-30}
                            textAnchor="end"
                            interval={0}
                            height={60}
                        />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="totalRevenue" stroke="#4ade80" name="Revenue ₹" />
                        <Line type="monotone" dataKey="totalQuantity" stroke="#60a5fa" name="Quantity Sold" />

                    </LineChart>
                </ResponsiveContainer>

            ) : (
                <p>Loading weekly chart...</p>
            )}
        </div>
    );
};
