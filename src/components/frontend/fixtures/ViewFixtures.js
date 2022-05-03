import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ViewFixtures(){
    const[loading, setLoading] = useState(true);
    const[fixturelist, setFixtureList] = useState([]);

    useEffect(()=>{
        axios.get(`/api/displayfixture`).then(res=>{
            console.log(res.data.fixture);
            if(res.status === 200)
            {
                setFixtureList(res.data.fixture)
            }
            setLoading(false);
        });
    },[]);

    var viewfixture_HTMLTABLE ="";
    if(loading){
        return <h4>Loading matchs...</h4>
    }else{
        viewfixture_HTMLTABLE =
        fixturelist.map((item,i)=>{
            return (
                    <tr key={i}>
                        <td>{item.equipe_home.name}</td>
                        <td>{item.equipe_exterieur.name}</td>
                        <td>{item.dateDebut}</td>
                    </tr>
            )
        });
    }


    return(
        <div>
            <div className="container px-4">
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>Liste Matchs</h4>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <tbody>
                                {viewfixture_HTMLTABLE}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ViewFixtures;