import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Navbar from "../../../layouts/frontend/Navbar";
import {useNavigate} from "react-router-dom";


function ProfileData(){
    const[loading, setLoading] = useState(true);
    const[profile, setProfile] = useState([]);

    const Navigate = useNavigate();

    useEffect(()=>{
        axios.get(`/api/displayprofile`).then(res=>{
            // console.log(res.data.profile);
            if(res.status === 200)
            {
                setProfile(res.data.profile)
            }
            setLoading(false);
        });
    },[]);

    const deleteProfile = (e, id) =>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/deleteprofile/${id}`).then(res=>{

            if(res.data.status === 200){
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Succes",res.data.message,"succes");
                
                Navigate("/");

            }else if(res.data.status === 404){
                swal("Succes",res.data.message,"succes");
            }
        });
    }

    if(loading){
        return (
            <tr>
                <td>Loading Profile...</td>
            </tr>
            )
    }else{
        return (
            <tr>
                <td>{profile.id}</td>
                <td>{profile.name}</td>
                <td>{profile.email}</td>
                <td>{profile.solde}</td>
                <td>
                    <button type="button" onClick={(e)=> deleteProfile(e, profile.id)} className="btn btn-danger">Delete my Account</button>
                </td>
            </tr>
        ) 
    }
}

function ViewProfile(){


    return(
        <div>
            <Navbar/>
            <div className="container px-4">
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>Mon Profil</h4>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <td>id</td>
                                    <td>Nom</td>
                                    <td>Email</td>
                                    <td>Solde</td>
                                </tr>
                            </thead>
                            <tbody>
                                <ProfileData/>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ViewProfile;