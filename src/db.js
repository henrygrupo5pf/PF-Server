const { Sequelize } = require("sequelize");
require("dotenv").config();

const fs = require('fs');
const path = require('path');
const {
   DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, 
  DB_URL
} = process.env;

/* para local */
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, 
  native: false, 
});

/*Servidor*/
// const sequelize = new Sequelize(`${DB_URL}`, {
//   logging: false, 
//   native: false, 
//   dialect: 'postgres', // o el dialecto de tu base de datos (puede ser 'postgres' para PostgreSQL, 'mssql' para Microsoft SQL Server, etc.)
//   dialectOptions: {
//     // ssl: {
//     //   require: true,
//     //   rejectUnauthorized: false, // O ajusta según tus necesidades de seguridad
//     // },
//   },
// });

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Product, Reservation, ShoppingCart } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
User.hasMany(Product, { foreignKey: 'userId' });
Product.belongsTo(User, { foreignKey: 'userId' });
Product.hasMany(Reservation, { foreignKey: 'productId' });
Reservation.belongsTo(Product, { foreignKey: 'productId' });
User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(ShoppingCart, { foreignKey: 'userId' });
ShoppingCart.belongsTo(User, { foreignKey: 'userId' });
Product.belongsToMany(ShoppingCart, { through: 'CartProduct' });
ShoppingCart.belongsToMany(Product, { through: 'CartProduct' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};