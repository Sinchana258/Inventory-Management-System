// src/components/CSVExportButton.jsx
import React from "react";

const CSVExportButton = ({ data, headers, filename }) => {
    const downloadCSV = () => {
        const csvRows = [];

        // Add headers
        csvRows.push(headers.map(h => `"${h.label}"`).join(","));

        // Add rows
        data.forEach(row => {
            const values = headers.map(h => `"${row[h.key]}"`);
            csvRows.push(values.join(","));
        });

        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename || "sales_summary.csv");
        link.click();
    };

    return (
        <button
            onClick={downloadCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm shadow"
        >
             Export Summary CSV
        </button>
    );
};

export default CSVExportButton;
