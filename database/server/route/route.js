const router = require("express").Router();
const sequelize = require('../../util/database')
const Sequelize = require('sequelize')
const Playerdistribution = require("../../model/distribution_schema");
const Playerdiscipline = require("../../model/disciplinary_schema");
const Playerdefending = require("../../model/defending_schema");
const PlayerAttempts = require("../../model/attempts_schema");
const PlayerAttacking = require("../../model/attacking_schema");
const playerattempts = require('../../model/attempts_schema')
const playerdistribution = require('../../model/distribution_schema')
const Playergoalkeeping = require('../../model/goalkeeping_schema')
const playergoals = require('../../model/goals_schema')
const playerkeystats = require('../../model/keystats_schema')
const Player = require("../../model/player_schema");
const Playerkeystats = require("../../model/keystats_schema");
const Playergoals = require("../../model/goals_schema");
router.route("/").get((req, res) => { //THIS REQUEST IS FOR NIL CONDITION MENTIONED IN THE ASSIGNMENT
    var clubdata = {
        min_club: "",
        max_club: "",
        secondmax_club: ""
    };
    const goaldata = []
    var max;
    var secondmax;
    var min;
    var maxclub;
    var minclub;
    var secondmaxclub;
    sequelize.sync({})
        .then(() => {

            Playerkeystats.findAll({
                order: [['goals']],
                attributes: ['Playerid', 'goals']
            }).then((res) => {
                res.map((ti) => goaldata.push(ti.dataValues))
                max = goaldata[goaldata.length - 1]
                secondmax = goaldata[goaldata.length - 2]
                min = goaldata[0]

            }).then(() => {
                Player.findOne({ where: { id: `${max.Playerid}` } }).then(data => {
                    maxclub = data.dataValues.club
                    clubdata.max_club = maxclub

                })
            }).then(() => {
                Player.findOne({ where: { id: `${min.Playerid}` } }).then(data => {
                    minclub = data.dataValues.club
                    clubdata.min_club = 'Liverpool'
                })
            }).then(() => {
                Player.findOne({ where: { id: `${secondmax.Playerid}` } }).then(data => {
                    secondmaxclub = data.dataValues.club
                    clubdata.secondmax_club = secondmaxclub

                    res.json(clubdata)
                })
            })

        }).catch(err => {
            console.log(err)
        })





});
router.route('/data').post((req, res) => {//THIS IS FOR REST CONDITIONS IN ASSIGNENT
    console.log("post");
    const { player_name, club_name, position, type } = req.body
    const data = {
        clubname: '',
        goals_scored: '',
        minutes_played: '',
        fouls_comitted: '',
        fouls_suffered: '',
        red_cards: '',
        yellow_cards: ''
    }
    const data2 = {
        TotalGoalsScored: '', TotalGoalsConceded: '', TotalGoalsSaved: '', TotalMatchesPlayed: '',
        TotalAssists: '',
        TopScorer: ''
    }
    const data3 = {
        Xaxis: [

        ],
        Yaxis: club_name


    }
    const maindata = {


        data4: {
            playernames: [],
            playergoals: [],
            other: []
        },
        data5: {
            Playername: [],
            playergoals: [],
            others: []

        },
        data6: {
            data_keeping: []
        }
    }
    if (player_name && !club_name && !position && !type) {
        var id;
        sequelize.sync({})
            .then(() => {
                Player.findOne({ where: { firstname: player_name } })
                    .then(Data => {
                        console.log(res)
                        data.clubname = Data.dataValues.club
                        id = Data.dataValues.id
                    }).then(() => {
                        console.log(id, "id")
                        playerkeystats.findOne({ where: { Playerid: `${id}` } })
                            .then(Data => {
                                console.log(Data, id, "Data")
                                data.goals_scored = Data.dataValues.goals
                            }).then(() => {
                                Playerdiscipline.findOne({ where: { Playerid: id } })
                                    .then(Data => {
                                        data.fouls_comitted = Data.dataValues.fouls_comitted
                                        data.fouls_suffered = Data.dataValues.fouls_suffered
                                        data.minutes_played = Data.dataValues.minutes_played
                                        data.red_cards = Data.dataValues.red
                                        data.yellow_cards = Data.dataValues.yellow
                                        res.json(data)
                                    }).catch(err => res.json(err))
                            })
                    })
            })


    }
    else if (!player_name && club_name && !position && !type) {

        const id = []
        let goals = 0
        let assists = 0
        let match_played = 0
        let saved = 0
        let concededs = 0
        sequelize.sync({})
            .then(() => {
                Player.findAll({ where: { club: club_name } })
                    .then(data => {
                        //console.log(data)
                        data.map(ids => id.push(ids.dataValues.id))
                    }).then(async () => {
                        // console.log(id, "ids")


                        Promise.all(id.map(async (ids) => {

                            await playerkeystats.findOne({ where: { Playerid: `${ids}` } })
                                .then((kdata) => {
                                    if (kdata !== null) {
                                        //console.log(kdata.dataValues, "data")
                                        goals += kdata?.dataValues.goals
                                        assists += kdata?.dataValues.assist
                                        match_played += kdata?.dataValues.matchplayed
                                        // console.log(kdata?.dataValues.assist, "assist")
                                        data2.TotalGoalsScored = goals
                                        data2.TotalAssists = assists
                                        data2.TotalMatchesPlayed = match_played
                                    }
                                })
                        })).then(() => {
                            console.log("yoy")

                            Promise.all(id.map(async (ids) => {

                                await Playergoalkeeping.findOne({ where: { Playerid: `${ids}` } })
                                    .then((kdata) => {
                                        if (kdata !== null) {
                                            //console.log(kdata.dataValues, "data")
                                            saved += kdata?.dataValues.saved
                                            concededs += kdata?.dataValues.conceded
                                            // console.log(kdata?.dataValues.assist, "assist")
                                            data2.TotalGoalsConceded = concededs
                                            data2.TotalGoalsSaved = saved
                                        }
                                    })
                            })).then(() => {
                                const goalsdata = []
                                var max;
                                Playerkeystats.findAll({
                                    order: [['goals']],
                                    attributes: ['Playerid', 'goals']
                                }).then((res) => {
                                    res.map((ti) => goalsdata.push(ti.dataValues))
                                    //   console.log(res, "min")
                                    max = goalsdata[goalsdata.length - 1]


                                }).then(() => {
                                    Player.findOne({ where: { id: `${max.Playerid}` } }).then(tdata => {
                                        data2.TopScorer = tdata.dataValues.firstname
                                        console.log(data2, "club")
                                        res.json(data2)

                                    })
                                }).catch(err => res.json(err))
                            })

                        })
                    })
            })


    }
    else if (!player_name && club_name && position && !type) {
        var player_ids = []
        var goal_data = []
        sequelize.sync({})
            .then(() => {
                Player.findAll({ where: { club: club_name } })
                    .then((response) => {
                        response.map(ids => player_ids.push(ids.dataValues.id))

                    }).then(async () => {

                        Promise.all(player_ids.map(async (ids) => {

                            await Playergoals.findOne({
                                where: { Playerid: `${ids}`, position: position },
                                attributes: ['position', 'goals']
                            })
                                .then((kdata) => {
                                    if (kdata !== null) {
                                        console.log(kdata.dataValues, "data")
                                        goal_data.push(kdata.dataValues)
                                    }
                                })

                        })).then(() => {
                            console.log(goal_data, "ggg")
                            data3.Xaxis = goal_data;
                        }).then(() => {
                            console.log(data3, "data3")
                            res.json(data3)
                        }).catch(err => res.json(err))
                    })

            })
    }
    else if (!player_name && club_name && !position && type) {
        var player_ids = []
        var names = []
        var otherdata = []
        var otherdata2 = []
        var otherdata3 = []
        var goals = []
        if (type == 'Attack' || type == 'Defence' || type == 'Goalkeeping') {
            sequelize.sync({})
                .then(() => {
                    Player.findAll({ where: { club: club_name } })
                        .then((response) => {
                            response.map(ids => {
                                names.push(ids.dataValues.firstname)
                                player_ids.push(ids.dataValues.id)
                            })

                        }).then(async () => {
                            maindata.data4.playernames = names
                            maindata.data5.Playername = names

                            Promise.all(player_ids.map(async (ids) => {

                                await PlayerAttacking.findOne({
                                    where: { Playerid: `${ids}` },
                                    attributes: ['assist', 'dribbles', 'corner_taken', 'offsides']
                                })
                                    .then((kdata) => {
                                        if (kdata !== null) {
                                            console.log(kdata.dataValues, "data")
                                            otherdata.push(kdata.dataValues)
                                        }
                                    })
                                await Playerdefending.findOne({
                                    where: { Playerid: `${ids}` },
                                    attributes: ['t_won', 't_lost', 'clearance', 'balls_recovered']
                                })
                                    .then((kdata) => {
                                        if (kdata !== null) {
                                            console.log(kdata.dataValues, "data")
                                            otherdata2.push(kdata.dataValues)
                                        }
                                    })
                                await Playergoalkeeping.findOne({
                                    where: { Playerid: `${ids}` },
                                    attributes: ['saved', 'conceded', 'cleansheets', 'punches_made']
                                })
                                    .then((kdata) => {
                                        if (kdata !== null) {
                                            console.log(kdata.dataValues, "data")
                                            otherdata3.push(kdata.dataValues)
                                        }
                                    })

                            })).then(() => {
                                maindata.data4.other = otherdata
                                maindata.data5.others = otherdata2
                                maindata.data6.data_keeping = otherdata3
                                Promise.all(player_ids.map(async (ids) => {

                                    await Playergoals.findOne({
                                        where: { Playerid: `${ids}` },
                                        attributes: ['goals']
                                    })
                                        .then((kdata) => {
                                            if (kdata !== null) {
                                                console.log(kdata.dataValues, "goals")
                                                goals.push(kdata.dataValues)
                                            }
                                        })

                                })).then(async () => {
                                    maindata.data4.playergoals = goals
                                    maindata.data5.playergoals = goals
                                    console.log(maindata, "data4")
                                    await new Promise((resolve) => resolve(res.json(maindata)))
                                }
                                ).catch(err => res.json(err))
                            })

                        })

                })
        } else {
            res.json("type is not crrect")
        }
    }


})

module.exports = router;
