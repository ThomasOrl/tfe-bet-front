import React from "react";

function Modale({ closeModale, odds }) {
  const modalStyle = {
    display: "block",
    backgroundColor: "rgba(0,0,0,0.8)",
  };
  console.log(odds);
  return (
    <>
      <div className="modal show fade " style={modalStyle}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div>
              <button className="btn-close" onClick={() => closeModale(false)}>
                {" "}
              </button>
            </div>
            <div className="modal-header mx-auto">
              <h2>Confirmer mon pari </h2>
            </div>
            <div className="modal-body text-center">
              <p>Valider ma cote de {odds}</p>
              <input placeholder="Entrez votre montant"></input>
            </div>
            <div className="text-end m-2">
              <button className="btn btn-warning">Confirmer</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modale;
