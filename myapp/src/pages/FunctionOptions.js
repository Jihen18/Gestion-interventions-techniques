import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { NavLink, Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
const FunctionOptions = () => {
    const token = Cookies.get("token");
  const {interventionType}=useParams();
    const decodedToken = jwt_decode(token);
    const { email } = decodedToken.clientData;
  const[functions,setFunctions]=useState([]);


const[idFunction,setIdFunction]=useState(null);






    useEffect(() => {
      axios
        .get(`http://localhost:5000/functions`)
        .then((response) => {
          setFunctions(response.data.functions);
          console.log("les cateeeg");
          console.log();
        })
        .catch((error) => {});
    }, []);
  

  
  
  
  
  
  
    // const handleClickEdit = async (btnValue) => {
    //     try {
    //       console.log("Bouton cliqué :", btnValue);
    //       setIdCategorie(btnValue);
    //       const response= await axios.put(`http://localhost:5000/admin/category/${btnValue}`)
    
    //     } catch (error) {
    //       console.error("Erreur lors de la gestion du clic :", error);
    //     }
    //   };
  




    useEffect(()=>{
        console.log(idFunction);
    
    },[idFunction])

  const handleClickDelete = async (btnValue) => {
    try {
        window.location.reload();
      console.log("Bouton cliqué suppr :", btnValue);
      setIdFunction(btnValue);
      const response= await axios.delete(`http://localhost:5000/admin/functionDelete/${btnValue}`)

    } catch (error) {
      console.error("Erreur lors de la gestion du clic :", error);
    }
  };


  const handleClickModify = async (btnValue) => {
    try {
        window.location.reload();
      console.log("Bouton cliqué suppr :", btnValue);
      setIdFunction(btnValue);
      const response= await axios.put(`http://localhost:5000/admin/functionUpdate/${btnValue}`)

    } catch (error) {
      console.error("Erreur lors de la gestion du clic :", error);
    }
  };





const additionalContent=(  <div className="container mt-5 reclamsContainer">
   <div className="titleReclamsHolder">  <h4>Liste des fonctions</h4></div>


<table className="table table-striped table3">
  <thead>
    <tr>
      <th>Nom fonction</th>
      <th>Options</th>
     
    </tr>
  </thead>
  <tbody>
    {!functions ? (
      <p></p>
    ) : (
      functions.map((item, index) => (
        <tr key={index}>
          <td>{item.Choix}</td>
          
        
             <td>
              <Link to={`/EditFunction/${item.idChoix}`}> <button
              className="link-button"
              value={item.idChoix}
            >
                 
                 <i className="material-icons optionIcon">edit </i> <span>modifier</span>
            </button></Link>
           



            
            <>
        

            <Link >

            <button
              className="link-button"
              onClick={() => handleClickDelete(item.idChoix)}
              value={item.idChoix}
            >
             
              <i className="fas fa-times"></i> <span>supprimer</span>
            </button>
            </Link>
            </>

            
          </td>

        </tr>
      ))
    )}
  </tbody>
</table>
</div>)
  return (
  <AdminLayout additionalContent={additionalContent}></AdminLayout>
  );
};

export default FunctionOptions;
