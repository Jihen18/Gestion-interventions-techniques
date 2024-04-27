import { NavLink, Link } from "react-router-dom";
import PanelListItem from "../components/PanelListItem"
import HiddenDiv from "../components/HiddenDiv"
import React, { useState, useRef, useEffect } from 'react';
import InfoCard from "../components/InfoCard";
import AdminLayout from "../components/AdminLayout";
import axios from "axios";


const Admin=()=>{

const [countClient,setCountClient]=useState(null);
const [countTechnician,setCountTechnician]=useState(null);
const [countReclams,setCountReclams]=useState(null);
const [countInterventions,setCountInterventions]=useState(null);
const [reclamsInProgress,setReclamsInProgress]=useState(null);
const [achievedInterventions,setAchievedInterventions]=useState(null);
const [numberReclamsInProgress,setNumberReclamsInProgress]=useState(null)

const percentage = countReclams === 0 ? 100 : 100-(countReclams*100/(countReclams+countInterventions));
useEffect(() => {
    
      // Requête pour récupérer le nombre de messages depuis le serveur
      axios
        .get("http://localhost:5000/admin/countClient")
        .then((response) => {
          setCountClient(response.data.countClient);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du nombre de messages:", error);
        });
    
  }, []);



  useEffect(() => {
    
    // Requête pour récupérer le nombre de messages depuis le serveur
    axios
      .get("http://localhost:5000/admin/countInterventions")
      .then((response) => {
        setCountInterventions(response.data.countInterventions);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du nombre de messages:", error);
      });
  
}, []);


  useEffect(() => {
    
    // Requête pour récupérer le nombre de messages depuis le serveur
    axios
      .get("http://localhost:5000/admin/countTechnician")
      .then((response) => {
        setCountTechnician(response.data.countTechnician);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du nombre de messages:", error);
      });
  
}, []);


useEffect(() => {
    
  // Requête pour récupérer le nombre de messages depuis le serveur
  axios
    .get("http://localhost:5000/admin/countReclams")
    .then((response) => {
      setCountReclams(response.data.countReclams);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du nombre de messages:", error);
    });

}, []);



useEffect(() => {
    
  // Requête pour récupérer le nombre de messages depuis le serveur
  axios
    .get("http://localhost:5000/admin/countReclamsInProgress")
    .then((response) => {
    setReclamsInProgress(response.data.reclamsInProgress);
    setNumberReclamsInProgress(response.data.totalCount);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du nombre de messages:", error);
    });

}, []);





useEffect(() => {
    
  // Requête pour récupérer le nombre de messages depuis le serveur
  axios
    .get("http://localhost:5000/admin/achievedInterventions")
    .then((response) => {
    setAchievedInterventions(response.data.achievedInterventions);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du nombre de messages:", error);
    });

}, []);
const additionalContent=(
  <><div className="cardContainer">


  <Link><InfoCard title="Total clients" number={countClient} iconName="people" className="iconContainerClients"></InfoCard></Link>
  <Link><InfoCard title="Total techniciens" number={countTechnician} iconName="engineering"></InfoCard></Link>
  <Link><InfoCard title="Total reclamations" number={countReclams} iconName="report_problem" className="iconContainerReclams"></InfoCard></Link>
  </div> 
  
   <div className="cardTableContainer">
  <Link><InfoCard number={countInterventions} iconName="task" title="Total interventions" className="iconContainerInterventions"></InfoCard></Link>
  
  <div className="tableContainer">
  
  
  <div className="tableTitle">
  
      <h6>Reclamation en cours de traitement</h6>
      <i className="material-icons optionIcon"> autorenew</i> <span><b>   <span>{numberReclamsInProgress}</span> en cours</b></span>
      </div>
      <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Objet</th>
        <th scope="col">Client</th>
        <th scope="col">Intervenant</th>
      </tr>
    </thead>
    <tbody>
    {!reclamsInProgress ? <p></p> : reclamsInProgress.map((item, index) => (
  <tr key={index}>
    <td>{item.objet}</td>
    <td>{item.client_nom} {item.client_prenom}</td>
    <td>{item.technicien_nom} {item.technicien_prenom}</td>
  </tr>
))}
  
    
    </tbody>
  </table>
  
  <Link className="learnMoreLinkBtn" to="/list/reclams/inProgress"><button type="button" class="btn btn-secondary">Savoir Plus</button></Link>
  
  </div>
  
  
  </div> 
  
  
  <div className="progressContainer">
      <div className="iconContainerProgress"> <i className="material-icons cardIcon timeLineIcon">timeline </i></div>
  <h5>État des Réclamations Achevées</h5>
  <br></br>
        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar" style={{ width: percentage + '%' }}></div>

        </div>
      </div>
  </>
)




    return(

        

<>


<><AdminLayout additionalContent={additionalContent}></AdminLayout>

</>

    
   </>
    )
}
export default Admin;