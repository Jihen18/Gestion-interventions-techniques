import React from "react";
import { NavLink, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import LogoutLink from "./LogoutLink";
const Head = () => {
  const [token, setToken] = useState(Cookies.get("token"));

  useEffect(() => {
    const updatedToken = Cookies.get("token");
    setToken(updatedToken);
    console.log(token);
  }, []); // Utiliser un tableau de dépendances vide pour n'exécuter cet effet qu'une seule fois lors du montage initial du composant.
  return (
    <div>
      <section className="head">
        <div className="container flexSB">
          <div className="logo">
            <h1>Interventions</h1>
            <span>Gestion des réclamations & interventions techniques </span>
          </div>
          {!token ? (
            <div className="social connetionContainer">
              {/* <i className="fab fa-facebook icon"></i>
            <i className="fab fa-instagram icon"></i>
            <i className="fab fa-linkedin icon"></i> */}
              <Link to="/login" className="loginLink">se connecter </Link>
              <Link to="/signup" className="loginLink">s'inscrire</Link>
            </div>
          ) : (
            <LogoutLink class="logout" />
          )}
        </div>
      </section>
    </div>
  );
};

export default Head;
