import "hammerjs";
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
import { useState } from "react";
const Charts = (data) => {
    const [attack, setattack] = useState(false)
    const [defence, setdefence] = useState(false)
    const [keeping, setkeeping] = useState(false)
    const ChartContainer = () => {
        return (
            <Chart>
                <ChartSeries>

                    {attack &&

                        data.data.slice(0, 5).map(it => {
                            return (
                                <ChartSeriesItem
                                    type="heatmap"
                                    color="#216e39"
                                    data={it}
                                    xField="xfield"
                                    yField="name_player"
                                    field="value"
                                />
                            )
                        })

                    }
                    {
                        defence &&
                        data.data.slice(5, 9).map(it => {
                            return (
                                <ChartSeriesItem
                                    type="heatmap"
                                    color="#0000FF"
                                    data={it}
                                    xField="xfield"
                                    yField="name_player"
                                    field="value"
                                />
                            )
                        })

                    }
                    {
                        keeping &&
                        data.data.slice(9, 12).map(it => {
                            return (
                                <ChartSeriesItem
                                    type="heatmap"
                                    color="#FF0000"
                                    data={it}
                                    xField="xfield"
                                    yField="name_player"
                                    field="value"
                                />
                            )
                        })

                    }

                </ChartSeries>
            </Chart>
        );
    };
    //CLICK ON BUTTONS TO SEE THE MAPS
    return (
        <>
            <div className="chart">
                <button className="btn green " onClick={() => {
                    setattack(true)
                    setdefence(false)
                    setkeeping(false)
                }}>attack</button>
                <button className="btn blue " onClick={() => {
                    setdefence(true)
                    setattack(false)
                    setkeeping(false)
                }}>defence</button>
                <button className="btn red " onClick={() => {
                    setkeeping(true)
                    setattack(false)
                    setdefence(false)
                }} >keeping</button>
                {<ChartContainer />}
            </div>
        </>
    )
}
export default Charts;