const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Playerdefending = sequelize.define("playerdefending", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    balls_recovered: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tackles: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    t_won: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    t_lost: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    clearance: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    matchplayed: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Playerid: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
});

module.exports = Playerdefending;