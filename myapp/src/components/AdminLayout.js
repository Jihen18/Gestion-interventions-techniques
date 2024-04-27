import { NavLink, Link } from "react-router-dom";
import HiddenDiv from "../components/HiddenDiv"
import React, { useState, useRef, useEffect } from 'react';
import Cookies from "js-cookie";

const AdminLayout=({additionalContent})=>{


    
    const [isDivVisible, setIsDivVisible] = useState(false);

    const divRef = useRef(null);
    const [showDiv, setShowDiv] = useState(false);

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsDivVisible(false);
      }

   
    };


    const handleLogout = () => {
      // Effacez le cookie contenant le token d'authentification
      Cookies.remove("token");
      window.location.href = "/login";
    };
    
  
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);


return(

    <>

<div className="globalAdminContainer">
    
<div className="adminSidePanel">

    <div className="panelTop">

     <h4>Mon Panneau</h4>
     <hr/>
    </div>
<ul className="panelList">
   <Link to="/dashboard">
        <li className="itemChoice">
         <div className="itemDetailContainer">
         <i class="material-icons iconChoice"> dashboard</i> <h6>Vision global</h6>
         </div>     
           
        </li>
  </Link>
  <NavLink  to="/list/clients">
        <li className="itemChoice">
         <div className="itemDetailContainer">
         <i class="material-icons iconChoice">people</i> <h6>Mes clients</h6>
         </div>
            
            
           
        </li>
  </NavLink >

  <Link to="/list/techniciens">
        <li className="itemChoice">
         <div className="itemDetailContainer">
         <i class="material-icons iconChoice">engineering</i> <h6>Mes tehniciens</h6>
         </div>
            
            
           
        </li>
  </Link>
  <Link  to="/list/reclams/onHold">
        <li className="itemChoice">
         <div className="itemDetailContainer">
         <i class="material-icons iconChoice">hourglass_empty</i>

 <h6>réclams en attente</h6>
         </div>
            
            
           
        </li>
  </Link>

  <Link to="/list/reclams/inProgress">
        <li className="itemChoice">
         <div className="itemDetailContainer">
         <i class="material-icons iconChoice">autorenew</i>
 <h6>réclams en cours</h6>
         </div>
            
            
           
        </li>
  </Link>
  <Link to="/list/reclams/achieved">
        <li className="itemChoice">
         <div className="itemDetailContainer">
         <i class="material-icons">check_circle</i>

 <h6>reclams achevés</h6>
         </div>
            
            
           
        </li>
  </Link>
  <Link to="/list/reclams/archivees">
        <li className="itemChoice">
         <div className="itemDetailContainer">
         <i class="material-icons iconChoice">archive</i>
 <h6>archives réclams</h6>
         </div>
            
            
           
        </li>
  </Link>




 


  <Link  to="/login" onClick={handleLogout}>
        <li className="itemChoice">
         <div className="itemDetailContainer">
         <i class="material-icons iconChoice">logout</i>
 <h6>déconnexion</h6>
         </div>
            
            
           
        </li>
  </Link>

        </ul></div>







        
    <div className="AdminInformations">


<div className="headerAdmin">


    <div className="userLocation" > <i class="material-icons iconChoice homeIcon">home</i><Link> / </Link> </div>
    <div className="userParams">


  <Link to="/adminDetails"><i className="material-icons userParamIcon"> account_circle </i></Link>
  <i className="material-icons userParamIcon"  onClick={toggleDiv}> settings </i>
  {showDiv && <HiddenDiv onClose={toggleDiv} />}


  <i class="material-icons userParamIcon" onClick={() => setIsDivVisible(!isDivVisible)}> list </i>  {isDivVisible && (
        <div ref={divRef} className="toggle-div">

            <ul className="adminListOptions">
              <Link to="/addTechnician">   <li className="itemOptionList">
                <i className="material-icons optionIcon">  person_add_alt_1 </i>      ajouter un technicien
                  
                </li></Link> 
                <Link to="/AddFunction"> 
                <li className="itemOptionList">
                
                <i className="material-icons optionIcon">work </i>
               ajouter une fonction  
                </li>
</Link> 


<Link to="/FunctionsOptions"> 
                <li className="itemOptionList">
                
                <i className="material-icons optionIcon">edit </i>
Options fonctions                </li>
</Link> 

<Link to="/addCategory"> 
                <li className="itemOptionList">
                
                <i className="material-icons optionIcon">category </i>
               ajouter une catégorie  
                </li>
</Link> 
<Link to="/CategoryOptions"> 
                <li className="itemOptionList">
                
                <i className="material-icons optionIcon">edit </i>
                  Options catégories
 
                 </li>
</Link> 



  




  
            </ul>

        </div>
      )}


</div>



</div>


{additionalContent}





    </div>
    
    </div></>


)
}
export default AdminLayout;