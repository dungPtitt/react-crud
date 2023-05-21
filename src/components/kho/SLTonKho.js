import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import slTonKhoService from "../../services/slTonKhoService";

const SLTonKhoList = () => {
  const [slTonKhos, setSLTonKhos] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    retrieveSLTonKhos();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveSLTonKhos = () => {
    try{
      slTonKhoService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          console.log(response.data);
          setSLTonKhos(response.data.data);
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
  const handleDeleteSLTonKho = (idSLTonKho)=>{
    try{
      console.log(idSLTonKho);
      slTonKhoService.remove(idSLTonKho).then((response)=>{
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
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <h4> SL TON TRONG KHO 6</h4>
        <table className="table">
          <thead className="table-success">
            <tr>
              <th>STT</th>
              <th>Ma San Pham</th>
              <th>Ma Kho </th>
              <th>So Luong Con lai trong</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slTonKhos&&
              slTonKhos.map((slTonKho, index)=>(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{slTonKho.MASP}</td>
                  <td>{slTonKho.MAKHO}</td>
                  <td>{slTonKho.SL}</td>
                  <td>
                    <button className="btn btn-warning" onClick={()=>navigate(`/sltonkho/${slTonKho.MASP}`)}>Edit</button>
                    <button className="btn btn-danger" onClick={()=>{handleDeleteSLTonKho(slTonKho.MASP)}}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <button className="btn btn-success mt-3" onClick={()=>navigate(`/sltonkho/new`)}>New SLTonKho</button>
      </div>
    </div>
  );
};

export default SLTonKhoList;