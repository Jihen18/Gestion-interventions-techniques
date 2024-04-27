import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import userImage from "../images/userMoreDetail.png";
import AdminLayout from "../components/AdminLayout";

const UpdateAccount = () => {
  const technicianId = '16';
  const { email } = useParams();

  const [userDetail, setUserDetail] = useState({});
  const [functions, setFunctions] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [idRole, setIdRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/functions`)
      .then((response) => {
        setFunctions(response.data.functions);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/userMoreDetails/${email}`)
      .then((response) => {
        setUserDetail(response.data.userDetails);
        setIdRole(response.data.userDetails[0].IdRole);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du client :", error);
      });
  }, [email]);

  const handleFunctionChange = (event) => {
    setSelectedFunction(event.target.value);
  };

  const handleOnChange = (e) => {
    setUserDetail({
      ...userDetail,
      [0]: {
        ...userDetail[0],
        [e.target.name]: e.target.value
      }
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/admin/AccountEdit/${email}`, {
        ...userDetail[0],
        selectedFunction: selectedFunction,
        idRole: idRole
      });

      window.location.href = `/userMoreDetails/${email}`;
      setErrorMessage(response.data.message);
    } catch (error) {
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
    <div className="userDetail adminForm updateAccountForm">
      <div className="userOptionsAdmin">
        <img src={userImage} className="userDetailIcon userDetailIconAdmin" />
        <ul>
          {!userDetail[0] ? (
            <p>Chargement des informations du client...</p>
          ) : (
            <li>
              <h4>
                {userDetail[0].prenom} {userDetail[0].nom}
              </h4>
            </li>
          )}
        </ul>
        <hr />

        <div className="learnMoreUserAdmin">
          <ul>
       
          {!userDetail[0]?<p>chargement en cours</p> :  (<>     <li className="option"><Link to={`/userMoreDetails/${userDetail[0].email}`}> {" "}
                <i class="fas fa-user userOptionIcon"></i>
                Les informations
              </Link>
            </li> </>)}
               
          </ul>
        </div>
        <hr className="optionHr" />

        <div className="learnMoreUserAdmin">
          <ul>

          <li className="option">
              <Link to={`/update_account/${email}`}>
              <i className="fas fa-pencil-alt userOptionIcon"></i>
                Modifier ce compte
              </Link>
            </li>
            </ul>
            </div>
            <hr className="optionHr" />

            <div className="learnMoreUserAdmin">
            <ul>

            <li className="option">
              <Link to={`/Confirm_delete/${email}`}>
                <i class="fas fa-cog userOptionIcon"></i>
                Supprimer ce compte
              </Link>
            </li>
          </ul>
        </div>
        <hr className="optionHr" />



   

      </div>

      <div className="userInfoAdmin">
        <h4>Modifier les informations</h4>

        <div className="userDetailSection userDetailFirstSection adminOptions">
          <form onSubmit={handleOnSubmit}>
            <div className="mb-3"></div>
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom
              </label>
              <input
  type="text"
  required
  
  value={!userDetail[0] ? "" : userDetail[0].nom}
  className="form-control smallInput"
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
                value={!userDetail[0] ? "" : userDetail[0].prenom}

                className="form-control smallInput"
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
                className="form-control smallInput"
                onChange={handleOnChange}
                value={!userDetail[0] ? "" : userDetail[0].telephone}

                id="telephone"
                name="telephone"
              />
            </div>


            {!userDetail[0] ? (
  <p>Chargement des informations du client...</p>
) : (
  userDetail[0].IdRole === technicianId && (
<div className="dropdown">
  <div className="">      
        
  <select
  required
  id="category"
  value={selectedFunction}
  onChange={handleFunctionChange}
  className="btn btn-secondary dropdown-toggle selectCategory"
>
  <option value="" disabled>
    Sélectionnez une fonction
  </option>
  {functions ? (
    functions.map((functions) => (
      <option
        key={functions.idChoix}
        value={functions.idChoix}
      >
        {functions.Choix}
      </option>
    ))
  ) : (
    <option value="" disabled>
      Chargement des fonctions...
    </option>
  )}
</select>

      </div>
   </div>
  )
)}


            <button type="submit" className="btn btn-secondary btn-inscription">
              Modifier
            </button>
          </form>
        { errorMessage}

      </div>
    </div>
        </div>

  </>)

  return (
    <AdminLayout additionalContent={additionalContent}></AdminLayout>
  );
};

export default UpdateAccount;
