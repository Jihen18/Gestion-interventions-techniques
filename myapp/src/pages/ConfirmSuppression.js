import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ConfirmSuppression = () => {
  const token = Cookies.get("token");

  const decodedToken = jwt_decode(token);
  const { email } = decodedToken.clientData;

  const [clickedBtn, setClickedBtn] = useState("");

  const handleOnClick = async (e) => {
    const btnValue = e.currentTarget.value;
    setClickedBtn(btnValue);

    try {
      const response = await axios.post(
        "http://localhost:5000/confirmSuppression",
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
        <h3>Voulez vous vraiment supprimer ce compte ?</h3>
        <p>
          Veuillez noter que la confirmation entraînera la suppression du compte
          dans un délai de 14 jours à compter de la date actuelle. Cependant,
          vous pouvez le récupérer à tout moment tant que vous êtes connecté,
          tant que les 14 jours ne sont pas écoulés.
        </p>
        <div className="buttonSection">
          <button
            name="confirmation"
            value="confirm"
            className="deleteBtn"
            onClick={handleOnClick}
          >
            Confirmer
          </button>
          <button
            onClick={handleOnClick}
            value="annuler"
            className="deleteBtn"
            name="annulation"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSuppression;
