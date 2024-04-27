import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Cookies from "js-cookie";
import LogoutLink from "./LogoutLink";
import Head from "./Head";
import axios from "axios";
import jwt_decode from "jwt-decode";
// import NotificationCount from "./NotificationCount";




const Header = () => {
  const [click, setClick] = useState(false);
  const [token, setToken] = useState(Cookies.get("token"));
  const decodedToken = token ? jwt_decode(token) : null;
  const email = decodedToken ? decodedToken.clientData.email : null;
  const idRole = decodedToken ? decodedToken.clientData.IdRole : null;
  const idAdmin=14;
  const idTechnicien=16;
  const idUser=15;

  // const newRole = idRole === 14 ? "admin" : (idRole === 16 ? "technicien" : "user");

  // setRole(newRole);  
  const [count, setCount] = useState(0);
  
  // useEffect(() => {
  //   if (email) {
  //     // Requête pour récupérer le nombre de messages depuis le serveur
  //     axios
  //       .get("http://localhost:5000/count", {
  //         params: {
  //           email: email, // Passer l'e-mail de l'utilisateur en tant que paramètre de requête
  //         },
  //       })
  //       .then((response) => {
  //         setCount(response.data.count);
  //       })
  //       .catch((error) => {
  //         console.error("Erreur lors de la récupération du nombre de messages:", error);
  //       });
  //   }
  // }, [email]);
  


  return (

    
    <>
      <Head> </Head>
      <header className="header">
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB "}
            onClick={() => setClick(false)}
          >
            <li>
              <Link to="/">Accueil</Link>
            </li>
            {/* <li>
              <Link to="/about">A propos</Link>
            </li> */}
            {/* <li>
              <Link to="/Contact">Contact</Link>
            </li> */}

            {token&&idRole==idTechnicien &&<>
            
            {/* <li><Link to="/reclamations_disponibles">Réclamations disponibles</Link></li>
            <li><Link to="/interventions_en_cours">Mes réclamations en cours</Link></li>
            <li><Link to="/interventions_achevees">Mes réclamations achevées</Link>

            </li> */}


<li><Link to="/interventions/disponibles">Réclamations disponibles</Link></li>
            <li><Link to="/interventions/enCours">Mes réclamations en cours</Link></li>
       
            





            </>}
{token&& idRole==idUser &&
            <li>
              <Link to="/claim">Ajouter une reclamation</Link>
            </li>
            }

            {token&&idRole==idAdmin&&
          ( <> <li>
              
             <Link to="/addTechnician"> Ajouter un technicien </Link> 
              </li> 
              <li><Link to="/list/techniciens">Liste des techniciens</Link></li>
              <li><Link to="/list/clients">Liste des clients</Link></li>
              <li><Link to="/list/reclam">réclamations</Link></li>
              <li><Link to="/list/reclams/inProgress">réclamations en cours</Link></li>
              <li><Link to="/list/reclams/onHold">réclamations en attente</Link></li>

              <li><Link to="/list/reclams/achieved">interventions</Link></li>
              <li><Link to="/list/reclams/archivees">Mes réclamations archivves</Link>   </li>

             </>)}
          </ul>
          {token &&  (
            <div className="start">
              <div className="button">
                <Link to="/userdetails">
                  {" "}
                  <i class="fas fa-user userIcon"></i>
                  <span className="userSpan">Mon compte</span>
                </Link>{" "}
                {idRole==idTechnicien &&
                <Link to="/interventions/achevees">
                  {" "}
                  <i class="fas fa-sticky-note"></i>{" "}
                  <span className="userSpan">Mes interventions</span>
                </Link>}

                {idRole==idUser &&
                <Link to="/reclamations">
                  {" "}
                  <i class="fas fa-sticky-note"></i>{" "}
                  <span className="userSpan">Mes réclamations</span>
                </Link>}
           

              </div>
            </div>
          )}
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? (
              <i className="fa fa-times"> </i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
