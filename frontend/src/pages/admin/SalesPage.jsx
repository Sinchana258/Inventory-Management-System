// import React, { useEffect, useState } from "react";
// import RecordSaleForm from "../../components/RecordSaleForm";
// import SalesList from "../../components/SalesList";
// // import CSVExportButton from "../components/ExportButton";
// import { TrendingUp } from "lucide-react";


// const SalesPage = () => {
//     const [sales, setSales] = useState([]);

//     const fetchSales = async () => {
//         try {
//             const res = await fetch("http://localhost:5000/api/sales");
//             const data = await res.json();
//             setSales(data);
//         } catch (err) {
//             console.error("Failed to fetch sales:", err);
//         }
//     };

//     useEffect(() => {
//         fetchSales();
//     }, []);

//     // const headers = [
//     //     { label: "ID", key: "id" },
//     //     { label: "Name", key: "name" },
//     //     { label: "Category", key: "category" },
//     //     { label: "Unit Price", key: "unitPrice" },
//     //     { label: "Quantity", key: "quantity" },
//     //     { label: "Total Price", key: "totalPrice" },
//     //     { label: "Date", key: "date" },
//     // ];

//     return (
//         <div className="p-6 space-y-6">
//             {/* Header */}
//             <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-2 text-2xl font-semibold">
//                     <TrendingUp className="text-purple-700" />
//                     Sales
//                 </div>
//                 {/* <CSVExportButton
//                     data={sales}
//                     headers={headers}
//                     filename="all_sales.csv"
//                 /> */}
//             </div>

//             {/* Record Sale Form */}
//             <Dialog>
//                 <DialogTrigger asChild>
//                     <Button className="bg-purple-600 text-white">+ Record Sale</Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                     <RecordSaleForm onSuccess={fetchSales} />
//                 </DialogContent>
//             </Dialog>

//             {/* Sales List */}
//             <div className="bg-white rounded-xl shadow p-6">
//                 <h3 className="text-lg font-semibold mb-4"> Sales Tracker</h3>
//                 <SalesList sales={sales} />
//             </div>
//         </div>
//     );
// };

// export default SalesPage;

import React, { useEffect, useState } from "react";
import RecordSaleForm from "../../components/RecordSaleForm";
import SalesList from "../../components/SalesList";
import { TrendingUp, Download } from "lucide-react";
import * as XLSX from "xlsx";

const SalesPage = () => {
    const [sales, setSales] = useState([]);

    const fetchSales = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/sales");
            const data = await res.json();
            setSales(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch sales:", err);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            sales.map((sale, index) => ({
                ID: index + 1,
                Name: sale.Product?.name || "",
                Category: sale.Product?.category || "",
                "Unit Price": sale.Product?.price || "",
                Quantity: sale.quantity,
                "Total Price": sale.totalPrice,
                Date: new Date(sale.createdAt).toLocaleString(),
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sales");
        XLSX.writeFile(workbook, "sales_data.xlsx");
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-2xl font-semibold">
                    <TrendingUp className="text-blue-700" />
                    Sales
                </div>
                <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
                >
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            {/* Record Sale Form */}
            <RecordSaleForm onSuccess={fetchSales} />

            {/* Sales List */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Sales Tracker</h3>
                <SalesList sales={sales} />
            </div>
        </div>
    );
};

export default SalesPage;
