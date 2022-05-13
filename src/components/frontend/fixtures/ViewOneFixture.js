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
    
    // Cotes aleatoires 

    let oddsHome = (Math.random() * (3.00 - 1.00 + 1.00) + 1.00).toFixed(2);
    let oddsAway = (Math.random() * (3.00 - 1.00 + 1.00) + 1.00).toFixed(2);

    
    if(loading){
        return (
            <tr>
                <td>Loading Match selected...</td>
            </tr>
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
                        <button className="btn btn-warning">{oddsHome}</button>
                    </td>
                    <td>
                        <button className="btn btn-warning">{oddsAway}</button>
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
                            <thead>
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





