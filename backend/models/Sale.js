module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        totalPrice: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATE
        }
    });

    return Sale;
};
