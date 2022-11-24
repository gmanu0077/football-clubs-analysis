const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const PlayerAttempts = sequelize.define("playerattempts", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        //  allowNull: false,
        primaryKey: true,
    },
    position: {
        type: Sequelize.STRING,
        //   allowNull: false,
    },
    total_attempts: {
        type: Sequelize.INTEGER,
        //   allowNull: false,
    },
    on_target: {
        type: Sequelize.INTEGER,
        //   allowNull: false,
    },
    off_target: {
        type: Sequelize.INTEGER,
        //  allowNull: false,
    },
    blocked: {
        type: Sequelize.INTEGER,
        //  allowNull: false,
    },
    matchplayed: {
        type: Sequelize.INTEGER,
        //  allowNull: false,
    },
    Playerid: {
        type: Sequelize.INTEGER,
        // allowNull: true,
    },

});

module.exports = PlayerAttempts;