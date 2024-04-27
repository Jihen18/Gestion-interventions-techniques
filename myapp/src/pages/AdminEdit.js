import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import userImage from "../images/userMoreDetail.png";
import Admin from "./Admin";
import AdminLayout from "../components/AdminLayout";

const AdminEdit = () => {
    const handleLogout = () => {
        // Effacez le cookie contenant le token d'authentification
        Cookies.remove("token");
        window.location.href = "/login";
      };
  const [client, setClient] = useState(null);
  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  console.log("Decoded token:", decodedToken);
  const { email, nom, prenom, telephone, active, activeAccount, dateSup } =
    decodedToken.clientData;
  const [errorMessage, setErrorMessage] = useState("");

  const [userForm, setUserForm] = useState({
    nom: "",
    prenom: "",
    telephone: "",
  });
  const handleOnChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

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

        setClient(clientData);

        // Mettre à jour l'état avec les détails du client reçus depuis le serveur
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du client :", error);
      });
  }, [token]);
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:5000/UserEdit", {
        ...userForm,
        email,
      });

      // Vérifier si la requête a réussi
      if (response.status === 200) {
        window.location.href = "/userdetails";
        setErrorMessage(response.data.message);

        // Effectuer les actions nécessaires après une inscription réussie, par exemple, rediriger l'utilisateur vers une page de confirmation
        // navigate("/confirmation");
      } else {
        setErrorMessage("Erreur lors de l'inscription");
      }
    } catch (error) {
      // Gérer les erreurs de la requête
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "Une erreur s'est produite lors de la connexion au serveur"
        );
      }
    }
  };
  const additionalContent=(    <>
    <hr className="horLine" />
    <div className="userDetail adminForm">
      <div className="userOptionsAdmin">
        <img src={userImage} className="userDetailIcon userDetailIconAdmin" />
        <ul>
          <li>
            {!client ? (
              <p>Chargement en cours ..</p>
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
              <Link to="/AdminDetails">
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
            <Link  to="/login" onClick={handleLogout}>
                {" "}
                <i class="fas fa-sign-out-alt userOptionIcon"></i>
                Déconnexion
              </Link>
            </li>
          </div>
          <hr className="optionHr" />
        </ul>
      </div>

      <div className="userInfoAdmin">
        <h4>Modifier mes informations</h4>

        <div className="userDetailSection userDetailFirstSection adminOptions">
          <form onSubmit={handleOnSubmit}>
            <div className="mb-3"></div>
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom
              </label>
              <input
                type="text"
                required
                className="form-control smallInput"
                id="nom"
                name="nom"
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="prenom" className="form-label">
                Prénom
              </label>
              <input
                type="text"
                required
                className="form-control smallInput"
                id="prenom"
                onChange={handleOnChange}
                name="prenom"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telephone" className="form-label">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                className="form-control smallInput"
                onChange={handleOnChange}
                id="telephone"
                name="telephone"
              />
            </div>
            <button type="submit" className="btn btn-secondary btn-inscription">
              Modifier
            </button>
          </form>
          {/* <p>activeAccount: {activeAccount ? "true" : "false"}</p> */}
        </div>
        {/* {active == 1 ? (
          <Link to="/ConfirmSuppression">
            <p>supprimer mon compte</p>
          </Link>
        ) : (
          <div class="alert alert-danger" role="alert">
            Ce compte est temporairement en cours de desactivation, il sera
            desactive dans {differenceInDays} jours et {differenceInHours}{" "}
            heures pour annuler l'opération de désactivation
            {/* <Link onClick={handleOnClickLink} to="/confirmReset"> */}
        {/* <Link to="/confirmReset">récupérer mon compte</Link>
          </div>
        )} */}

        {/* {reinitialisation === 1 && (
          <div className="alert alert-success" role="alert">
            Le compte a été réinitialisé avec succès !
          </div>
        )} */}
      </div>
    </div>
  </>)
  return (
<><AdminLayout additionalContent={additionalContent}></AdminLayout></>
  );
};

export default AdminEdit;
