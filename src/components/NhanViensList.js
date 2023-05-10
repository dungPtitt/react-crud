import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import nhanVienService from "../services/nhanVienService";

const NhanViensList = () => {
  const [nhanViens, setNhanViens] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();
  const id="";
  useEffect(() => {
    retrieveNhanViens();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveNhanViens = () => {
    try{
      nhanVienService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          console.log(response.data);
          setNhanViens(response.data.data);
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
  const handleDeleteNhanVien = (idNhanVien)=>{
    try{
      console.log(idNhanVien);
      nhanVienService.remove(idNhanVien);
      // window.location.reload();
    }catch(e){
      console.log(e);
    }
  }

  const findByTitle = () => {
    try{
      nhanVienService.findByName(searchTitle)
      .then(response => {
        if(response.data.errCode===0){
          setNhanViens(response.data.data);
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
              <th>STT</th>
              <th>Ho va ten </th>
              <th>So dien thoai</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {nhanViens&&
              nhanViens.map((nhanVien, index)=>(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{nhanVien.HOTEN}</td>
                  <td>{nhanVien.SDT}</td>
                  {/* <td>{nhanVien.race}</td>
                  <td>
                    <input type="checkbox" checked={nhanVien.vaccinated===1?true:false} disabled/>
                  </td> */}
                  <td>
                    <button className="btn btn-warning" onClick={()=>navigate(`/nhanVien/${nhanVien.MANV}`)}>Edit</button>
                    <button className="btn btn-danger" onClick={()=>{handleDeleteNhanVien(nhanVien.MANV)}}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <button className="btn btn-success mt-3" onClick={()=>navigate(`/nhanVien/new`)}>New NhanVien</button>
      </div>
    </div>
  );
};

export default NhanViensList;