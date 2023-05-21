import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import sanPhamService from '../../services/sanPhamService';
import khoService from '../../services/khoService';
import slTonKhoService from '../../services/slTonKhoService';

export default function EditAndAddSLTonKho() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [currentMaKho, setCurrentMaKho] = useState("");
  const [currentMASP, setCurrentMASP] = useState("");
  const [listKho, setListKho] = useState();
  const [listSP, setListSP] = useState();
  const [sltonkho, setSLTonKho] = useState({
    MASP: "",
    MAKHO: "",
    SL: ""
  });
  useEffect(()=>{
    khoService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          setListKho(response.data.data);
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
          setListSP(response.data.data);
        }
        // console.log(response.data);
      } , (error) => {
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
        console.log(e);
      });
    if(id==='new') return;
    slTonKhoService.get(id).then(
      (response) => {
        if(response.data.errCode===0){
          // console.log(response.data.data);
          setSLTonKho(response.data.data[0]);
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
    let SLTONKHO = {...sltonkho};
    SLTONKHO[e.target.name] = e.target.value;
    setSLTonKho(SLTONKHO);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    sltonkho.MAKHO = currentMaKho;
    sltonkho.MASP = currentMASP;
    console.log(sltonkho);
    if(id==="new"){     
      slTonKhoService.create(sltonkho).then(
      (response) => {
        if(response.data.errCode===0){
          navigate("/sltonkho");
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
      
    }else{
      slTonKhoService.update(sltonkho).then(response => {
        console.log(response);
        if(response.data.errCode===0){
          navigate("/sltonkho");
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
  const changeMaKho = (e) => {
    setCurrentMaKho(e.target.value);
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
            <strong htmlFor="MAKHO">Ma kho: </strong>
            <select 
            onChange={(event) => changeMaKho(event)}
            value={currentMaKho}
            >
              {listKho && listKho.map((kho, index)=>{
                return <option key={index} value={kho.MAKHO}>{kho.MAKHO}</option>
              })

              }
            </select>
          </div>
          
          
          <div className="form-group col-md-6">
            <strong htmlFor="SL">So luong con lai trong kho: </strong>
            <input
              type="text"
              className=""
              name="SL"
              placeholder="So luong trong kho"
              value={sltonkho.SL}
              required
              onChange={handleOnchange}
            />
          </div>
        <div className="form-group col-md-6 mt-3">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
           {id ==='new' ? "Create HoaDon" : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}
