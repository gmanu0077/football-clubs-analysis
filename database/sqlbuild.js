const sequelize = require("./util/database");
const playerattacks = require('./model/attacking_schema')
const playerattempts = require('./model/attempts_schema')
const playerdefending = require('./model/defending_schema')
const playerdisciplinary = require('./model/disciplinary_schema')
const playerdistribution = require('./model/distribution_schema')
const Playergoalkeeping = require('./model/goalkeeping_schema')
const playergoals = require('./model/goals_schema')
const playerkeystats = require('./model/keystats_schema')
const Player = require("./model/player_schema");
const csv = require('csv-parser')
const fs = require('fs')

const attacking = []
const attempts = []
const defending = []
const disciplinary = []
const distribution = []
const goalkeeping = []
const goals = []
const keystats = []

function getgoals() {
    return new Promise((resolve, reject) => {
        fs.createReadStream('../csv-files/goals.csv')
            .pipe(csv({}))
            .on('data', (data) => { resolve(goals.push(data)) })
    })
}

async function getdata() {

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

    await getgoals()

    await new Promise((resolve, reject) => {
        fs.createReadStream('../csv-files/Key_stats.csv')
            .pipe(csv({}))
            .on('data', (data) => resolve(keystats.push(data)))
    })


    //sql queries start

    Player.hasOne(playergoals);

    sequelize
        .sync({ force: true })

        .then(() => {
            keystats.map(name => {
                if (name.player_name.split(' ').length > 1)
                    return Player.create({ firstname: `${name.player_name.split(' ').slice(0, -1).join(' ')}`, lastname: `${name.player_name.split(' ').slice(-1).join(' ')}`, club: `${name.club}` })
                else return Player.create({ firstname: `${name.player_name}`, lastname: "", club: `${name.club}` })
            })

        })
        .then(() => {

            // goals.map((player) => {
            let id = ""
            //if (player.player_name.split(' ').length > 1) {

            Player.findOne({ where: { firstname: 'Aaronson' } })
                .then((data) => {
                    //    if (!data) return
                    id = JSON.stringify(data?.dataValues.id);
                    console.log(data, "nnnnnnnnn.......");

                    // return playergoals.create({

                    //     position: `${player.position}`, goals: `${player.goals}`, right_foot: `${player.right_foot}`,
                    //     left_foot: `${player.left_foot}`, header: `${player.headers}`, others: `${player.others}`, inside_area: `${player.inside_area}`,
                    //     outside_area: `${player.outside_areas}`, penalties: `${player.penalties}`,
                    //     matchplayed: `${player.match_played}`, Playerid: id
                    // });

                })

            // } else {

            //     Player.findOne({ where: { firstname: player.player_name.split(' ').slice(-1).join(' ') }, })
            //         .then((data) => {
            //             if (!data) return
            //             console.log(data?.dataValues.id, "nnnnnnnnn.......");
            //             id = JSON.stringify(data?.dataValues.id);

            //             return playergoals.create({

            //                 position: `${player.position}`, goals: `${player.goals}`, right_foot: `${player.right_foot}`,
            //                 left_foot: `${player.left_foot}`, header: `${player.headers}`, others: `${player.others}`, inside_area: `${player.inside_area}`,
            //                 outside_area: `${player.outside_areas}`, penalties: `${player.penalties}`,
            //                 matchplayed: `${player.match_played}`, Playerid: id
            //             });

            //         })
            // }







            // })
        })
        // .then(() => {

        //     keystats.map((player) => {
        //         return playerkeystats.create({
        //             position: `${player.position}`, minutes_played: `${player.minutes_played}`,
        //             matchplayed: `${player.match_played}`, goals: `${player.goals}`, assist: `${player.assists}`, distance_covered: `${player.distance_covered}`
        //         });
        //     })

        // })

        // .then(orders => {
        //     console.log("All the Orders are : ", orders);
        // })
        .catch((err) => {
            console.log(err);
        });
}
getdata()

