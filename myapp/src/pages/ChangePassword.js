import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ChangePassword = (props) => {
  const navigate = useNavigate();

  const { activationToken } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [clickedBtn, setClickedBtn] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/changePassword/${activationToken}`)
      .then((response) => {
        console.log(response.data.data);
        setUserData(response.data.data); // Met à jour l'état avec les données de la réponse
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError("Token invalide expiré");
        } else {
          console.error(error);
          setError(
            "Une erreur s'est produite lors de la récupération des données."
          );
        }
      });
  }, [activationToken]);

  const onChangePassword = (btnValue) => {
    setClickedBtn(btnValue);

    axios
      .put(`http://localhost:5000/updatePassword/${activationToken}`, {
        password: password,
        passwordConfirm: passwordConfirm,
        submitBtn: btnValue,
      })
      .then((response) => {
        navigate("/");

        console.log(response.data);

        setErrorMsg(response.data.message);

        setError(response.data.message);
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
      });
  };
  return (
    <div className="reclaimForm">
      <h4>Changement de mot de passe </h4>
      <p> {error}</p>

      {/* {error && <p>{error}</p>} */}
      {userData && (
        <>
          <p>
            Bonjour , {userData.nom} {userData.prenom}{" "}
          </p>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              nouveau mot de passe
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br/>

            <label htmlFor="newPassword" className="form-label">
              confirmer le mot de passe
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            name="changeBtn"
            className="btn btn-primary btn-inscription"
            value="update"
            onClick={() => onChangePassword("update")}
          >
            Update
          </button>

          <button
            type="submit"
            className="btn btn-primary btn-inscription"
            name="changeBtn"
            value="cancel"
            onClick={() => onChangePassword("cancel")}
          >
            Cancel
          </button>

          <p>{errorMsg}</p>
        </>
      )}
    </div>
  );
};

export default ChangePassword;
