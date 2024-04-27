import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import UserCard from "../components/UserCard";
import { useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { NavLink, Link } from "react-router-dom";


const UserList=()=>{




  
    const [usersInfo,setUsersInfo]=useState([]);
    const { userType } = useParams();

    const additionalContent=( <div className="usersContainer"> <div className="titleHolder">   {userType==="clients"?(<h4>Mes clients</h4>):(<h4>Mes techniciens</h4>)}</div>
 
<div className="user-cards-container">
{usersInfo.map((item,index)=>(
<UserCard className="UserCard" userName={item.prenom} userLastName={item.nom} userFunction={item.fonction} key={index} userEmail={item.email}></UserCard>
))}

{userType!="clients"&& <>        <Link className="learnMoreLink addLink" to="/addTechnician">
  <div class="card cardAdd" style={{width: 12 +"rem"}}>

<i class="material-icons iconAdd"> add</i>    <div class="card-body" className="cardBody">
      <p class="card-text"></p>
      {/* <button name={userEmail}><Link className="learnMoreLink" to="/userMoreDetails">savoir plus</Link></button> */}
    </div>
  </div></Link>
</>}
</div>
</div>)

    useEffect(() => {
        axios
          .get(`http://localhost:5000/admin/list/${userType}`)
          .then((response) => {
            
            setUsersInfo(response.data.userInfo);
         
    
            // Mettre à jour l'état avec les détails du client reçus depuis le serveur
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération du client :", error);
          });
      }, [userType]);
    return(
        <>
       <AdminLayout additionalContent={additionalContent}></AdminLayout>
        </>
   
    );
}

export default UserList;