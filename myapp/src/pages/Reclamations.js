import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";


const Reclamations = () =>{

  const [reclamation,setReclamation]=useState(null);

    const token = Cookies.get("token");
    const decodedToken = jwt_decode(token);
    const { email } = decodedToken.clientData;


    useEffect(() => {
        axios
          .get(`http://localhost:5000/reclamations`, {
            params: {
              email: email,
            },
          })
          .then((response) => {

            setReclamation(response.data.data);
            console.log(reclamation[0].Objet);
         
          })
          .catch((error) => {});
      }, []);
    return (
<>

<div className="reclaimForm">
  <h4>Mes reclamations</h4>
  <div className="titleContainer">
       <p>Objet </p>

      <p>Catégorie</p>
      <p>Priorité</p>
      <p>Status</p>
      <p>Date</p>
  </div>

  <div className="reclamationsContainer">

    {!reclamation?(<p>chargement ...</p>):reclamation.map((item,index)=>(
      (<>

      
      <p>{item.Objet}</p>
      <p>{item.categorie}</p>

      <p>{item.priorite}</p>

      <p>{item.statut}</p>
      <p>{item.DateReclamation.slice(0,19).replace("T"," ")}</p>


      </>
      
      )
    ))}
  </div>
</div>


</>

    )
}

export default Reclamations;
