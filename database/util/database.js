const Sequelize = require("sequelize");

const sequelize = new Sequelize("playersdata", "root", "ahnpg7716P", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;