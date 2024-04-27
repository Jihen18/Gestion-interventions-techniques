import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
// import userImage from "../images/userIcone.jpg";
import userImage from "../images/userMoreDetail.png";

import AdminLayout from "../components/AdminLayout";

const UserMoreDetails = () => {
  const [userDetail, setUserDetail] = useState({});
  const { email } = useParams();

  const additionalContent= (    <>
    <div className="userDetail">
      <div className="userOptionsAdmin">
        <img src={userImage} className="userDetailIcon userDetailIconAdmin" />
        <ul>
          {!userDetail[0] ? (
            <p>Chargement des informations du client...</p>
          ) : (
            <li>
              <h4>
                {userDetail[0].prenom} {userDetail[0].nom}
              </h4>
            </li>
          )}
        </ul>
        <hr />

        <div className="learnMoreUserAdmin">
          <ul>
       
          {!userDetail[0]?<p>chargement en cours</p> :  (<>     <li className="option"><Link to={`/userMoreDetails/${userDetail[0].email}`}> {" "}
                <i class="fas fa-user userOptionIcon"></i>
                Les informations
              </Link>
            </li> </>)}
               
          </ul>
        </div>
        <hr className="optionHr" />

        <div className="learnMoreUserAdmin">
          <ul>

          <li className="option">
              <Link to={`/update_account/${email}`}>
              <i className="fas fa-pencil-alt userOptionIcon"></i>
                Modifier ce compte
              </Link>
            </li>
            </ul>
            </div>
            <hr className="optionHr" />

            <div className="learnMoreUserAdmin">
            <ul>

            <li className="option">
              <Link to={`/Confirm_delete/${email}`}>
                <i class="fas fa-cog userOptionIcon"></i>
                Supprimer ce compte
              </Link>
            </li>
          </ul>
        </div>
        <hr className="optionHr" />



   

      </div>


      
      <div className="userInfoAdmin">
        <h4>Profil utilisateur</h4>
        {!userDetail[0] ? (
          <p>Chargement...</p>
        ) : (
          <>
            <div className="userDetailSection userDetailFirstSection">
              <p>Email: {userDetail[0].email}</p>
              <p>Nom: {userDetail[0].nom}</p>
              <p>Prénom: {userDetail[0].prenom}</p>
            </div>
            <div className="userDetailSection userDetailSecondAdmin">
              <p>Téléphone: +216 {userDetail[0].telephone}</p>
              <p>
                Etat de compte:{" "}
                {userDetail[0].active === 1 ? (
                  <span>actif </span>
                ) : ( <>
                  <span>en cours de désactivation</span>
                  <p>date de désactivation</p> <span>{userDetail[0].datesup}</span>
                  </>
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  </>)
  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/userMoreDetails/${email}`)
      .then((response) => {
        setUserDetail(response.data.userDetails);
        console.log("voici donnees client");
        console.log(userDetail);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du client :", error);
      });
  }, [email]);

  return (
    <> 
<AdminLayout additionalContent={additionalContent}></AdminLayout></>
   
  );
};

export default UserMoreDetails;
