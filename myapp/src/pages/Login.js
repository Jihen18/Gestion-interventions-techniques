import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
const Login = () => {
  const [token, setToken] = useState(Cookies.get("token"));
  const idAdmin=14;
  const idTechnicien=16;
  const idUser=15;
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });
  //  const [token, setToken] = useState("");
  const handleOnChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        userForm
      );

      if (response.status === 200) {
        const token = response.data.token;
        // Cookies.set("token", token, { expires: 7 });
        Cookies.set("token", token);
        console.log("testt get login")
        const decodedToken = token ? jwt_decode(token) : null;
        const idRole = decodedToken ? decodedToken.clientData.IdRole : null;
        if(idRole==idAdmin)
        window.location.href = "/dashboard";
      else  {
        window.location.href = "/userDetails";

      }
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

  const handleForgetPass = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/reset_password",
        userForm
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

  useEffect(() => {
    axios
      .put("http://localhost:5000/recuperer_compte", {})
      .then((response) => {
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  return (
    <div className="container reclaimForm loginForm">
      <div className="login-div">
        <h4>Login</h4>

        <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
  <label htmlFor="email" className="form-label visually-hidden">
    Email
  </label>
  <div className="input-group">
    <div className="input-group-prepend">
      <span className="input-group-text">
        <i className="fas fa-envelope loginIcon"></i>
      </span>
    </div>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              onChange={handleOnChange}
            />
          </div>
          </div>

          <div className="mb-3">
  <label htmlFor="password" className="form-label visually-hidden">
    Mot de passe
  </label>
  <div className="input-group">
    <div className="input-group-prepend">
      <span className="input-group-text">
        <i className="fas fa-lock loginIcon"></i>
      </span>
    </div>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              name="password"
              onChange={handleOnChange}
            />

</div>


            <Link className="forgetPassword" to="" onClick={handleForgetPass}>
              <p> mot de passe oublié ? </p>
            </Link>
          </div>
          <button type="submit" className="btn btn-secondary btn-inscription btn-edit">
            se connecter
          </button>
        </form>
      </div>
      <br />
      <p>{errorMessage}</p>
      <br />
    </div>
  );
};

export default Login;
