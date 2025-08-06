const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

// Model factories:
const ProductModel = require('./Product');
const SaleModel = require('./Sale');
const UserModel = require('./User');  

// Initialize models:
const Product = ProductModel(sequelize, Sequelize.DataTypes);
const Sale = SaleModel(sequelize, Sequelize.DataTypes);
const User = UserModel(sequelize, Sequelize.DataTypes); 

// Associations:
Product.hasMany(Sale, { foreignKey: 'productId' });
Sale.belongsTo(Product, { foreignKey: 'productId' });

// Export models and sequelize:
module.exports = {
    sequelize,
    Sequelize,
    Product,
    Sale,
    User,
};
