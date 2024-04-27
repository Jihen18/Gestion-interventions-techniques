import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { useParams, Link } from "react-router-dom";

const CategoryEdit = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [functions,setFunctions]=useState([]);
    const [category,setCategory]=useState(null);
    const [message,setMessage]=useState("");

    const { idCategorie } = useParams();

      const handleOnSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.put(
            `http://localhost:5000/admin/update_category/${idCategorie}`,{newCategory:category} 

          
            
          );
          console.log("bdhd");

            setMessage(response.data.message);
         
        } catch (error) {
          // Gérer les erreurs de la requête
         
          }
        }

        const handleOnChange = (e) => {
            setCategory(e.target.value);
          };

      const additionalContent=( <>

        <div className="container reclaimForm containerAddTechnician addCatgoryContainer">
          <div className="login-div addForm">
            <br/>
            <div className="titleAddTechnician categoryTitle">            <h5>Modifier une catégorie de réclam</h5>
</div>
    
            <form onSubmit={handleOnSubmit}>
              <div className="mb-3">
                <label htmlFor="catgory" className="form-label">
                  nouveau titre
                </label>
                <input
                  type=""
                  required
                  onChange={handleOnChange}
                  className="form-control smallInput catgoryInput"
                  id="category"
                  name="category"
                />
              </div>
             <br></br>
           
              <button type="submit" className="btn btn-secondary  btnAddCategory">
                modifier
              </button>
<br></br>
              {message}
            </form>
          </div>
          <br />
          <p>{errorMessage} !</p>
        </div>
    
        </>)
  return (
    <><AdminLayout additionalContent={additionalContent}></AdminLayout></>
   );
 };

export default CategoryEdit;
