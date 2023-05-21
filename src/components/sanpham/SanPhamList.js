import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import sanPhamService from "../../services/sanPhamService";

const SanPhamsList = () => {
  const [sanPhams, setSanPhams] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const id="";
  useEffect(() => {
    retrieveSanPhams();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveSanPhams = () => {
    try{
      sanPhamService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          console.log(response.data);
          setSanPhams(response.data.data);
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
    }catch(e){
      console.log(e);
    }
    
  };
  const handleDeleteSanPham = (idSanPham)=>{
    try{
      console.log(idSanPham);
      sanPhamService.remove(idSanPham).then((response)=>{
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
        <h4> Danh Sach San Pham</h4>
        <table className="table">
          <thead className="table-success">
            <tr>
              <th>STT</th>
              <th>Ma San pham </th>
              <th>Ten San pham</th>
              <th>Don vi tinh</th>
              <th>Gia</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sanPhams&&
              sanPhams.map((sanPham, index)=>(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{sanPham.MASP}</td>
                  <td>{sanPham.TENSP}</td>
                  <td>{sanPham.DVTINH}</td>
                  <td>{sanPham.GIA}</td>
                  <td>
                    <button className="btn btn-warning" disabled onClick={()=>navigate(`/sanPham/${sanPham.MANV}`)}>Edit</button>
                    <button className="btn btn-danger" disabled onClick={()=>{handleDeleteSanPham(sanPham.MANV)}}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <button className="btn btn-success mt-3" disabled onClick={()=>navigate(`/sanPham/new`)}>New SanPham</button>
      </div>
    </div>
  );
};

export default SanPhamsList;