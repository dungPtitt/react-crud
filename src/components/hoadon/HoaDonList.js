import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import hoadonService from "../../services/hoadonService";

const HoaDonList = () => {
  const [hoadons, setHoaDons] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    retrieveHoaDons();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveHoaDons = () => {
    try{
      hoadonService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          console.log(response.data);
          setHoaDons(response.data.data);
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
  const handleDeleteHoaDon = (idHoaDon)=>{
    try{
      console.log(idHoaDon);
      hoadonService.remove(idHoaDon).then((response)=>{
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
      hoadonService.findByName(searchTitle)
      .then(response => {
        if(response.data.errCode===0){
          setHoaDons(response.data.data);
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
              <th>Ma kho </th>
              <th>Ma Nhan vien</th>
              <th>Ten khach hang</th>
              <th>Dia chi</th>
              <th>Sdt</th>
              <th>Ngay</th>
              <th>Tong tien</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hoadons&&
              hoadons.map((hoadon, index)=>(
                <tr key={index}>
                  <td>{hoadon.MAHD}</td>
                  <td>{hoadon.MAKHO}</td>
                  <td>{hoadon.MANV}</td>
                  <td>{hoadon.TENKH}</td>
                  <td>{hoadon.DIACHI}</td>
                  <td>{hoadon.SDT}</td>
                  <td>{hoadon.NGAY}</td>
                  <td>{hoadon.TONGTIEN}</td>
                  
                  <td>
                    <button className="btn btn-warning" onClick={()=>navigate(`/hoadon/${hoadon.MAHD}`)}>Edit</button>
                    <button className="btn btn-danger" onClick={()=>{handleDeleteHoaDon(hoadon.MAHD)}}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <button className="btn btn-success mt-3" onClick={()=>navigate(`/hoadon/new`)}>New HoaDon</button>
      </div>
    </div>
  );
};

export default HoaDonList;