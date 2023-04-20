import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import petService from "../services/PetService";

const PetsList = () => {
  const [pets, setPets] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    retrievePets();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrievePets = () => {
    try{
      petService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          setPets(response.data.data);
        }
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }catch(e){
      console.log(e);
    }
    
  };
  const handleDeletePet = (idPet)=>{
    try{
      petService.remove(idPet);
      window.location.reload();
    }catch(e){
      console.log(e);
    }
  }

  const refreshList = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    petService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    try{
      petService.findByName(searchTitle)
      .then(response => {
        if(response.data.errCode===0){
          setPets(response.data.data);
        }
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }catch(e){
      console.log(e);
    }
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <h4>Pets List</h4>
        <table className="table">
          <thead className="table-success">
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Date of birth</th>
              <th>Race</th>
              <th>Vaccinated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets&&
              pets.map((pet, index)=>(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{pet.name}</td>
                  <td>{pet.dob}</td>
                  <td>{pet.race}</td>
                  <td>
                    <input type="checkbox" checked={pet.vaccinated===1?true:false} disabled/>
                  </td>
                  <td>
                    <button className="btn btn-warning" onClick={()=>navigate(`/pet/${pet.id}`)}>Edit</button>
                    <button className="btn btn-danger" onClick={()=>{handleDeletePet(pet.id)}}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <button className="btn btn-success mt-3" onClick={()=>navigate("/pet/new")}>New Pet</button>
        {/* <ul className="list-group">
          {pets &&
            pets.map((pet, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(pet, index)}
                key={index}
              >
                {pet.name}
              </li>
            ))}
        </ul> */}

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button> */}
      </div>
      {/* <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTutorial.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/tutorials/" + currentTutorial.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default PetsList;