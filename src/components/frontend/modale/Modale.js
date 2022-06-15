import React from "react";

function Modale({ closeModale, odds, fixture }) {
  const modalStyle = {
    display: "block",
    backgroundColor: "rgba(0,0,0,0.8)",
  };
  console.log(odds);
  console.log(fixture);

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
              <p>sur {fixture}</p>
              <input placeholder="Entrez votre montant"></input>
            </div>
            <div className="text-end m-2">
              <button type="submit" className="btn btn-warning">
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
