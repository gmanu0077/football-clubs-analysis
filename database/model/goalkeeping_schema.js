const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Playergoalkeeping = sequelize.define("goalkeeper", {
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
    saved: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    conceded: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    saved_penalties: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cleansheets: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    punches_made: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    matchplayed: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }, Playerid: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },

});

module.exports = Playergoalkeeping