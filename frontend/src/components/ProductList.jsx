import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortAsc, setSortAsc] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/products');
            setProducts(res.data);
        } catch (err) {
            toast.error("Failed to fetch products");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete this product?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            setProducts(products.filter(p => p.id !== id));
            toast.success("Product deleted successfully");
        } catch (err) {
            toast.error("Error deleting product");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const { id, name, category, price, quantity } = editingProduct;
        try {
            await axios.put(`http://localhost:5000/api/products/${id}`, { name, category, price, quantity });
            toast.success("Product updated");
            setEditingProduct(null);
            fetchProducts();
        } catch (err) {
            toast.error("Update failed");
        }
    };

    const toggleSort = (field) => {
        if (sortBy === field) setSortAsc(!sortAsc);
        else {
            setSortBy(field);
            setSortAsc(true);
        }
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === '' || p.category === categoryFilter)
    );

    const sorted = [...filtered].sort((a, b) => {
        if (!sortBy) return 0;
        return sortAsc
            ? a[sortBy] > b[sortBy] ? 1 : -1
            : a[sortBy] < b[sortBy] ? 1 : -1;
    });

    return (
        <div className="container mt-8">
            <div className="flex items-center space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded p-2 w-1/3"
                />
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="border rounded p-2"
                >
                    <option value="">All Categories</option>
                    {[...new Set(products.map(p => p.category))].map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {editingProduct && (
                <form onSubmit={handleEditSubmit} className="mb-6 p-4 border rounded bg-gray-100">
                    <h2 className="text-xl font-semibold mb-2">Edit Product</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="border p-2 rounded w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                        className="border p-2 rounded w-full mb-2"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                        className="border p-2 rounded w-full mb-2"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={editingProduct.quantity}
                        onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })}
                        className="border p-2 rounded w-full mb-2"
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Update</button>
                    <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </form>
            )}

            <table className="w-full table-auto border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">#</th>
                        <th className="p-2 cursor-pointer" onClick={() => toggleSort('name')}>Name</th>
                        <th className="p-2 cursor-pointer" onClick={() => toggleSort('category')}>Category</th>
                        <th className="p-2 cursor-pointer" onClick={() => toggleSort('price')}>Price (₹)</th>
                        <th className="p-2 cursor-pointer" onClick={() => toggleSort('quantity')}>Stock</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.length === 0 ? (
                        <tr><td colSpan="6" className="text-center p-4 text-gray-500">No products found</td></tr>
                    ) : (
                        sorted.map((p, index) => (
                            <tr key={p.id} className="text-center border-t">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{p.name}</td>
                                <td className="p-2">{p.category}</td>
                                <td className="p-2">₹{p.price}</td>
                                <td className="p-2">
                                    {p.quantity} {p.quantity < 10 && <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-medium"> Low Stock</span>}
                                </td>
                                <td className="p-2">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                        onClick={() => setEditingProduct(p)}
                                    >Edit</button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 ml-2 rounded hover:bg-red-600"
                                        onClick={() => handleDelete(p.id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;