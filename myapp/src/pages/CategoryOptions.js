import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { NavLink, Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
const CategoryOptions = () => {
    const token = Cookies.get("token");
  const {interventionType}=useParams();
    const decodedToken = jwt_decode(token);
    const { email } = decodedToken.clientData;
  const[categories,setCategories]=useState([]);


const[idCategorie,setIdCategorie]=useState(null);






    useEffect(() => {
      axios
        .get(`http://localhost:5000/categories`)
        .then((response) => {
          setCategories(response.data.categories);
          console.log("les cateeeg");
          console.log(categories);
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
        console.log(idCategorie);
    
    },[idCategorie])

  const handleClickDelete = async (btnValue) => {
    try {
        window.location.reload();
      console.log("Bouton cliqué suppr :", btnValue);
      setIdCategorie(btnValue);
      const response= await axios.delete(`http://localhost:5000/admin/categoryDelete/${btnValue}`)

    } catch (error) {
      console.error("Erreur lors de la gestion du clic :", error);
    }
  };


  const handleClickModify = async (btnValue) => {
    try {
        window.location.reload();
      console.log("Bouton cliqué suppr :", btnValue);
      setIdCategorie(btnValue);
      const response= await axios.put(`http://localhost:5000/admin/categoryUpdate/${btnValue}`)

    } catch (error) {
      console.error("Erreur lors de la gestion du clic :", error);
    }
  };





const additionalContent=(  <div className="container mt-5 reclamsContainer">
   <div className="titleReclamsHolder">  <h4>Liste des catégories</h4></div>


<table className="table table-striped table3">
  <thead>
    <tr>
      <th>Nom catégorie</th>
      <th>Options</th>
     
    </tr>
  </thead>
  <tbody>
    {!categories ? (
      <p></p>
    ) : (
      categories.map((item, index) => (
        <tr key={index}>
          <td>{item.Choix}</td>
          
        
             <td>
              <Link to={`/EditCategory/${item.idChoix}`}> <button
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

export default CategoryOptions;
