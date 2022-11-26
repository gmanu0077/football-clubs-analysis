import { BarChart, Bar, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from "recharts"
export default function Bargraph(data) {


    return (
        <BarChart className="graph" width={730} height={250} data={data.data.Xaxis}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis data={data.data.Yaxis} />
            <YAxis dataKey="goals" />
            <Tooltip />
            <Legend />
            <Bar dataKey="goals" fill="#8884d8" />
        </BarChart>
    )
}