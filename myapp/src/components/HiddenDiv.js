import React from 'react';
import { NavLink, Link } from "react-router-dom";
import Cookies from "js-cookie";

function HiddenDiv({ onClose }) {

  const handleLogout = () => {
    // Effacez le cookie contenant le token d'authentification
    Cookies.remove("token");
    window.location.href = "/login";
  };
  return (
    <div className="hidden-div">
      <button className="close-button" onClick={onClose}>  <i className="material-icons optionIcon">close </i></button>
      <h5>Mes paramètres</h5>
      <p>Options propres à mon compte</p>
<ul className="ulHiddenDiv">      <hr/>
   <Link to="/adminDetails">
<li className='itemHiddenDiv'>
<i className="material-icons optionIcon">info </i> <span>Mes informations</span>
    
</li>

</Link>
<hr/>





<Link to="/AdminEdit" >
<li className='itemHiddenDiv'>
<i className="material-icons optionIcon">edit </i> <span>Modifier mes informations</span>
    
</li>
</Link>
<hr/>


<Link  to="/login" onClick={handleLogout}>
<li className='itemHiddenDiv'>
<i className="material-icons optionIcon">logout </i> <span>se déconnecter</span>
    
</li>
</Link>
<hr/>
</ul>
   
    </div>
  );
}

export default HiddenDiv;
