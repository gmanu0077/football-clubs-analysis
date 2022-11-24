const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Playerdistribution = sequelize.define("playerdistribution", {
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
    pass_accuracy: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    pass_attempted: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    pass_completed: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cross_accuracy: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cross_attempted: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cross_completed: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    freekicks_taken: {
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

module.exports = Playerdistribution