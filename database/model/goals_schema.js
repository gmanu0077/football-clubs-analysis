const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Playergoals = sequelize.define("playergoals", {
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
    goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    right_foot: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    left_foot: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    header: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    others: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    inside_area: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    outside_area: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    penalties: {
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

module.exports = Playergoals