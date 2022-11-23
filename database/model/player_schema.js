const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const PlayerTable = sequelize.define("player", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    club: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = PlayerTable;