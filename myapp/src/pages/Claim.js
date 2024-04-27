import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Claim = () => {


  
  const [priority, setPriority] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);

  const [object, setObject] = useState(null);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  const { email } = decodedToken.clientData;
  useEffect(() => {
    axios
      .get(`http://localhost:5000/claim`)
      .then((response) => {
        setPriority(response.data.data.data);
        setCategory(response.data.data.data1);

      })
      .catch((error) => {});
  }, []);
  const handleObjectChange = (e) => {
    setObject(e.target.value);
  };
  const handleOnSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/claim", {
        object: object,
        selectedCategory: selectedCategory,
        selectedPriority: selectedPriority,
        clientEmail: email,
      });
      
      if (response.status === 200) {
      window.location.href = "/reclamations";}

    } catch (error) {}
  };
  return (
    <>
      <div className="reclaimForm">
        <h4>Ajouter une réclamation</h4>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="object" className="form-label">
              Objet
            </label>
            <input
              type="text"
              required
              onChange={handleObjectChange}
              className="form-control"
              id="object"
              name="object"
            />
          </div>
          <br />
          <div>
            <div class="dropdown">
              <select
              required
                className="btn btn-secondary dropdown-toggle selectCategory"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="">Sélectionnez une catégorie</option>
                {!category ? (
                  <option>no data</option>
                ) : (
                  category.map((item, index) => (
                    <option value={item.idChoix} key={index}>
                      {item.Choix}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <br />

          <div>
            <div class="dropdown">
              <select
              required
                className="btn btn-secondary dropdown-toggle selectCategory"
                onChange={handlePriorityChange}
                value={selectedPriority}
              >
                <option value="">Sélectionnez une priorité</option>
                {!priority ? (
                  <option>no data</option>
                ) : (
                  priority.map((item, index) => (
                    <option value={item.idChoix} key={index}>{item.Choix}</option>
                  ))
                )}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-inscription btn-edit btn-claim">
            réclamer
          </button>
        </form>
      </div>
    </>
  );
};

export default Claim;