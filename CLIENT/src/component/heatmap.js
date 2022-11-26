import './heatmap.css'
import "hammerjs";
import { useState, useEffect } from 'react';
import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartXAxis,
    ChartXAxisItem,
    ChartYAxis,
    ChartYAxisItem,
} from "@progress/kendo-react-charts";
import Charts from './heatmap-chart';
function Heatmap(data) {
    const [chartdata, setchartdata] = useState([])

    function getdata() {
        const mapdata = []
        const attackdata = {
            name: [], goals: [], assists: [], corners: [], offsides: [], dribbles: []
        }
        const defencedata = {
            name: [], goals: [], tackles_won: [], tackles_lost: [], clearance_attemtps: [], balls_recovered: []

        }
        const goalkeeping = {
            saved: [], conceded: [], clean_sheets: [], punches: []
        }
        const Gdata = []
        const Adata = []
        const Cdata = []
        const Ddata = []
        const Odata = []
        const Twon = []
        const Tlost = []
        const attempt = []
        const recovered = []
        const saved = []
        const conceded = []
        const sheets = []
        const punches = []
        if (data.data.data4) {
            attackdata.goals = data.data.data4?.playergoals
            defencedata.goals = data.data.data4?.playergoals
            attackdata.name = data.data.data4?.playernames
            defencedata.name = data.data.data5?.Playername
            data.data.data4.other.map((Adata) => {
                attackdata.assists.push(Adata.assist)
                attackdata.corners.push(Adata.corner_taken)
                attackdata.dribbles.push(Adata.dribbles)
                attackdata.offsides.push(Adata.offsides)

            })
            data.data.data5.others.map((Ddata) => {
                defencedata.tackles_won.push(Ddata.t_won)
                defencedata.tackles_lost.push(Ddata.t_lost)
                defencedata.clearance_attemtps.push(Ddata.clearance)
                defencedata.balls_recovered.push(Ddata.balls_recovered)
            })
            data.data.data6.data_keeping.map((Gdata) => {
                goalkeeping.clean_sheets.push(Gdata.cleansheets)
                goalkeeping.saved.push(Gdata.saved)
                goalkeeping.punches.push(Gdata.punches_made)
                goalkeeping.conceded.push(Gdata.conceded)
            })
            var item, goal, assist, corner, dribble, offside
            for (item = 0; item < attackdata.goals.length; item++) {

                goal = {
                    name_player: attackdata.name[item],
                    value: attackdata.goals[item].goals,
                    xfield: "goals"
                }
                assist = {
                    name_player: attackdata.name[item],
                    value: attackdata.assists[item],
                    xfield: "assists"
                }
                corner = {
                    name_player: attackdata.name[item],
                    value: attackdata.corners[item],
                    xfield: "corners"
                }
                dribble = {
                    name_player: attackdata.name[item],
                    value: attackdata.dribbles[item],
                    xfield: "dribbles"
                }
                offside = {
                    name_player: attackdata.name[item],
                    value: attackdata.offsides[item],
                    xfield: "offsides"
                }

                Gdata.push(goal)
                Adata.push(assist)
                Cdata.push(corner)
                Ddata.push(dribble)
                Odata.push(offside)
            }
            for (item = 0; item < defencedata.goals.length; item++) {

                var goal = {
                    name_player: defencedata.name[item],
                    value: defencedata.goals[item].goals,
                    xfield: "goals"
                }
                var T_won = {
                    name_player: defencedata.name[item],
                    value: defencedata.tackles_won[item],
                    xfield: "twon"
                }
                var T_lost = {
                    name_player: defencedata.name[item],
                    value: defencedata.tackles_lost[item],
                    xfield: "tlost"
                }
                var clearance = {
                    name_player: defencedata.name[item],
                    value: defencedata.clearance_attemtps[item],
                    xfield: "clearance"
                }
                var recover = {
                    name_player: defencedata.name[item],
                    value: defencedata.balls_recovered[item],
                    xfield: "recovered"
                }

                Twon.push(T_won)
                Tlost.push(T_lost)
                attempt.push(clearance)
                recovered.push(recover)
            }
            for (item = 0; item < goalkeeping.saved.length; item++) {


                var save = {
                    name_player: defencedata.name[item],
                    value: goalkeeping.saved[item],
                    xfield: "saves"
                }
                var conced = {
                    name_player: defencedata.name[item],
                    value: goalkeeping.conceded[item],
                    xfield: "conceded"
                }
                var cleansheet = {
                    name_player: defencedata.name[item],
                    value: goalkeeping.clean_sheets[item],
                    xfield: "clean"
                }
                var Punch = {
                    name_player: defencedata.name[item],
                    value: goalkeeping.punches[item],
                    xfield: "punch"
                }

                saved.push(save)
                conceded.push(conced)
                sheets.push(cleansheet)
                punches.push(Punch)
            }



            mapdata.push(Gdata, Adata, Cdata, Ddata, Odata, Twon, Tlost, attempt, recovered, saved, conceded, sheets, punches)
            setchartdata(mapdata)
        }
    }
    useEffect(() => {
        getdata()
    }, [data])



    return (
        <>
            {<Charts data={chartdata} />}
        </>
    )

}

export default Heatmap