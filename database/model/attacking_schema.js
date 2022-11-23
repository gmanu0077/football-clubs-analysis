const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const PlayerAttacking = sequelize.define("playerattacks", {
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
    assist: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    corner_taken: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    offsides: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    dribbles: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    matchplayed: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

});

module.exports = PlayerAttacking;