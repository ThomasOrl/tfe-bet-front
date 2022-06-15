import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Modale({ closeModale, odds, team, fixture }) {
  const Navigate = useNavigate();
  const modalStyle = {
    display: "block",
    backgroundColor: "rgba(0,0,0,0.8)",
  };
  // console.log(odds);
  // console.log(team);
  // console.log(fixture);

  const [betInput, setBetInput] = useState("");

  const onBetSubmit = () => {
    const dataBet = {
      user: localStorage.getItem("auth_name"),
      matchId: fixture,
      equipe: team,
      cote: odds,
      mise: betInput,
    };
    console.log(dataBet);

    axios.post(`/api/storebet`, dataBet).then((res) => {
      if (res.data.status === 200) {
        swal("Réussi", res.data.message, "success");
        Navigate("/");
      } else {
        swal("Echec", res.data.message, "warning");
      }
    });
  };
  return (
    <>
      <div className="modal show fade " style={modalStyle}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div>
              <button
                className="btn-close"
                onClick={() => closeModale(false)}
              ></button>
            </div>
            <div className="modal-header mx-auto">
              <h2>Confirmer mon pari </h2>
            </div>
            <div className="modal-body text-center">
              <p>Valider ma cote de</p>
              <p className="text-warning">{odds}</p>
              <p>sur {team}</p>
              <input
                type="text"
                name="mise"
                placeholder="Entrez votre montant"
                onChange={(e) => setBetInput(e.target.value)}
                value={betInput}
              ></input>
            </div>
            <div className="text-end m-2">
              <button className="btn btn-warning" onClick={() => onBetSubmit()}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modale;
