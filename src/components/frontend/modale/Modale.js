import React, { useEffect, useState } from "react";

function Modale ({closeModale}){
    let modalStyle ={
        display: 'block',
        backgroundColor: "rgba(0,0,0,0.8)",
    }
    return(
        <>
        
        <div className="modal show fade " style={modalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div>
                        <button className="btn-close" onClick={()=> closeModale(false)}>  </button>
                    </div>
                    <div className="modal-header text-center">
                        <h1>Confirmer mon pari</h1>
                    </div>
                    <div className="modal-body text-center">
                        <p>Valider ma cote de </p>
                        <input placeholder="Entrez votre montant"></input>
                    </div>
                    <div className="text-end m-1">
                        <button className="btn btn-success">Confirmer</button>
                    </div>
                </div>
            </div>
        
        </div>
        </>


        
        
    );
}

export default Modale;