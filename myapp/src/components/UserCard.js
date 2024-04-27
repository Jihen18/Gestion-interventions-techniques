import React from "react";
import userImage from "../images/userIcone.jpg";
import { Link } from "react-router-dom";


const UserCard=({userEmail,userName,userLastName,userFunction})=>{

  
  return (
    <>
    
    <div class="card" style={{width: 12 +"rem"}}>
    <img src={userImage} class="card-img-top" alt="..."/>
    <div class="card-body" className="cardBody">
          <h5 class="card-title">{userName} {userLastName}</h5>
      <p class="card-text">{userFunction}</p>
      {/* <button name={userEmail}><Link className="learnMoreLink" to="/userMoreDetails">savoir plus</Link></button> */}
      <Link className="learnMoreLink" to={`/userMoreDetails/${userEmail}`}>
  <button  className="btn btn-secondary">savoir plus</button>
</Link>
    </div>
  </div>
  </>
  );
}

export default UserCard;