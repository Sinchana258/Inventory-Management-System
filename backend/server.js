const express = require('express');
const app = express();
const cors = require('cors');

// Import sequelize and models
const { sequelize } = require('./models');

// Routes
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/auth');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

//   call .sync() on the sequelize instance
sequelize.sync().then(() => {
    console.log('✅ DB synced');
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
});

app.get("/", (req, res) => {
    res.send("Backend server is running.");
});
