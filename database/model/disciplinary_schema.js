const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Playerdiscipline = sequelize.define("playerdisciplinary", {
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
    fouls_comitted: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    fouls_suffered: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    red: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    yellow: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    minutes_played: {
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

module.exports = Playerdiscipline