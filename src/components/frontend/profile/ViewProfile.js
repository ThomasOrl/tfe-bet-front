import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Navbar from "../../../layouts/frontend/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../../layouts/frontend/Footer";

function ViewProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);

  const Navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/displayprofile`).then((res) => {
      // console.log(res.data.profile);
      if (res.status === 200) {
        setProfile(res.data.profile);
      }
      setLoading(false);
    });
  }, []);

  const deleteProfile = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Suppression";

    axios.delete(`/api/deleteprofile/${id}`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Réussi", res.data.message, "success");

        Navigate("/");
      } else if (res.data.status === 404) {
        swal("Echec", res.data.message, "warning");
      }
    });
  };

  if (loading) {
    return (
      <div>
        <p>Loading Profile...</p>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <div className="container px-4 w-50">
          <div className="card mt-4">
            <div className="card-header bg-dark text-light text-center">
              <h4>Mon Profil</h4>
            </div>
            <div className="card-body bg-light">
              <div className="d-flex justify-content-center">
                <div className="d-block m-1 fw-bolder">
                  <p>Nom:</p>
                  <p>Email:</p>
                  <p>Solde:</p>
                </div>
                <div className=" d-block m-1">
                  <p>{profile.name}</p>
                  <p>{profile.email}</p>
                  <p className="text-warning">{profile.solde}€</p>
                </div>
              </div>
              <div className="text-end">
                <button
                  type="button"
                  onClick={(e) => deleteProfile(e, profile.id)}
                  className="btn btn-danger"
                >
                  Supprimer mon compte
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default ViewProfile;
