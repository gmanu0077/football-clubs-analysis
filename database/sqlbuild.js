const csv = require('csv-parser')
const fs = require('fs');



async function getdata() {

    const sequelize = await require("./util/database");
    const Playerattempts = await require('./model/attempts_schema')
    const Playerdistribution = await require('./model/distribution_schema')
    const Playergoalkeeping = await require('./model/goalkeeping_schema')
    const playergoals = await require('./model/goals_schema')
    const playerkeystats = await require('./model/keystats_schema')
    const Player = await require("./model/player_schema");

    const Playerdiscipline = await require("./model/disciplinary_schema");
    const Playerdefending = await require("./model/defending_schema");
    const PlayerAttacking = await require("./model/attacking_schema");


    const attacking = []
    const attempts = []
    const defending = []
    const disciplinary = []
    const distribution = []
    const goalkeeping = []
    const goals = []
    const keystats = []


    await new Promise((resolve, reject) => {
        fs.createReadStream('../csv-files/attacking.csv')
            .pipe(csv({}))
            .on('data', (data) => resolve(attacking.push(data)))
    }
    )

    await new Promise((resolve, reject) => {
        fs.createReadStream('../csv-files/attempts.csv')
            .pipe(csv({}))
            .on('data', (data) => resolve(attempts.push(data)))
    })

    await new Promise((resolve, reject) => {
        fs.createReadStream('../csv-files/defending.csv')
            .pipe(csv({}))
            .on('data', (data) => resolve(defending.push(data)))
    })

    await new Promise((resolve, reject) => {
        fs.createReadStream('../csv-files/disciplinary.csv')
            .pipe(csv({}))
            .on('data', (data) => resolve(disciplinary.push(data)))
    })

    await new Promise((resolve, reject) => {
        fs.createReadStream('../csv-files/distributon.csv')
            .pipe(csv({}))
            .on('data', (data) => resolve(distribution.push(data)))
    })

    await new Promise((resolve, reject) => {
        fs.createReadStream('../csv-files/goalKeeping.csv')
            .pipe(csv({}))
            .on('data', (data) => resolve(goalkeeping.push(data)))
    })

    await new Promise((resolve, reject) => {
        fs.createReadStream('../csv-files/goals.csv')
            .pipe(csv({}))
            .on('data', (data) => { resolve(goals.push(data)) })
    })

    await new Promise((resolve, reject) => {
        fs.createReadStream('../csv-files/Key_stats.csv')
            .pipe(csv({}))
            .on('data', (data) => resolve(keystats.push(data)))
    })


    //sql queries start


    await new Promise((resolve) => {
        resolve(
            sequelize
                .sync({ force: true })
        )
    })

    await sequelize
        .sync({})
        .catch(err => console.log(err))

        .then(Promise.all(
            keystats.map(async (name) => {
                if (name.player_name.split(' ').length > 1)
                    return await new Promise((resolve, reject) => { resolve(Player.create({ firstname: `${name.player_name.split(' ').slice(0, -1).join(' ')}`, lastname: `${name.player_name.split(' ').slice(-1).join(' ')}`, club: `${name.club}` })) })
                else return await new Promise((resolve, reject) => { resolve(Player.create({ firstname: `${name.player_name}`, lastname: "", club: `${name.club}` })) })
            })

        ).then(() => {

            goals.map(async (player) => {

                if (player.player_name.split(' ').length > 1) {

                    await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(0, -1).join(' ') } })
                        .then(async (data) => {
                            if (data.dataValues) {
                                return await new Promise((resolve, reject) => {
                                    playergoals.create({

                                        position: `${player.position}`, goals: `${player.goals}`, right_foot: `${player.right_foot}`,
                                        left_foot: `${player.left_foot}`, header: `${player.headers}`, others: `${player.others}`, inside_area: `${player.inside_area}`,
                                        outside_area: `${player.outside_areas}`, penalties: `${player.penalties}`,
                                        matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                    });
                                })
                            }
                        })

                } else {

                    await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(-1).join(' ') }, })
                        .then(async (data) => {

                            if (data.dataValues) {
                                return await new Promise((resolve, reject) => {
                                    playergoals.create({

                                        position: `${player.position}`, goals: `${player.goals}`, right_foot: `${player.right_foot}`,
                                        left_foot: `${player.left_foot}`, header: `${player.headers}`, others: `${player.others}`, inside_area: `${player.inside_area}`,
                                        outside_area: `${player.outside_areas}`, penalties: `${player.penalties}`,
                                        matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                    });
                                })
                            }
                        })
                }
            })
        })
            .then(() => {
                keystats.map(async (player) => {

                    if (player.player_name.split(' ').length > 1) {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(0, -1).join(' ') } })
                            .then(async (data) => {
                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        let distance_covered;
                                        if (player.distance_covered == '-') distance_covered = null;
                                        else distance_covered = player.distance_covered
                                        resolve(playerkeystats.create({
                                            position: `${player.position}`, minutes_played: `${player.minutes_played}`,
                                            matchplayed: `${player.match_played}`, goals: `${player.goals}`, assist: `${player.assists}`, distance_covered: `${distance_covered}`,
                                            Playerid: `${data.dataValues.id}`
                                        })
                                        )
                                    })
                                }
                            })

                    } else {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(-1).join(' ') }, })
                            .then(async (data) => {

                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        resolve(playerkeystats.create({

                                            position: `${player.position}`, minutes_played: `${player.minutes_played}`,
                                            matchplayed: `${player.match_played}`, goals: `${player.goals}`, assist: `${player.assists}`, distance_covered: `${player.distance_covered}`, Playerid: `${data.dataValues.id}`
                                        }))
                                    })
                                }
                            })
                    }
                })
            })

            .then(() => {
                goalkeeping.map(async (player) => {

                    if (player.player_name.split(' ').length > 1) {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(0, -1).join(' ') } })
                            .then(async (data) => {
                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        resolve(Playergoalkeeping.create({
                                            position: `${player.position}`, saved: `${player.saved}`, conceded: `${player.conceded}`, saved_penalties: `${player.saved_penalties}`, cleansheets: `${player.cleansheets}`,
                                            punches_made: `${player.punches_made}`,
                                            matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                        })
                                        )
                                    })
                                }
                            })

                    } else {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(-1).join(' ') }, })
                            .then(async (data) => {

                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        resolve(Playergoalkeeping.create({

                                            position: `${player.position}`, saved: `${player.saved}`, conceded: `${player.conceded}`, saved_penalties: `${player.saved_penalties}`, cleansheets: `${player.cleansheets}`,
                                            punches_made: `${player.punches_made}`,
                                            matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                        }))
                                    })
                                }
                            })
                    }
                })
            })
            .then(() => {
                distribution.map(async (player) => {

                    if (player.player_name.split(' ').length > 1) {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(0, -1).join(' ') } })
                            .then(async (data) => {
                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        resolve(Playerdistribution.create({
                                            position: `${player.position}`, saved: `${player.saved}`, pass_accuracy: `${player.pass_accuracy}`, pass_attempted: `${player.pass_attempted}`, pass_completed: `${player.pass_completed}`,
                                            cross_accuracy: `${player.cross_accuracy}`, cross_attempted: `${player.cross_attempted}`, cross_completed: `${player.cross_completed}`,
                                            freekicks_taken: `${player.freekicks_taken}`, matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                        })
                                        )
                                    })
                                }
                            })

                    } else {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(-1).join(' ') }, })
                            .then(async (data) => {

                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        resolve(Playerdistribution.create({

                                            position: `${player.position}`, saved: `${player.saved}`, pass_accuracy: `${player.pass_accuracy}`, pass_attempted: `${player.pass_attempted}`, pass_completed: `${player.pass_completed}`,
                                            cross_accuracy: `${player.cross_accuracy}`, cross_attempted: `${player.cross_attempted}`, cross_completed: `${player.cross_completed}`,
                                            freekicks_taken: `${player.freekicks_taken}`, matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                        }))
                                    })
                                }
                            })
                    }
                })
            })
            .then(() => {
                disciplinary.map(async (player) => {

                    if (player.player_name.split(' ').length > 1) {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(0, -1).join(' ') } })
                            .then(async (data) => {
                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        resolve(Playerdiscipline.create({
                                            position: `${player.position}`, fouls_comitted: `${player.fouls_committed}`, fouls_suffered: `${player.fouls_suffered}`, red: `${player.red}`, yellow: `${player.yellow}`,
                                            minutes_played: `${player.minutes_played}`, matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                        })
                                        )
                                    })
                                }
                            })

                    } else {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(-1).join(' ') }, })
                            .then(async (data) => {

                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        resolve(Playerdiscipline.create({

                                            position: `${player.position}`, fouls_comitted: `${player.fouls_committed}`, fouls_suffered: `${player.fouls_suffered}`, red: `${player.red}`, yellow: `${player.yellow}`,
                                            minutes_played: `${player.minutes_played}`, matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                        }))
                                    })
                                }
                            })
                    }
                })
            })
            .then(() => {
                defending.map(async (player) => {

                    if (player.player_name.split(' ').length > 1) {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(0, -1).join(' ') } })
                            .then(async (data) => {
                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        resolve(Playerdefending.create({
                                            position: `${player.position}`, balls_recovered: `${player.balls_recovered}`, tackles: `${player.tackles}`, t_won: `${player.t_won}`, t_lost: `${player.t_lost}`,
                                            clearance: `${player.clearance_attempted}`, matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                        })
                                        )
                                    })
                                }
                            })

                    } else {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(-1).join(' ') }, })
                            .then(async (data) => {

                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        resolve(Playerdefending.create({

                                            position: `${player.position}`, balls_recovered: `${player.balls_recovered}`, tackles: `${player.tackles}`, t_won: `${player.t_won}`, t_lost: `${player.t_lost}`,
                                            clearance: `${player.clearance_attempted}`, matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                        }))
                                    })
                                }
                            })
                    }
                })
            })
            .then(() => {
                attempts.map(async (player) => {

                    if (player.player_name.split(' ').length > 1) {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(0, -1).join(' ') } })
                            .then(async (data) => {
                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        resolve(Playerattempts.create({
                                            position: `${player.position}`, total_attempts: `${player.total_attempts}`, on_target: `${player.on_target}`, off_target: `${player.off_target}`, blocked: `${player.blocked}`,
                                            matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                        })
                                        )
                                    })
                                }
                            })

                    } else {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(-1).join(' ') }, })
                            .then(async (data) => {

                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        resolve(Playerattempts.create({

                                            position: `${player.position}`, total_attempts: `${player.total_attempts}`, on_target: `${player.on_target}`, off_target: `${player.off_target}`, blocked: `${player.blocked}`,
                                            matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                        }))
                                    })
                                }
                            })
                    }
                })
            })

            .then(() => {
                attacking.map(async (player) => {

                    if (player.player_name.split(' ').length > 1) {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(0, -1).join(' ') } })
                            .then(async (data) => {
                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        resolve(PlayerAttacking.create({
                                            position: `${player.position}`, assist: `${player.assists}`, corner_taken: `${player.corner_taken}`, offsides: `${player.offsides}`, dribbles: `${player.dribbles}`,
                                            matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                        })
                                        )
                                    })
                                }
                            })

                    } else {

                        await Player.findOne({ where: { firstname: player.player_name.split(' ').slice(-1).join(' ') }, })
                            .then(async (data) => {

                                if (data.dataValues) {
                                    return await new Promise((resolve, reject) => {
                                        resolve(PlayerAttacking.create({

                                            position: `${player.position}`, assist: `${player.assists}`, corner_taken: `${player.corner_taken}`, offsides: `${player.offsides}`, dribbles: `${player.dribbles}`,
                                            matchplayed: `${player.match_played}`, Playerid: `${data.dataValues.id}`
                                        }))
                                    })
                                }
                            })
                    }
                })
            })

        )



        .catch((err) => {
            console.log(err);
        });
}

getdata()

