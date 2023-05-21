import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import hoadonService from '../../services/hoadonService';
import sanPhamService from '../../services/sanPhamService';
import cthdService from '../../services/cthdService';

export default function EditAndAddCTHD() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [currentMAHD, setCurrentMAHD] = useState("");
  const [currentMASP, setCurrentMASP] = useState("");
  const [listHD, setListHD] = useState();
  const [listSP, setListSP] = useState();
  const [CTHD, setCTHD] = useState({
    MAHD: "",
    MASP: "",
    SL: ""
  });
  useEffect(()=>{
    hoadonService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          setListHD(response.data.data);
        }
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

      sanPhamService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          console.log(response.data);
          setListSP(response.data.data);
        }
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
    if(id==='new') return;
    cthdService.get(id).then(
      (response) => {
        if(response.data.errCode===0){
          setCTHD(response.data.data[0]);
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
        // setErrMessage(e);
        console.log(e);
      });
  }, []);

  const handleOnchange = (e)=>{
    let cthd = {...CTHD};
    cthd[e.target.name] = e.target.value;
    setCTHD(cthd);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    CTHD.MAHD = currentMAHD;
    CTHD.MASP = currentMASP;
    
    if(id==="new"){     
      cthdService.create(CTHD).then(
      (response) => {
        if(response.data.errCode===0){
          navigate("/cthd");
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
        // setErrMessage(e);
        console.log(e);
      });
      
    }else{
      cthdService.update(CTHD).then(response => {
        console.log(response);
        if(response.data.errCode===0){
          navigate("/cthd");
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
  const changeMAHD = (e) => {
    setCurrentMAHD(e.target.value);
  }
  const changeMASP = (e)=>{
    setCurrentMASP(e.target.value);
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
            <strong htmlFor="MAHD">MA HOA DON: </strong>
            <select 
            onChange={(event) => changeMAHD(event)}
            value={currentMAHD}
            >
              {listHD && listHD.map((hoadon, index)=>{
                return <option key={index} value={hoadon.MAHD}>{hoadon.MAHD}</option>
              })

              }
            </select>
          </div>
          
          <div className="form-group col-md-6">
            <strong htmlFor="MASP">MA SAN PHAM: </strong>
            <select 
            onChange={(event) => changeMASP(event)}
            value={currentMASP}
            >
              {listSP && listSP.map((sanpham, index)=>{
                return <option key={index} value={sanpham.MASP}>{sanpham.MASP}</option>
              })

              }
            </select>
          </div>
          <div className="form-group col-md-6">
            <strong htmlFor="SL">SL: </strong>
            <input
              type="text"
              className=""
              name="SL"
              placeholder="so luong san pham"
              value={CTHD.SL}
              required
              onChange={handleOnchange}
            />
          </div>
        
        <div className="form-group col-md-6 mt-3">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
           {id ==='new' ? "Create CTHD" : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}
