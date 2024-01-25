const DataTypes = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Product', 'Service'),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('Books', 'Electronic Devices', 'Lab Equipment', 'Repairs', 'Plumbing', 'Electricity'),
      allowNull: false,
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
	      isGreaterThanZero(value) {
	        if (value <= 0) {
	          throw new Error('Cost must be greater than 0.');
	        }
	      },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activeStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, { 
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ['cost'],
        where: {
          cost: {
            [Sequelize.Op.gt]: 0,
          },
        },
      },
    ],
  });
};