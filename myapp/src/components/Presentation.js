import React from "react";
import PresentationImg from "../images/presenImg.png";
import Title from "./Title";
import { NavLink, Link } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
const Presentation = () => {

  const token = Cookies.get("token");

  return (
    <>
    <div className="presentation scrollNo">
      {/* <section className="presentation scrollNo"> */}
        <div className="container">
          <div className="row">
            <div className="descriptionWebSite">      <Title
              subtitle="
Bienvenue sur notre plateforme web"
              title="Meilleure gestion des réclamations clients"
            ></Title>
            <p>
              Notre objectif est de simplifier et d'optimiser le processus de
              traitement des interventions techniques et des réclamations de nos
              précieux clients. Grâce à notre plateforme conviviale, les clients
              pourront soumettre facilement leurs demandes d'assistance
              technique ou de réclamation
            </p></div>
      {token?<></>:<>  <div className="buttonDiv">
             <Link to="/login"><button className="primary-btn buttonPresentation">
                se connecter <i className="fa fa-long-arrow-alt-right"> </i>
              </button></Link> 
           <Link to="/signup"><button className="buttonPresentation">
                s'inscrire <i className="fa fa-long-arrow-alt-right"> </i>
              </button></Link>  
            </div>
  </>}
          
            <img src={PresentationImg} className="presentationImg" />
          </div>
        </div>
      {/* </section> */}
      </div>
    </>
  );
};

export default Presentation;
