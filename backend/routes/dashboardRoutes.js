const express = require('express');
const router = express.Router();
const { Product, Sale } = require('../models');
const { Op } = require('sequelize');

router.get('/summary', async (req, res) => {
    try {
        const products = await Product.count();
        const lowStock = await Product.count({ where: { quantity: { [Op.lt]: 10 } } });
        const sales = await Sale.count();
        const revenue = await Sale.sum('totalPrice') || 0;

        res.json({ products, lowStock, sales, revenue });
    } catch (err) {
        console.error('❌ Dashboard summary error:', err);
        res.status(500).json({ error: 'Failed to fetch dashboard summary' });
    }
});

module.exports = router;
