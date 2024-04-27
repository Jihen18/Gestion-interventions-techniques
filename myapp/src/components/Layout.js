import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import Presentation from "./Presentation";
import { useLocation } from "react-router-dom"; // Si vous utilisez React Router

import Admin from "../pages/Admin";


const Layout = () => {

  console.log("HUUUUUU");
  const [token, setToken] = useState(Cookies.get("token"));
  const decodedToken = token ? jwt_decode(token) : null;
  const email = decodedToken ? decodedToken.clientData.email : null;
  const idRole = decodedToken ? decodedToken.clientData.IdRole : null;
  console.log(idRole);
  const idAdmin=14;
  const idTechnicien=16;
  const idUser=15;
  const currentLocation = useLocation();


  return (

    


    
    <>
    {idRole!=idAdmin&&<Header></Header>}

{
        <>
          {/* <Header /> */}
          {currentLocation.pathname === "/" ? <Presentation /> : <Outlet />}
        </>
      }

        
{/* {currentLocation.pathname === "/"  || !token  ? <>    <Header /> <Presentation /> </> : <Outlet />/idRole==idTechnicien  && <> <Header></Header>
  <Outlet/> </>} */}

  {idRole==idUser  && <>  </>}
  {idRole==idTechnicien  && <> 
   </>}
  {idRole==idAdmin  && <>
  </>}
{/* {idRole==idAdmin&&<Admin></Admin>} */}
   {/* <Header></Header>
   <Outlet></Outlet> */}
    </>
  );
};
export default Layout;
