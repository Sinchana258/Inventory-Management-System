const { Sale, Product } = require('../models');
const nodemailer = require('nodemailer');
const { Parser } = require('json2csv');
const { Sequelize } = require('sequelize');
const { fn, col, literal } = require('sequelize');
require('dotenv').config();

const recordSale = async (req, res) => {
    try {
        const { productId, quantity, date } = req.body;

       // console.log(" Incoming sale POST data:", req.body);

        if (
            productId === undefined || quantity === undefined ||
            isNaN(productId) || isNaN(quantity) ||
            Number(quantity) <= 0
        ) {
            return res.status(400).json({ error: 'Valid product and quantity are required' });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.quantity < quantity) {
            return res.status(400).json({ error: 'Insufficient stock available' });
        }

        const totalPrice = product.price * quantity;
        const newSale = await Sale.create({
            productId,
            quantity,
            totalPrice,
            date: isNaN(new Date(date)) ? new Date() : new Date(date),
        });

        product.quantity -= quantity;
        await product.save();

        if (product.quantity < 10) {
            await sendLowStockEmail(product.name, product.quantity);
        }

        res.status(201).json({ newSale });
    } catch (err) {
        console.error(' Error recording sale:', err);
        res.status(500).json({ error: 'Failed to record sale' });
    }
};

const getSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: {
                model: Product,
                attributes: ['name', 'category', 'price']
            }
        });
        // console.log("Sale with product info:", sales.length);
        // console.log(" Sales with Product:", JSON.stringify(sales, null, 2));
        res.json(sales);
    } catch (err) {
        console.error('Error fetching sales:', err);
        res.status(500).json({ error: 'Failed to fetch sales' }); //  returns an object
    }
};

// Configure transporter

const sendLowStockEmail = async (productName, quantity) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Inventory Alert" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // or use a list if you want to notify more people
            subject: `⚠ Low Stock Alert: ${productName}`,
            text: `The product "${productName}" is running low. Only ${quantity} left in stock.`,
        };

        await transporter.sendMail(mailOptions);
        alert("mail sent for low stock");
        console.log(` Low stock email sent for ${productName}`);

    } catch (error) {
        console.error(' Failed to send email:', error);
    }
};

//summary of sales 

const { Op } = require('sequelize');

const getSalesSummary = async (req, res) => {
    try {
        const sales = await Sale.findAll();

        const totalSales = sales.length;
        const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
        const totalQuantitySold = sales.reduce((sum, sale) => sum + sale.quantity, 0);

        res.json({
            totalSales,
            totalRevenue,
            totalQuantitySold
        });
    } catch (err) {
        console.error('Error fetching sales summary:', err);
        res.status(500).json({ error: 'Failed to fetch summary' });
    }
};

const getWeeklySales = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            attributes: [
                [fn('YEARWEEK', col('date')), 'week'],
                [fn('SUM', col('totalPrice')), 'totalRevenue'],
                [fn('SUM', col('quantity')), 'totalQuantity'],
                [fn('COUNT', '*'), 'salesCount']
            ],
            group: [fn('YEARWEEK', col('date'))],
            order: [[literal('week'), 'ASC']]
        });

        res.json(sales);
    } catch (error) {
        console.error('Error fetching weekly sales:', error);
        res.status(500).json({ error: 'Failed to fetch weekly sales' });
    }
};

//exporting sales data as a CSV file

const exportSalesAsCSV = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            include: [{ model: Product }]
        });

        const plainData = sales.map(sale => ({
            id: sale.id,
            productName: sale.Product?.name || 'Unknown',
            quantity: sale.quantity,
            totalPrice: sale.totalPrice,
            date: sale.date
        }));

        const fields = ['id', 'productName', 'quantity', 'totalPrice', 'date'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(plainData);

        res.header('Content-Type', 'text/csv');
        res.attachment('sales_data.csv');
        return res.send(csv);
    } catch (err) {
        console.error(' Error exporting CSV:', err);
        res.status(500).json({ error: 'Failed to export sales data as CSV.' });
    }
};


//getQuantityByProduct


const getQuantityByProduct = async (req, res) => {
    try {
        const result = await Sale.findAll({
            attributes: [
                'productId',
                [Sequelize.fn('SUM', Sequelize.col('Sale.quantity')), 'totalQuantity']
            ],
            include: [
                {
                    model: Product,
                    attributes: ['name']
                }
            ],
            group: ['Sale.productId', 'Product.id']
        });

        const formatted = result.map((row) => ({
            name: row.Product.name,
            totalQuantity: parseInt(row.dataValues.totalQuantity)
        }));

        res.json(formatted);
    } catch (error) {
        console.error("Error in getQuantityByProduct:", error);
        res.status(500).json({ error: 'Failed to fetch product quantity data' });
    }
};


module.exports = { recordSale, getSales, sendLowStockEmail, getSalesSummary, getWeeklySales, exportSalesAsCSV, getQuantityByProduct };
