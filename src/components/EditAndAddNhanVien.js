import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import nhanVienService from '../services/nhanVienService';

export default function EditAndAddNhanVien() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [nhanVien, setNhanVien] = useState({
    MANV: id,
    HOTEN: "",
    SDT: "",
  });
  useEffect(()=>{
    if(id==='new') return;
    nhanVienService.get(id)
      .then(response => {
        if(response.data.errCode===0){
          console.log(response.data.data);
          setNhanVien(response.data.data[0]);
        }else{
          console.log(response.errMessage);
        }
      })
      .catch(e => {
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
      nhanVienService.create(nhanVien)
      .then(response => {
        console.log(response);
        if(response.data.errCode===0){
          
        }
      })
      .catch(e => {
        console.log(e);
      });
      
    }else{
      console.log(nhanVien);
      nhanVienService.update(nhanVien);
    }
    navigate("/");
    window.location.reload();
    // props.history.push("/");
  }
  return (
    <div className="container">
      <form>
        <div className="form-row">
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
            <label htmlFor="SDT"></label>
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
        </div>
        {/* <input type="text" name="id" value={id} hidden /> */}
        <div className="form-group mt-3">
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
