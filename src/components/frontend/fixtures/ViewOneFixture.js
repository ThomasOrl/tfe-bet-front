import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../layouts/frontend/Navbar";

function ViewOneFixtureData(){

    const[loading, setLoading] = useState(true);
    const[fixture, setFixture] = useState([]);
    const {id} = useParams();
    useEffect(()=>{
        
        axios.get(`/api/displayonefixture/${id}`).then(res=>{
            console.log(res.data.fixture);
            if(res.status === 200)
            {
                setFixture(res.data.fixture)
            }
            setLoading(false);
        });
    },[]);
    
    // Timer 
    const startCountdown = () =>{
        let counter = 9;
        const countDownEl = document.getElementById('counter');   

            const interval = setInterval(() => {
            // console.log(counter);
            
            countDownEl.innerHTML = `Time : ${counter}`;
            counter--;
                
            if (counter < 0 ) {
                clearInterval(interval);
                countDownEl.innerHTML = `Time is Over`;
                // console.log('Stop !');
            }
            }, 1000);
    }
    
    const addOneGoalHome = ()=>{
        let addGoalEl = document.getElementById('scoreHome');
        let scoreHome = addGoalEl.innerHTML;
        ++ scoreHome;

        document.getElementById('scoreHome').innerHTML = scoreHome;
    }

    const addOneGoalExt = ()=>{
        let addGoalEl = document.getElementById('scoreExt');
        let scoreExt = addGoalEl.innerHTML;
        ++ scoreExt;
    
        document.getElementById('scoreExt').innerHTML = scoreExt;
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
                        <button className="btn btn-warning">{fixture.cote[0].cote}</button>
                    </td>
                    <td>
                        <button className="btn btn-warning">{fixture.cote[1].cote}</button>
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
                        <button id="counter" onClick={startCountdown} className="btn btn-primary">Start</button>
                        <button onClick={addOneGoalHome} className="btn btn-primary m-1">Score Home +1</button>
                        <button onClick={addOneGoalExt} className="btn btn-primary m-1">Score Exterieur +1</button>
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





