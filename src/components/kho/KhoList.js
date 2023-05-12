import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import khoService from "../../services/khoService";

const KhoList = () => {
  const [khos, setKhos] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    retrieveKhos();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveKhos = () => {
    try{
      khoService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          console.log(response.data);
          setKhos(response.data.data);
        }
        // console.log(response.data);
      } , (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setErrMessage(resMessage);
      })
      .catch(e => {
        console.log(e);
      });
    }catch(e){
      console.log(e);
    }
    
  };
  const handleDeleteKho = (idKho)=>{
    try{
      console.log(idKho);
      khoService.remove(idKho).then((response)=>{
        if(response.data.errCode===0){
          window.location.reload();
        }else{
          setErrMessage(response.data.errMessage);
        }
      }, (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          console.log("check ", resMessage);
        setErrMessage(resMessage);
      })
      
    }catch(e){
      console.log(e);
    }
  }

  const findByTitle = () => {
    try{
      khoService.findByName(searchTitle)
      .then(response => {
        if(response.data.errCode===0){
          setKhos(response.data.data);
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
      {errMessage && 
        <header className="jumbotron">
          <h3>{errMessage}</h3>
        </header>
      }
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
        <h4> Danh Sach Nhan Vien Chi Nhanh 2</h4>
        <table className="table">
          <thead className="table-success">
            <tr>
              <th>Ma kho</th>
              <th>Ten kho </th>
              <th>Ma chi nhanh</th>
              <th>Dia chi</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {khos&&
              khos.map((kho, index)=>(
                <tr key={index}>
                  <td>{kho.MAKHO}</td>
                  <td>{kho.TENKHO}</td>
                  <td>{kho.MACN}</td>
                  <td>{kho.DIACHI}</td>
                  {/* <td>{kho.race}</td>
                  <td>
                    <input type="checkbox" checked={kho.vaccinated===1?true:false} disabled/>
                  </td> */}
                  <td>
                    <button className="btn btn-warning" onClick={()=>navigate(`/kho/${kho.MAKHO}`)}>Edit</button>
                    <button className="btn btn-danger" onClick={()=>{handleDeleteKho(kho.MAKHO)}}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <button className="btn btn-success mt-3" onClick={()=>navigate(`/kho/new`)}>New Kho</button>
      </div>
    </div>
  );
};

export default KhoList;