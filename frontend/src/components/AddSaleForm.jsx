import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AddSaleForm = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("❌ Failed to fetch products", err));
    }, []);

    const handleSale = async () => {
        if (!selectedProductId || quantity <= 0) {
            toast.warn("⚠️ Select a product and valid quantity");
            return;
        }

        const selectedProduct = products.find(p => p.id === parseInt(selectedProductId));
        const totalPrice = selectedProduct.price * quantity;

        try {
            const res = await fetch('http://localhost:5000/api/sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: selectedProduct.id,
                    quantity,
                    totalPrice
                })
            });

            if (res.ok) {
                toast.success(" Sale recorded!");
                setSelectedProductId('');
                setQuantity(1);
            } else {
                toast.error("Failed to record sale");
            }
        } catch (err) {
            console.error(err);
            toast.error(" Error recording sale");
        }
    };

    return (
        <div>
            <h2>🛒 Add Sale</h2>

            <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
                <option value="">Select product</option>
                {products.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.name} ({p.category}) - ₹{p.price}
                    </option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ marginLeft: '10px', width: '60px' }}
            />

            <button onClick={handleSale} style={{ marginLeft: '10px' }}>
                💾 Record Sale
            </button>
        </div>
    );
};

export default AddSaleForm;
