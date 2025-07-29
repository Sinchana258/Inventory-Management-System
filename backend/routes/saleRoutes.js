
const express = require('express');
const router = express.Router();
const { recordSale, getSales } = require('../controllers/saleController');
const { getSalesSummary, getWeeklySales } = require('../controllers/saleController');
const saleController = require('../controllers/saleController');


router.post('/', recordSale);
router.get('/', getSales); // Route for fetching all sales
router.get('/summary', getSalesSummary);
router.get('/weekly', getWeeklySales);
router.get('/export/csv', saleController.exportSalesAsCSV);
router.get('/quantity-by-product', saleController.getQuantityByProduct);
module.exports = router;




