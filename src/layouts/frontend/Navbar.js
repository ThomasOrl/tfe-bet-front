import axios from "axios";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import swal from "sweetalert";

function Navbar(){

    const Navigate = useNavigate();

    const logoutSubmit = (e) =>{
        e.preventDefault();

        axios.post(`/api/logout`).then(res =>{
            if(res.data.status === 200){
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Succes", res.data.message, "succes");
                Navigate("/");
            }

        });
    }

    var AuthButtons = '';
    if(!localStorage.getItem('auth_token')){
        AuthButtons = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>
        );
    }else{
        AuthButtons = (
            <ul className="navbar-nav">

                <li className="nav-item">
                    <Link className="nav-link" to='/profile'>{localStorage.getItem('auth_name')}</Link>
                </li>
                <li className="nav-item">
                    <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white" >Logout</button>
                </li>
                
            </ul>
        );

    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
            <div className="container">

                <Link className="navbar-brand" to="/">BetProject</Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {AuthButtons}
                        
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;