import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import hoadonService from '../../services/hoadonService';
import khoService from '../../services/khoService';
import nhanVienService from '../../services/nhanVienService';

export default function EditAndAddHoaDon() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [currentMaKho, setCurrentMaKho] = useState("");
  const [currentNhanVien, setCurrentNhanvien] = useState("");
  const [listKho, setListKho] = useState();
  const [listNhanVien, setListNhanVien] = useState();
  const [hoadon, setHoaDon] = useState({
    MAHD: "",
    MAKHO: "",
    MANV: "",
    TENKH: "",
    DIACHI: "",
    SDT: "",
    NGAY: "",
    TONGTIEN: ""
  });
  useEffect(()=>{
    khoService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          setListKho(response.data.data);
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

      nhanVienService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          console.log(response.data);
          setListNhanVien(response.data.data);
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
    hoadonService.get(id).then(
      (response) => {
        if(response.data.errCode===0){
          // console.log(response.data.data);
          setHoaDon(response.data.data[0]);
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
    let hoadonTmp = {...hoadon};
    hoadonTmp[e.target.name] = e.target.value;
    setHoaDon(hoadonTmp);
  }
  const handleOnchangeCheckbox = (e)=>{
    let hoadonTmp = {...hoadon};
    hoadonTmp[e.target.name] = e.target.checked?1:0;
    setHoaDon(hoadonTmp);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    hoadon.MAKHO = currentMaKho;
    hoadon.MANV = currentNhanVien;
    
    if(id==="new"){     
      hoadonService.create(hoadon).then(
      (response) => {
        console.log(response);
        console.log("CHECK DATA",currentNhanVien);
        if(response.data.errCode===0){
          navigate("/hoadon");
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
      console.log(hoadon);
      hoadonService.update(hoadon).then(response => {
        console.log(response);
        if(response.data.errCode===0){
          navigate("/hoadon");
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
  const changeNhanVien = (e)=>{
    setCurrentNhanvien(e.target.value);
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
            <label>Ma hoa don(HD06xxx)</label>
            <input
              type="text"
              className="form-control"
              name="MAHD"
              placeholder="Ma hoa don"
              value={hoadon.MAHD}
              disabled = {id==="new"?false: true}
              required
              onChange={handleOnchange}
            />
          </div>
          <div className="form-group col-md-6">
            <strong htmlFor="MAKHO">Ma kho</strong>
            <br></br>
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
          
          {/* <div className="form-group col-md-6">
            <label htmlFor="MANV">Ma nhan vien</label>
            <input
              type="text"
              className="form-control"
              name="MANV"
              placeholder="Ma nhan vien"
              value={hoadon.MANV}
              required
              onChange={handleOnchange}

            />
          </div> */}
          <div className="form-group col-md-6">
            <strong htmlFor="MANV">Ma nhan vien</strong>
            <br></br>
            <select 
            onChange={(event) => changeNhanVien(event)}
            value={currentNhanVien}
            >
              {listNhanVien && listNhanVien.map((nhanvien, index)=>{
                return <option key={index} value={nhanvien.MANV}>{nhanvien.MANV}</option>
              })

              }
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="TENKH">Ten khach hang</label>
            <input
              type="text"
              className="form-control"
              name="TENKH"
              placeholder="Ten khach hang"
              value={hoadon.TENKH}
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
              value={hoadon.DIACHI}
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
              value={hoadon.SDT}
              required
              onChange={handleOnchange}

            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="NGAY">Ngay</label>
            <input
              type="text"
              className="form-control"
              name="NGAY"
              placeholder="Ngay"
              value={hoadon.NGAY}
              required
              onChange={handleOnchange}

            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="TONGTIEN">Tong tien</label>
            <input
              type="text"
              className="form-control"
              name="TONGTIEN"
              placeholder="Tong tien"
              value={hoadon.TONGTIEN}
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
           {id ==='new' ? "Create HoaDon" : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}
