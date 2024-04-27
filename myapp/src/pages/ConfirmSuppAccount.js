import React, { useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
const ConfirmSuppAccount=()=>{
    const [clickedBtn,setClickedBtn]=useState(null);
    const { email } = useParams();
    const handleOnClick = async (e) => {
        const btnValue = e.currentTarget.value;
        setClickedBtn(btnValue);
    
        try {
          const response = await axios.delete(
            `http://localhost:5000/admin/confirm_delete/${email}`,    { params: { clickedBtn: btnValue } }

          );
    
          if (response.status === 203) {
            // Faire quelque chose en cas de statut 203 (annulé)
            window.history.go(-2);            // Exécuter le code de redirection ici
            // Par exemple, utiliser React Router pour naviguer vers une autre page
          }
          if (response.status === 200) {
            
            window.history.go(-2);          }
     
          
       
        } catch (error) {}
      };
      const additionalContent=(        <div className="alertContainer">
      <div className="alertDeleteAdmin">
        <i class="fas fa-exclamation-triangle warningIcon"></i>
        <span>Avertissement</span>
      </div>
      <div className="alertTextAdmin">
        <h3>Voulez vous vraiment supprimer ce compte ?</h3>
        <p>
        Vous êtes sur le point de supprimer l'utilisateur {email}.
Cette action est irréversible  car la suppression ne pourra pas être annulée une fois confirmée.
        </p>
        <div className="buttonSection">
          <button
            name="confirmation"
            value="confirmation"
            className="btn btn-secondary deleteBtnAdmin"
            onClick={handleOnClick}
          >
            Confirmer
          </button>
          <button
            onClick={handleOnClick}
            value="annulation"
            className="btn btn-secondary deleteBtnAdmin"
            name="annulation"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>)
    return(
<AdminLayout additionalContent={additionalContent}></AdminLayout>
    )

}

export default ConfirmSuppAccount;