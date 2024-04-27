import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import userImage from "../images/userMoreDetail.png";
import AdminLayout from "../components/AdminLayout";

const ParameterAdmin = () => {

    const handleLogout = () => {
        // Effacez le cookie contenant le token d'authentification
        Cookies.remove("token");
        window.location.href = "/login";
      };
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
const additionalContent=( <>
    <div className="userDetail adminInfo">
      <div className="userOptionsAdmin">
        <img src={userImage} className="userDetailIcon userDetailIconAdmin" />
        <ul>
          <li>
            {" "}
            {!client ? (
              <p>Chargement des informations du client...</p>
            ) : (
              <h4>
                {client.prenom} {client.nom}
              </h4>
            )}
          </li>

          <hr />

          <div className="learnMoreUserAdmin">
            {" "}
            <li className="option">
              <Link to="/adminDetails">
                {" "}
                <i class="fas fa-user userOptionIcon"></i>
                Mes informations
              </Link>
            </li>
          </div>
          <hr className="optionHr" />

          <div className="learnMoreUserAdmin">
            {" "}
            <li className="option">
              <Link to="/ParametersAdmin">
                <i class="fas fa-cog userOptionIcon"></i>
                Paramètres
              </Link>
            </li>
          </div>
          <hr className="optionHr" />

          <div className="learnMoreUserAdmin">
            {" "}
            <li className="option">

            <Link  to="/login" onClick={handleLogout}>                {" "}
                <i class="fas fa-sign-out-alt userOptionIcon"></i>
                Déconnexion
              </Link>
            </li>
          </div>
          <hr className="optionHr" />
        </ul>
      </div>
      <div className="userInfoAdmin">
        <h4>Paramètres</h4>

        <div className="userDetailSection userDetailFirstSection adminOptions" >
          <Link to="/AdminEdit" className="optionParam optionsParamAdmin">
          <i className="material-icons optionIcon"> edit</i>   Modifier mes informations{" "}
          </Link>

          <br />
          <br />
          <Link to="#" onClick={handleResetPass} className="optionParam optionsParamAdmin">
          <i className="material-icons optionIcon"> key</i>   Changer le mot de passe
          </Link>
          <br />
          <br />


          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </div>
  </>)
  return (
   <><AdminLayout additionalContent={additionalContent}></AdminLayout></>
  );
};

export default ParameterAdmin;
