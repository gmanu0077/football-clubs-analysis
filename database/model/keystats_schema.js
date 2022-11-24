const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Playerkeystats = sequelize.define("playerstats", {
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

    minutes_played: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    matchplayed: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    assist: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    distance_covered: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Playerid: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
});

module.exports = Playerkeystats