import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const ReclamationsList = () => {

const [reclamation,setReclamation]=useState([]);
const[categories,setCategories]=useState([]);
const[selectedCategory,setSelectedCategorie]=useState(null);

const[priorities,setPriorities]=useState([]);
const[selectedPriority,setSelectedPriority]=useState(null);



const { reclamationType } = useParams();
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




useEffect(() => {
    setReclamation([]); // Réinitialisation des données
    console.log("trahh");
    console.log(selectedCategory);

    axios
        .get(`http://localhost:5000/admin/reclams/${reclamationType}`,{params:{selectedCategory:selectedCategory,selectedPriority:selectedPriority}})
        .then((response) => {
            setReclamation(response.data.reclamations);
        })
        .catch((error) => {});
}, [reclamationType,selectedCategory,selectedPriority]);

const additionalContent=(       <div className="container mt-5 reclamsContainer">


   <div className="titleReclamsHolder">        
{reclamationType==="inProgress" &&<h4>Liste des interventions en cours</h4>}    
{reclamationType==="achieved" &&<h4>Liste des interventions clôturées</h4>}  
{reclamationType==="onHold" &&<h4>Liste des réclamations en attente</h4>}
{reclamationType==="archivees" &&<h4>Liste des réclamations archivées</h4>}
  </div> 
<div className="FilterHolder">
<div class="container mt-5">
    <div>
        <label for="category">Filtrer par catégorie:</label>
        <select class="form-control" id="category" value={selectedCategory} onChange={handleCategoryChange}>

            <option value="">Toutes les catégories</option>
            {!categories ? <option disabled>Chargement...</option> : categories.map(category => (
                <option key={category.idChoix} value={category.idChoix}>{category.Choix}</option>
            ))}
        </select>
    </div>
</div>



<div class="container mt-5">
    <div>
        <label for="priority">Filtrer par priorité:</label>
        <select class="form-control" id="priority" value={selectedPriority} onChange={handlePriorityChange}>

            <option value="">Toutes les priorités</option>
            {!priorities ? <option disabled>Chargement...</option> : priorities.map(priority => (
                <option key={priority.idChoix} value={priority.idChoix}>{priority.Choix}</option>
            ))}
        </select>
    </div>
</div>
</div>
    <table className="table table-striped table2">
        <thead>
            <tr>
                {reclamationType !="archivees"&&<th>Id</th>}
                
                <th>Objet</th>
                <th>Client</th>
                <th>Catégorie</th>
                <th>Priorité</th>
                <th>Date réclam</th>
                {reclamationType==="archivees"&&<th>statut</th>}
                {reclamationType==="inProgress"   && <><th>Intervenant </th>
                <th>Date Interv</th></>}
                {reclamationType==="archivees" && <><th>Intervenant </th>
                <th>Date Interv</th></>}
                {reclamationType==="achieved" && <><th>Intervenant </th>
                <th>Date Interv</th></>}
            </tr>
        </thead>
        <tbody>

        {!reclamation?<p>chargement</p>:reclamation.map((item, index) => (
//   <React.Fragment key={index}>
<tr>
    {reclamationType!="archivees"&&<td>{item.IdReclamation}</td>}

<td>{item.Objet}</td>
{reclamationType==="archivees"?<td>{item.emailClient}</td>:<td>{item.prenomClient} {item.nomClient}</td>}

<td>{item.categorie}</td>
<td>{item.priorite}</td>
<td>{item.DateReclamation&&item.DateReclamation.substring(0,19).replace(/T/g, " ")}</td>
{reclamationType==="archivees"&&<td>{item.statut}</td>}

{(reclamationType==="inProgress" || reclamationType==="achieved") && <><td>{item.prenomTechnicien} {item.nomTechnicien} </td>
<td>{item.DateIntervention&&item.DateIntervention.substring(0,19).replace(/T/g, " ")}</td></>}
{reclamationType==="archivees" &&<><td>{item.emailTechnicien} </td>
<td>{item.DateIntervention}</td></>}
</tr>
//   </React.Fragment>
))}
          
        </tbody>
    </table>
</div>)

    return (
 <AdminLayout additionalContent={additionalContent}></AdminLayout>
    );
}

export default ReclamationsList;
