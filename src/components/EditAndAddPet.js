import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import petService from '../services/PetService';

export default function EditAndAddPet() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState({
    id: id,
    name: "",
    dob: "",
    race: "",
    vaccinated: ""
  });
  useEffect(()=>{
    if(id==='new') return;
    petService.get(id)
      .then(response => {
        if(response.data.errCode===0){
          setPet(response.data.data);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const handleOnchange = (e)=>{
    let petTmp = {...pet};
    petTmp[e.target.name] = e.target.value;
    setPet(petTmp);
  }
  const handleOnchangeCheckbox = (e)=>{
    let petTmp = {...pet};
    petTmp[e.target.name] = e.target.checked?1:0;
    setPet(petTmp);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(id==="new"){
      petService.create(pet)
      .then(response => {
        console.log(response);
        if(response.data.errCode===0){
          
        }
      })
      .catch(e => {
        console.log(e);
      });
      
    }else{
      petService.update(pet);
    }
    return navigate("/");
    // props.history.push("/");
  }
  return (
    <div className="container">
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Pet's name"
              value={pet.name}
              required
              onChange={handleOnchange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="dob">Date of birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              placeholder="Pet's dob"
              value={pet.dob}
              required
              onChange={handleOnchange}

            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="race">Race</label>
            <input
              type="text"
              className="form-control"
              name="race"
              placeholder="Pet's race"
              value={pet.race}
              required
              onChange={handleOnchange}

            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="vaccinated">Vaccinated</label>
            <input 
            type="checkbox"
            name="vaccinated"
            checked={pet.vaccinated===1?true:false}
            onChange={handleOnchangeCheckbox}
            />
          </div>
        </div>
        {/* <input type="text" name="id" value={id} hidden /> */}
        <div className="form-group mt-3">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
           {id ==='new' ? "Create Pet" : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}
