import { useEffect, useState } from 'react';
import './dashboard.css'
import Table from '../component/table';
function Dashboard() {
    const [player_name, setplayer_name] = useState(null)
    const [club_name, setclub_name] = useState(null)
    const [position, setposition] = useState(null)
    const [type, settype] = useState(null)
    const [Tabledata, setTabledata] = useState([])
    useEffect(() => {

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


    const onSearchD = () => {



        console.log("search ", player_name, club_name, position, type);
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
            <div className='display'>
                <Table data={Tabledata} />

            </div>

        </div>
    );
}

export default Dashboard;
