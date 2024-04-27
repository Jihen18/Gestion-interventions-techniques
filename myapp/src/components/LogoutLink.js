import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const LogoutLink = () => {
  const handleLogout = () => {
    // Effacez le cookie contenant le token d'authentification
    Cookies.remove("token");
    window.location.href = "/login";
  };
  return (
    <Link to="/login" onClick={handleLogout} className="logout">
      Déconnexion
    </Link>
  );
};

export default LogoutLink;
