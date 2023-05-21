import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cthdService from "../../services/cthdService";

const CTHDList = () => {
  const [cthds, setCTHDs] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    retrieveCTHDs();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveCTHDs = () => {
    try{
      cthdService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          console.log(response.data);
          setCTHDs(response.data.data);
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
  const handleDeleteCTHD = (idCTHD)=>{
    try{
      console.log(idCTHD);
      cthdService.remove(idCTHD).then((response)=>{
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
      cthdService.findByName(searchTitle)
      .then(response => {
        if(response.data.errCode===0){
          setCTHDs(response.data.data);
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
        <h4> Danh Sach Hoa Don Chi Nhanh 2</h4>
        <table className="table">
          <thead className="table-success">
            <tr>
              <th>Ma hoa don</th>
              <th>Ma san pham </th>
              <th>So luong</th>
              <th>Gia</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cthds&&
              cthds.map((cthd, index)=>(
                <tr key={index}>
                  <td>{cthd.MAHD}</td>
                  <td>{cthd.MASP}</td>
                  <td>{cthd.SL}</td>
                  <td>{cthd.GIA}</td>
                  <td>
                    <button className="btn btn-warning" onClick={()=>navigate(`/cthd/${cthd.MAHD}`)}>Edit</button>
                    <button className="btn btn-danger" onClick={()=>{handleDeleteCTHD(cthd.MAHD)}}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <button className="btn btn-success mt-3" onClick={()=>navigate(`/cthd/new`)}>New CTHD</button>
      </div>
    </div>
  );
};

export default CTHDList;