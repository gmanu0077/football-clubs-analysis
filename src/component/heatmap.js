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
        console.log(data, "init")
        setchartdata(data)
        // const mapdata = []
        // const attackdata = {
        //     name: [], goals: [], assists: [], corners: [], offsides: [], dribbles: []
        // }
        // const defencedata = {
        //     goals: [], tackles_won: [], tackles_lost: [], clearance_attemtps: [], balls_recovered: []

        // }
        // const goalkeeping = {
        //     saved: [], conceded: [], clean_sheets: [], punches: []
        // }

        // console.log(data.data.data4, "dad")
        // if (data.data.data4) {
        //     attackdata.goals = data.data.data4?.playergoals
        //     defencedata.goals = data.data.data4?.playergoals
        //     data.data.data4.other.map((Adata) => {
        //         console.log(Adata.assist, "atdad")
        //         attackdata.assists.push(Adata.assist)
        //         attackdata.corners.push(Adata.corner_taken)
        //         attackdata.dribbles.push(Adata.dribbles)
        //         attackdata.offsides.push(Adata.offsides)
        //         attackdata.name.push(Adata.playernames)
        //     })
        //     data.data.data5.others.map((Ddata) => {
        //         defencedata.tackles_won.push(Ddata.t_won)
        //         defencedata.tackles_lost.push(Ddata.t_lost)
        //         defencedata.clearance_attemtps.push(Ddata.clearance)
        //         defencedata.balls_recovered.push(Ddata.balls_recovered)
        //         defencedata.name.push(Ddata.playernames)
        //     })
        //     data.data.data6.data_keeping.map((Gdata) => {
        //         goalkeeping.clean_sheets.push(Gdata.cleansheets)
        //         goalkeeping.saved.push(Gdata.saved)
        //         goalkeeping.punches.push(Gdata.punches_made)
        //         goalkeeping.conceded.push(Gdata.conceded)
        //     })
        //     console.log(attackdata.goals, goalkeeping.clean_sheets, "map")
        //     attackdata.goals.forEach(item => {
        //         console.log(item, "item")
        //         const data = {
        //             name_player: attackdata.playernames[item],
        //             goals: attackdata.goals[item]
        //         }
        //         mapdata.push(data)
        //     })
        //     setchartdata(mapdata)
        // }
    }
    useEffect(() => {
        // setchartdata(data)
        getdata()
    }, [])

    // function putdata() {
    //     console.log(attackdata, "fff")
    //     attackdata.goals.forEach(item => {
    //         console.log(item)
    //         const data = {
    //             name_player: attackdata.playernames[item],
    //             goals: attackdata.goals[item]
    //         }
    //         mapdata.push(data)
    //     })
    //     console.log(mapdata, "mapdata")
    //     //setchartdata(mapdata)
    // }

    return (
        <>
           <Charts data={chartdata} />
        </>
    )

}

export default Heatmap