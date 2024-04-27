import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import userImage from "../images/userIcone.jpg";

const Parameter = () => {
  const [client, setClient] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [differenceInHours, setDifferenceInHours] = useState(null);
  const [differenceInDays, setDifferenceInDays] = useState(null);
  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  console.log("Decoded token:", decodedToken);
  const { email, nom, prenom, telephone, active, activeAccount, dateSup } =
    decodedToken.clientData;
  useEffect(() => {
    axios
      .get(`http://localhost:5000/userdetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = response.data;
        const clientData = responseData.client;
        const differenceInDays = responseData.differenceInDays;
        const differenceInHours = responseData.differenceInHours;
        setClient(clientData);
        setDifferenceInDays(differenceInDays);
        setDifferenceInHours(differenceInHours);

        // Mettre à jour l'état avec les détails du client reçus depuis le serveur
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du client :", error);
      });
  }, [token]);
  const handleResetPass = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/reset_password",
        { email: email }
      );

      if (response.status === 200) {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage("Erreur lors de la connexion");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "Une erreur s'est produite lors de la connexion au serveur"
        );
      }
    }
  };

  return (
    <>
      <div className="userDetail">
        <div className="userOptions">
          <img src={userImage} className="userDetailIcon" />
          <ul>
            <li>
              {" "}
              {!client ? (
                <p>Chargement des informations du client...</p>
              ) : (
                <h4 className="clientName">
                  {client.prenom} {client.nom}
                </h4>
              )}
            </li>

            <hr />

            <div className="">
              {" "}
              <li className="option">
                <Link to="/userDetails">
                  {" "}
                  <i class="fas fa-user userOptionIcon iconUserOptions"></i>
                  Mes informations
                </Link>
              </li>
            </div>
            <hr className="optionHr" />

            <div>
              {" "}
              <li className="option">
                <Link to="/Parameters">
                  <i class="fas fa-cog userOptionIcon iconUserOptions"></i>
                  Paramètres
                </Link>
              </li>
            </div>
            <hr className="optionHr" />

            <div className="">
              {" "}
              <li className="option">
                <Link to="">
                  {" "}
                  <i class="fas fa-sign-out-alt userOptionIcon iconUserOptions"></i>
                  Déconnexion
                </Link>
              </li>
            </div>
            <hr className="optionHr" />
          </ul>
        </div>
        <div className="userParam">
          <h4>Paramètres</h4>
          <div>
            <Link to="/userEdit" className="optionParam">
            <i className="material-icons optionIcon iconParam"> edit</i>     Modifier mes informations{" "}
            </Link>

            <br />
            <br />
            <Link to="#" onClick={handleResetPass} className="optionParam">
            <i className="material-icons optionIcon iconParam"> key</i>    Changer le mot de passe
            </Link>
            <br />
            <br />

            {active == 1 ? (
              <Link to="/ConfirmSuppression" className="optionParam">
            <i className="material-icons optionIcon iconParam"> delete</i>     Supprimer mon compte
              </Link>
            ) : (
              <>
                <div class="alert alertCustom" role="alert">
                  <i class="fas fa-exclamation-triangle warningIcon warning"></i>
                  Le compte est actuellement en cours de désactivation
                  temporaire. La désactivation sera finalisée dans{" "}
                  {differenceInDays} jours et {differenceInHours} heures. Vous
                  avez donc la possibilité d'annuler cette opération avant
                  l'expiration de cette période.
                </div>
                <Link to="/confirmReset" className="optionParam">
                  récupérer mon compte
                </Link>
              </>
            )}
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Parameter;
