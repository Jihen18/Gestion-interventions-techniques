import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const ConfirmReset = () => {
  const [clickedBtn, setClickedBtn] = useState("");

  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  const { email } = decodedToken.clientData;

  const handleOnClick = async (e) => {
    const btnValue = e.currentTarget.value;
    setClickedBtn(btnValue);

    try {
      const response = await axios.put(
        "http://localhost:5000/recuperer_compte",
        { clickedBtn: btnValue, email: email }
      );

      if (response.status === 203) {
        // Faire quelque chose en cas de statut 203 (annulé)
        window.location.href = "/userdetails";
        // Exécuter le code de redirection ici
        // Par exemple, utiliser React Router pour naviguer vers une autre page
      }
      if (response.status === 200) {
        Cookies.remove("token");
        window.location.href = "/login";
      }
    } catch (error) {}
  };
  return (
    <div className="alertContainer">
      <div className="alertTitle">
        <i class="fas fa-exclamation-triangle warningIcon"></i>
        <span>Avertissement</span>
      </div>
      <div className="alertText">
        <h3>Voulez vous vraiment recuperer ce compte ?</h3>

        <p>
          Si vous confirmez la réinitialisation, votre compte sera réactivé et
          les fonctionnalités associées seront entièrement restaurées. Vous
          pourrez à nouveau accéder à votre compte, vos données et vos
          paramètres comme avant. Veuillez noter que toutes les restrictions
          temporaires seront levées et que votre compte redeviendra actif.
        </p>

        <div className="buttonSection">
          <button name="confirmation" value="confirm" onClick={handleOnClick}>
            Confirmer
          </button>
          <button onClick={handleOnClick} value="annuler" name="annulation">
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReset;
