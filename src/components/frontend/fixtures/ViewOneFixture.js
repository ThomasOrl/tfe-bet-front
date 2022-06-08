import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../layouts/frontend/Navbar";
import Button from "@mui/material";

function ViewOneFixtureData(){

    const [loading, setLoading] = useState(true);
    const [fixture, setFixture] = useState();
    const [odds, setOdds] = useState();
    const [startCount, setStartCount] = useState(false)
    const [seconds, setSeconds] = useState(0);
    const [disable, setDisable] = useState(true)

    const {id} = useParams();
    useEffect(()=>{
        
        axios.get(`/api/displayonefixture/${id}`).then(res=>{
            if(res.status === 200)
            {
                setFixture(res.data.fixture)
                setOdds({
                    home: res.data.fixture.cote[0].cote,
                    away: res.data.fixture.cote[1].cote,
                })
            }
            setLoading(false);
        });
    },[]);

    // Timer 
    useEffect(() => {
        if (startCount){
            const interval = setInterval(() => {
                setSeconds(seconds =>  seconds + 1)
                setDisable(false)
                if (seconds === 9){
                    setStartCount(false)
                    setSeconds(0)
                    setDisable(true)
                }
            }, 1000)
            return () => clearInterval(interval)
        }
        
    },[startCount, seconds])
    
    
    const addOneGoalHome = ()=>{
        let addGoalEl = document.getElementById('scoreHome');
        let scoreHome = addGoalEl.innerHTML;
        ++ scoreHome;
        document.getElementById('scoreHome').innerHTML = scoreHome;
        
        setOdds((prevState) => ({...prevState, home: (prevState.home * 0.8).toFixed(2)}))
        
    }

    const addOneGoalExt = ()=>{
        let addGoalEl = document.getElementById('scoreExt');
        let scoreExt = addGoalEl.innerHTML;
        ++ scoreExt;
    
        document.getElementById('scoreExt').innerHTML = scoreExt;

        setOdds((prevState) => ({...prevState, away: (prevState.away * 0.8).toFixed(2)}))
    }

    if(loading){
        return (
            <tbody>
                <tr>
                    <td>Loading Match selected...</td>
                </tr>
            </tbody>
            )
    }else{
        
        return (
            <tbody>
                <tr>
                    <td>{fixture.equipe_home.name}</td>
                    
                    <td>{fixture.equipe_exterieur.name}</td>
                    
                    <td>{fixture.dateDebut}</td>
                </tr> 
                <tr>
                    <td>
                        <button className="btn btn-warning">{odds.home}</button>
                    </td>
                    <td>
                        <button className="btn btn-warning">{odds.away}</button>
                    </td>
                    
                </tr>
                <tr className="bg-dark text-light">
                    <td>Score Home</td>
                    <td>Score Exterieur</td>
                </tr>
                <tr>
                    <td id="scoreHome">0</td>
                    <td id="scoreExt">0</td>
                    <td>
                        <button id="counter" onClick={() => setStartCount(true)} className="btn btn-primary">{seconds > 0 ? seconds : "Start"}</button>
                        <button disabled={disable} id="button-home" onClick={addOneGoalHome} className="btn btn-primary m-1">Score Home +1</button>
                        <button disabled={disable} id="button-ext" onClick={addOneGoalExt} className="btn btn-primary m-1">Score Exterieur +1</button>
                    </td>
                    
                </tr>
            </tbody>    
        )  
    }
}

function ViewOneFixture(){
    return(
        <div>
            <Navbar/>
            <div className="container px-4">
                <div className="card mt-4">
                    <div className="card-header bg-dark text-light">
                        <h4>Match Selectionné</h4>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered text-center">
                            <thead className="bg-dark text-light">
                                <tr>
                                    <td>Equipe Domicile</td>
                                    <td>Equipe Exterieur</td>
                                    <td>Date</td>
                                </tr>
                            </thead>

                            <ViewOneFixtureData/>
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
    
export default ViewOneFixture;





