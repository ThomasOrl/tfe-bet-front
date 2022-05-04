import axios from "axios";
import React, { useEffect, useState } from "react";


function ViewProfile(){
    const[loading, setLoading] = useState(true);
    const[profile, setProfile] = useState([]);

    useEffect(()=>{
        axios.get(`/api/displayprofile`).then(res=>{
            console.log(res.data.profile);
            if(res.status === 200)
            {
                setProfile(res.data.profile)
            }
            setLoading(false);
        });
    },[]);

    var viewprofile_HTMLTABLE ="";
    if(loading){
        return <h4>Loading Profile...</h4>
    }else{
        viewprofile_HTMLTABLE =
        profile.map((item,i)=>{
            return (
                    <tr key={i}>
                        <td>{item.profile.name}</td>
                        <td>{item.profile.email}</td>
                        <td>{item.profile.solde}</td>
                    </tr>
            )
        });
    }


    return(
        <div>
            <div className="container px-4">
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>Mon Profil</h4>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <tbody>
                                {viewprofile_HTMLTABLE}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ViewProfile;