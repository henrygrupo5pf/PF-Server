const DataTypes = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('CartProduct', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    timestamps: false,
  });
};