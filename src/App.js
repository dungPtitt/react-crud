import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NhanViensList from "./components/NhanViensList";
import EditAndAddNhanVien from './components/EditAndAddNhanVien';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (


    <div className='App'>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/nhanViens" className="navbar-brand">
          CSDLPTNHOM6
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/nhanViens"} className="nav-link">
              NhanViens
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li> */}
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path='/' element={<NhanViensList/>}/>
          <Route path='/nhanViens' element={<NhanViensList/>}/>
          <Route path='/nhanVien/:id' element={<EditAndAddNhanVien/>}/>
          <Route path='/nhanVien/new/:id' element={<EditAndAddNhanVien/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
