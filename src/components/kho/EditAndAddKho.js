import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import khoService from '../../services/khoService';

export default function EditAndAddKho() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [kho, setKho] = useState({
    MAKHO: "",
    TENKHO: "",
    MACN: "",
    DIACHI: ""
  });
  useEffect(()=>{
    if(id==='new') return;
    khoService.get(id).then(
      (response) => {
        if(response.data.errCode===0){
          setKho(response.data.data[0]);
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
      .catch(e => {
        // setErrMessage(e);
        console.log(e);
      });
  }, []);

  const handleOnchange = (e)=>{
    let khoTmp = {...kho};
    khoTmp[e.target.name] = e.target.value;
    setKho(khoTmp);
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(id==="new"){
      khoService.create(kho).then(
      (response) => {
        console.log(response);
        if(response.data.errCode===0){
          navigate("/kho");
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
        setErrMessage(resMessage);
      })
      .catch(e => {
        console.log(e);
      });
      
    }else{
      khoService.update(kho).then(response => {
        console.log(response);
        if(response.data.errCode===0){
          navigate("/kho");
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
      .catch(e => {
        // setErrMessage(e);
        console.log(e);
      });
    }
   
    // props.history.push("/");
  }
  return (
    <div className="container">
      {errMessage && 
        <header className="jumbotron">
          <h3>{errMessage}</h3>
        </header>
      }
      <form>
        <div className="form-group col-md-6">
            <label>Ma KHO(K06xxx)</label>
            <input
              type="text"
              className="form-control"
              name="MAKHO"
              placeholder="Ma kho"
              value={kho.MAKHO}
              disabled = {id==="new"?false: true}
              required
              onChange={handleOnchange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="HOTEN">Ten kho</label>
            <input
              type="text"
              className="form-control"
              name="TENKHO"
              placeholder="Ten kho"
              value={kho.TENKHO}
              required
              onChange={handleOnchange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="MACN">MA CHI NHANH</label>
            <input
              type="text"
              className="form-control"
              name="MACN"
              placeholder="Ma chi nhanh"
              value={kho.MACN}
              disabled = {id==="new"?false: true}
              required
              onChange={handleOnchange}

            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="DIACHI">Dia chi</label>
            <input
              type="text"
              className="form-control"
              name="DIACHI"
              placeholder="Dia chi"
              value={kho.DIACHI}
              required
              onChange={handleOnchange}

            />
          </div>
          
          
        {/* <input type="text" name="id" value={id} hidden /> */}
        <div className="form-group col-md-6 mt-3">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
           {id ==='new' ? "Create Kho" : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}
