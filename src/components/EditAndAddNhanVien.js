import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import nhanVienService from '../services/nhanVienService';

export default function EditAndAddNhanVien() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [nhanVien, setNhanVien] = useState({
    MANV: "",
    HOTEN: "",
    SDT: "",
    DIACHI: "",
    CHUCVU: "",
    LUONG: ""
  });
  useEffect(()=>{
    if(id==='new') return;
    nhanVienService.get(id).then(
      (response) => {
        if(response.data.errCode===0){
          // console.log(response.data.data);
          setNhanVien(response.data.data[0]);
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
    let nhanVienTmp = {...nhanVien};
    nhanVienTmp[e.target.name] = e.target.value;
    setNhanVien(nhanVienTmp);
  }
  const handleOnchangeCheckbox = (e)=>{
    let nhanVienTmp = {...nhanVien};
    nhanVienTmp[e.target.name] = e.target.checked?1:0;
    setNhanVien(nhanVienTmp);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(id==="new"){
      nhanVienService.create(nhanVien).then(
      (response) => {
        console.log(response);
        if(response.data.errCode===0){
          navigate("/");
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
      console.log(nhanVien);
      nhanVienService.update(nhanVien).then(response => {
        console.log(response);
        if(response.data.errCode===0){
          navigate("/");
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
            <label>Ma nhan vien(NV06xxx)</label>
            <input
              type="text"
              className="form-control"
              name="MANV"
              placeholder="Ma nhan vien"
              value={nhanVien.MANV}
              disabled = {id==="new"?false: true}
              required
              onChange={handleOnchange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="HOTEN">Ho va ten</label>
            <input
              type="text"
              className="form-control"
              name="HOTEN"
              placeholder="Ho va ten"
              value={nhanVien.HOTEN}
              required
              onChange={handleOnchange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="SDT">So dien thoai</label>
            <input
              type="text"
              className="form-control"
              name="SDT"
              placeholder="So dien thoai"
              value={nhanVien.SDT}
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
              value={nhanVien.DIACHI}
              required
              onChange={handleOnchange}

            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="CHUCVU">Chuc vu</label>
            <input
              type="text"
              className="form-control"
              name="CHUCVU"
              placeholder="Chuc vu"
              value={nhanVien.CHUCVU}
              required
              onChange={handleOnchange}

            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="LUONG">Luong</label>
            <input
              type="text"
              className="form-control"
              name="LUONG"
              placeholder="Luong"
              value={nhanVien.LUONG}
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
           {id ==='new' ? "Create NhanVien" : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}
