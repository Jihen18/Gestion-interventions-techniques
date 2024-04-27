import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
const InterventionsList = () => {
    const token = Cookies.get("token");
  const {interventionType}=useParams();
    const decodedToken = jwt_decode(token);
    const { email } = decodedToken.clientData;
  const [idReclamation, setIdReclamation] = useState();
  const[categories,setCategories]=useState([]);
const[selectedCategory,setSelectedCategorie]=useState(null);

const[priorities,setPriorities]=useState([]);
const[selectedPriority,setSelectedPriority]=useState(null);
  const [reclamation, setReclamation] = useState(null);
    const enCours="7";
    
    const enAttente=6;



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
  
  const handleCategoryChange =  (event) => {
      setSelectedCategorie(event.target.value);
      // console.log(event.target.value)
       console.log(selectedCategory);
  
      // ... Effectuez votre requête Axios pour obtenir les réclamations basées sur la catégorie sélectionnée
  };
  
  useEffect(() => {    
  
      // Utilisez ici la valeur mise à jour de selectedCategory pour effectuer vos opérations
      console.log(selectedCategory);
  
      // ... Effectuez votre requête Axios pour obtenir les réclamations basées sur la catégorie sélectionnée
  }, [selectedCategory]);
  
  
  
  
  
  
  
  
  
  const handlePriorityChange= (event)=>{
  
      setSelectedPriority(event.target.value);
  
  
  }
  useEffect(() => {
      axios
        .get(`http://localhost:5000/priorities`)
        .then((response) => {
          setPriorities(response.data.priorities);
          console.log("les cateeeg");
          console.log(priorities);
        })
        .catch((error) => {});
    }, []);
  
  
  
  useEffect(()=>{
      console.log(selectedPriority);
  
  },[selectedPriority])
  

  

    const handleLink2Click = async (btnValue,btnName) => {
        try {
            window.location.reload();
    
          console.log("Bouton cliqué :", btnValue);
          setIdReclamation(btnValue);
          const response= await axios.put(`http://localhost:5000/technicien/update/${btnValue}`,{email:email,btnName:btnName})
    
    
        } catch (error) {
          console.error("Erreur lors de la gestion du clic :", error);
        }
      };
  const handleLinkClick = async (btnValue) => {
    try {
        window.location.reload();
      console.log("Bouton cliqué :", btnValue);
      setIdReclamation(btnValue);
      const response= await axios.put(`http://localhost:5000/technicien/intervene/${btnValue}`,{email:email})

    } catch (error) {
      console.error("Erreur lors de la gestion du clic :", error);
    }
  };




  useEffect(() => {
    setReclamation([]);
    axios
      .get(`http://localhost:5000/technicien/interventions/${interventionType}`,{params:{email:email,selectedCategory:selectedCategory,selectedPriority:selectedPriority}})
      .then((response) => {
        setReclamation(response.data.interventions);
      })
      .catch((error) => {});
  }, [interventionType,selectedCategory,selectedPriority]);

  return (
    <div className="container mt-5 reclaimForm">

{interventionType==="enCours" &&  <h4>Liste des interventions en cours de traitement</h4>}
     
{interventionType==="disponibles" &&  <h4>Liste des réclamations disponibles</h4>}
{interventionType==="achevees" &&  <h4>Liste des interventions</h4>}


<div>

      {/* <div className="container mt-5"> */}
  <div className="row filtersContainers">
    <div className="col-md-6 selectContainer">
      {/* <label htmlFor="category" className="form-label">Filtrer par catégorie:</label> */}
      <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="form-select">
        <option value="">Toutes les catégories</option>
        {!categories ? <p>Chargement</p> : categories.map(category => (
          <option key={category.idChoix} value={category.idChoix}>{category.Choix}</option>
        ))}
      </select>
    </div>

    <div className="col-md-6 selectContainer">
      {/* <label htmlFor="priority" className="form-label">Filtrer par priorité:</label> */}
      <select id="priority" value={selectedPriority} onChange={handlePriorityChange} className="form-select">
        <option value="">Toutes les priorités</option>
        {!priorities ? <p>Chargement</p> : priorities.map(priorities => (
          <option key={priorities.idChoix} value={priorities.idChoix}>{priorities.Choix}</option>
        ))}
      </select>
    {/* </div> */}
  </div>
</div>
</div>





      <table className="table table-striped">
        <thead>
          <tr>
            <th>Objet</th>
            <th>Client</th>
            <th>email client</th>
            <th>Catégorie</th>
            <th>Priorité</th>
            <th>Date de réclamation</th>
            {interventionType==="achevees" && <th>Date Intervention</th>}

            {interventionType==="disponibles" &&<th></th>}
            {interventionType==="achevees" || interventionType==="enCours" &&<th>Date Intervention</th>}
<th></th>
          </tr>
        </thead>
        <tbody>
          {!reclamation ? (
            <p></p>
          ) : (
            reclamation.map((item, index) => (
              <tr key={index}>
                <td>{item.Objet}</td>
                <td>
                  {item.prenomClient} {item.nomClient}
                </td>
                <td>{item.emailClient}</td>
                <td>{item.categorie}</td>
                <td>{item.priorite}</td>
                <td>{item.DateReclamation ? item.DateReclamation.substring(0, 19).replace(/T/g, " ") : ""}</td>

                {interventionType==="achevees" && <td>{item.DateIntervention ? item.DateIntervention.substring(0, 19).replace(/T/g, " ") : ""}</td>
}


                { interventionType==="enCours" &&  <td>{item.DateIntervention ? item.DateIntervention.substring(0, 19).replace(/T/g, " ") : ""}</td>
}
                <td>
                    {item.IdStatut=="6" &&
                  <button
                    className="link-button"
                    onClick={() => handleLinkClick(item.IdReclamation)}
                    value={item.IdReclamation}
                  >
                    <i className="fas fa-hand-point-up"></i> <span>intervenir</span>
                  </button>}



                  {item.IdStatut==enCours&&
                  <>
                  <button
                    className="link-button"
                    onClick={() => handleLink2Click(item.IdReclamation,"Cloture")}
                    value={item.IdReclamation}
                  >
                      <i className="fas fa-check"></i> <span>cloturé</span>
                  </button>
                  <button
                    className="link-button"
                    onClick={() => handleLink2Click(item.IdReclamation,"Annuler")}
                    value={item.IdReclamation}
                  >
                    <i className="fas fa-times"></i> <span>Annuler</span>
                  </button>
                  
                  </>}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InterventionsList;
