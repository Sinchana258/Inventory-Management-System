const { Product } = require('../models');
const { Op } = require("sequelize");
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body;
        const newProduct = await Product.create({ name, category, price, quantity });
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add product' });
    }
};


// UPDATE product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await Product.update(req.body, { where: { id } });
        res.json({ message: 'Product updated', updated });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// DELETE product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.destroy({ where: { id } });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};


const getLowStockProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                quantity: { [require('sequelize').Op.lt]: 10 }
            }
        });
        res.json(products);
    } catch (err) {
        console.error('Error fetching low stock products:', err);
        res.status(500).json({ error: 'Failed to fetch low stock products' });
    }
};

module.exports = {
    getLowStockProducts,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,

};


