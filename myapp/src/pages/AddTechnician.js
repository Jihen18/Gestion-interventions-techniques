import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AdminLayout from "../components/AdminLayout";

const AddTechnician = () => {

  
  function generateRandomPassword() {
    const length = 10; // Longueur du mot de passe souhaitée
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }

    return password;
  }

    const [errorMessage, setErrorMessage] = useState("");
    const [functions,setFunctions]=useState([]);
    const [selectedFunction,setSelectedFunction]=useState(null);
    const [userForm, setUserForm] = useState({
        email: "",
        nom: "",
        prenom: "",
        telephone: "",
        password:generateRandomPassword(),
    });
      const handleOnChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
      };
      const handleFunctionChange = (event) => {
        setSelectedFunction(event.target.value);
      };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/add_technician`)
      .then((response) => {
        setFunctions(response.data.functions)
     


      })
      .catch((error) => {});
  }, []);

      const handleOnSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(
            "http://localhost:5000/admin/add_technician"   , {
              ...userForm,
              selectedFunction: selectedFunction
            }
          );
    
          // Vérifier si la requête a réussi
          if (response.status === 200) {
            setErrorMessage(response.data.message);
            // Effectuer les actions nécessaires après une inscription réussie, par exemple, rediriger l'utilisateur vers une page de confirmation
            // navigate("/confirmation");
          } else {
            setErrorMessage("Erreur lors de l'inscription");
          }
        } catch (error) {
          // Gérer les erreurs de la requête
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage(
              "Une erreur s'est produite lors de la connexion au serveur"
            );
          }
        }
      };

      const additionalContent=( <>

        <div className="container reclaimForm containerAddTechnician">
          <div className="login-div addForm">
            <br/>
            <div className="titleAddTechnician">            <h5>Ajouter un technicien</h5>
</div>
    
            <form onSubmit={handleOnSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  required
                  onChange={handleOnChange}
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="nom"
                  name="nom"
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">
                  Prénom
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="prenom"
                  onChange={handleOnChange}
                  name="prenom"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telephone" className="form-label">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  onChange={handleOnChange}
                  id="telephone"
                  name="telephone"
                />
              </div>
    
           <br/>
    
    
    <div>
                <div class="dropdown">
                  <select
                    className="btn btn-secondary dropdown-toggle selectCategory"
                    onChange={handleFunctionChange}
                    value={selectedFunction}
                  >
                    <option value="">Sélectionnez une fonction</option>
                    {!functions ? (
                      <option>no data</option>
                    ) : (
                      functions.map((item, index) => 
                        <option value={item.idChoix} key={index}>
                          {item.Choix}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <br/>

           
              <button type="submit" className="btn btn-secondary  btnAddTech">
                ajouter
              </button>
            </form>
          </div>
          <br />
          <p className="addTechMsg">{errorMessage}</p>
        </div>
    
        </>)
  return (
   <><AdminLayout additionalContent={additionalContent}></AdminLayout></>
  );
};

export default AddTechnician;
