const Sequelize = require("sequelize");

const sequelize = new Sequelize("manu", "root", "root", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;