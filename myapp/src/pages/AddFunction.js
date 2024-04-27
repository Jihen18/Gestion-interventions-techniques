import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AdminLayout from "../components/AdminLayout";

const AddFunction = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [functions,setFunctions]=useState(null);
    const [message,setMessage]=useState("");


      const handleOnSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(
            "http://localhost:5000/admin/add_function"   , {functionTitle:functions
          
            }
          );
            setMessage(response.data.message);
         
        } catch (error) {
          // Gérer les erreurs de la requête
         
          }
        }

        const handleOnChange = (e) => {
            setFunctions(e.target.value);
          };

      const additionalContent=( <>

        <div className="container reclaimForm containerAddTechnician addCatgoryContainer">
          <div className="login-div addForm">
            <br/>
            <div className="titleAddTechnician categoryTitle">            <h5>Ajouter une fonction technicien</h5>
</div>
    
            <form onSubmit={handleOnSubmit}>
              <div className="mb-3">
                <label htmlFor="catgory" className="form-label">
                  titre fonction
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
                ajouter
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

export default AddFunction;
