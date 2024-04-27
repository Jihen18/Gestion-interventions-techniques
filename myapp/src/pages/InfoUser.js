import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import userImage from "../images/userIcone.jpg";
import axios from "axios";

const InfoUser = () => {
  const navigate = useNavigate();

  const token = Cookies.get("token");
  const [client, setClient] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [differenceInHours, setDifferenceInHours] = useState(null);
  const [differenceInDays, setDifferenceInDays] = useState(null);
  const [reinitialisation, setReinitialisation] = useState(null);

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

  return (
    <>
      <div className="userDetail profileUser">
        <div className="userOptions">
          <img src={userImage} className="userDetailIcon" />
          <ul>
            {!client ? (
              <p>Chargement des informations du client...</p>
            ) : (
              <li>
                <h4 className="fullNameUser">
                  {client.prenom} {client.nom}
                </h4>
              </li>
            )}
          </ul>
          <hr />

          <div className="">
            <ul>
              <li className="option">
                <Link to="/userDetails">
                  {" "}
                  <i class="fas fa-user userOptionIcon iconUserOptions"></i>
                  Mes informations
                </Link>
              </li>
            </ul>
          </div>
          <hr className="optionHr" />

          <div>
            <ul>
              <li className="option">
                <Link to="/Parameters">
                  <i class="fas fa-cog userOptionIcon iconUserOptions"></i>
                  Paramètres
                </Link>
              </li>
            </ul>
          </div>
          <hr className="optionHr" />

          <div className="">
            <ul>
              <li className="option">
                <Link to="">
                  {" "}
                  <i class="fas fa-sign-out-alt userOptionIcon iconUserOptions"></i>
                  Déconnexion
                </Link>
              </li>
            </ul>
          </div>
          <hr className="optionHr" />
        </div>
        <div className="userInfo">
          <h4>Profil utilisateur</h4>
          {!client ? (
            <p>Chargement...</p>
          ) : (
            <>
              <div className="userDetailSection userDetailFirstSection">
                <p>Email: {client.email}</p>
                <p>Nom: {client.nom}</p>
                <p>Prénom: {client.prenom}</p>
              </div>
              <div className="userDetailSection userDetailSecondSection">
                <p>Téléphone: +216 {client.telephone}</p>
                <p>
                  Etat de compte:{" "}
                  {client.active === 1 ? (
                    <span>actif </span>
                  ) : (
                    <span>en cours de désactivation</span>
                  )}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InfoUser;
