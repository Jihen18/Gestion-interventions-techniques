import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import  { useEffect, useState } from "react";

import { NavLink, Link } from "react-router-dom";

const TechnicianRoute = () => {
    const [token, setToken] = useState(Cookies.get("token"));
    const decodedToken = token ? jwt_decode(token) : null;
    const idRole = decodedToken ? decodedToken.clientData.IdRole : null;

console.log(token);


    return (  ( token && idRole == 16) ? (
        <><Outlet /></>
      ) : idRole == 14 ? (
        <Navigate to="/dashboard" />
      ) : (
        <Navigate to="/" />
      )
    );
}

export default TechnicianRoute;