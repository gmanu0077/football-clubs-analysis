const Sequelize = require("sequelize");

const sequelize = new Sequelize("new2", "root", "ahnpg7716P", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;