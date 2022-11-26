import { useEffect, useState } from 'react';
import './dashboard.css'
import Table from '../component/table';
import axios from 'axios';
import Bargraph from '../component/bargraph';
import Heatmap from '../component/heatmap';
function Dashboard() {
    const [player_name, setplayer_name] = useState(null)
    const [club_name, setclub_name] = useState(null)
    const [position, setposition] = useState(null)
    const [type, settype] = useState(null)
    const [Flag, setFlag] = useState(false)
    const [Tabledata, setTabledata] = useState([])
    const [bardata, setbardata] = useState([])
    const [graphdata, setgraphdata] = useState([])
    useEffect(() => {

        axios.get('http://localhost:5000').then(res => {
            console.log(res, "res")
            setTabledata(res.data)
        })

    }, [])

    const onChangep_name = (event) => {
        setplayer_name(event.target.value);
    };
    const onChangeC_name = (event) => {
        setclub_name(event.target.value);
    };
    const onChangeposition = (event) => {
        setposition(event.target.value);
    };
    const onChangetype = (event) => {
        settype(event.target.value);
    };


    const onSearchD = async () => {

        await axios.post('http://localhost:5000/data', {
            player_name: player_name,
            club_name: club_name,
            position: position,
            type: type
        }).then((res) => {
            console.log(res.data, "rere")

            if (club_name && position) {

                setbardata(res.data)
            }
            if (club_name && type) {
                console.log("iff")
                setgraphdata(res.data)

            }
            else setTabledata(res.data)

        }).then(() => {
            setFlag(true)

            console.log("search ", player_name, club_name, position, type, graphdata, Tabledata);
        })
            .catch((err) => { console.log(err) })

    };
    return (
        <div className="dashboard">

            <h1 className='center'>Dashboard</h1>
            <div className="search-container">
                <div className="search-inner ">

                    <div className='input'>
                        <input className="" type="text" value={player_name} onChange={onChangep_name} placeholder="player-name" />

                    </div>
                    <div className='input'>
                        <input className="" type="text" value={club_name} onChange={onChangeC_name} placeholder="club-name" />

                    </div>
                    <div className='input'>
                        <input className="" type="text" value={position} onChange={onChangeposition} placeholder="position" />

                    </div>
                    <div className='input'>
                        <input className="" type="text" value={type} onChange={onChangetype} placeholder="type" />

                    </div>
                    <button className="btn " onClick={() => onSearchD()}> search</button>
                </div>


            </div>
            <div className='display text'>
                {/* <Table data={Tabledata} /> */}
                {/* {club_name && position && Flag && <Bargraph data={bardata} />} */}
                {club_name && type && Flag && <Heatmap data={[1, 2, 3, 3]} />}
                <div>{JSON.stringify(graphdata)}</div>
            </div>

        </div>
    );
}

export default Dashboard;
