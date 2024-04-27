import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import  { useEffect, useState } from "react";

import { NavLink, Link } from "react-router-dom";

const AdminRoute = () => {
    const [token, setToken] = useState(Cookies.get("token"));
    const decodedToken = token ? jwt_decode(token) : null;
    const idRole = decodedToken ? decodedToken.clientData.IdRole : null;

console.log(token);
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return (token&&idRole==14) ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoute;