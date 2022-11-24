const router = require("express").Router();
const sequelize = require('../../util/database')
const Sequelize = require('sequelize')
// const Playerdistribution = require("./model/distribution_schema");
// const Playerdiscipline = require("./model/disciplinary_schema");
// const Playerdefending = require("./model/defending_schema");
// const PlayerAttempts = require("./model/attempts_schema");
// const PlayerAttacking = require("./model/attacking_schema");
// const playerattempts = require('./model/attempts_schema')
// const playerdistribution = require('./model/distribution_schema')
// const Playergoalkeeping = require('./model/goalkeeping_schema')
// const playergoals = require('./model/goals_schema')
const playerkeystats = require('../../model/keystats_schema')
const Player = require("../../model/player_schema");
router.route("/").get((req, res) => {
    console.log("here");
    const clubdata = [];
    var playerid_max;
    var playerid_min;
    var maxclub;
    var minclub;
    var secondclub;
    sequelize.sync({})
        .then(() => {
            /////max goals-club
            const club_max = playerkeystats.findOne({
                attributes: [
                    sequelize.fn('max', Sequelize.col('goals')), Sequelize.col('Playerid')],
                raw: true,
            }).then((data) => {
                res.json(data)
                Object.values(data).map(id => playerid_max = id)

                console.log(playerid_max, "id")
            }).then(() => {
                console.log(playerid_max, "idd")
                Player.findOne({ where: { id: `${playerid_max}` } }).then(data => {
                    maxclub = data.dataValues.club
                    console.log(data.dataValues.club)
                })
            })
                .catch(err => console.log(err));

            /////clubs with min goals

            const club_min = playerkeystats.findOne({
                attributes: [
                    sequelize.fn('min', Sequelize.col('goals')), Sequelize.col('Playerid')],
                raw: true,
            }).then((data) => {
                //res.json(data)
                Object.values(data).map(id => playerid_min = id)

                console.log(playerid_min, "id")
            }).then(() => {
                console.log(playerid_min, "idd")
                Player.findOne({ where: { id: `${playerid_min}` } }).then(data => {
                    minclub = data.dataValues.club
                    console.log(data.dataValues.club)
                })
            })
                .catch(err => console.log(err))

        }).catch(err => {
            console.log(err)
        })





});
router.route('/data').get((req, res) => {
    console.log("post");
    const [player_name, club_name, position, type] = req.body

    if (player_name && !club_name && !position && !type) {

    }
})

module.exports = router;
