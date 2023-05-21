import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NhanViensList from "./components/NhanViensList";
import EditAndAddNhanVien from './components/EditAndAddNhanVien';
import KhoList from './components/kho/KhoList';
import EditAndAddKho from './components/kho/EditAndAddKho';
import HoaDonList from './components/hoadon/HoaDonList';
import { Routes, Route, Link } from 'react-router-dom';
import EditAndAddHoaDon from './components/hoadon/EditAndAddHoaDon';
import CTHDList from './components/cthd/CTHDList';
import EditAndAddCTHD from './components/cthd/EditAndAddCTHD';
import SanPhamsList from './components/sanpham/SanPhamList';
import SLTonKhoList from './components/kho/SLTonKho';
import EditAndAddSLTonKho from './components/kho/EditAndAddSLTonKho';

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
              Nhan Vien
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/kho"} className="nav-link">
              Kho
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/sltonkho"} className="nav-link">
              SL ton kho
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/hoadon"} className="nav-link">
              Hoa Don
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/cthd"} className="nav-link">
              CTHD
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/sanpham"} className="nav-link">
              San Pham
            </Link>
          </li>
        </div>
      </nav>
      <div className="App mt-3">
        <Routes>
          <Route path='/' element={<NhanViensList/>}/>
          <Route path='/nhanViens' element={<NhanViensList/>}/>
          <Route path='/nhanVien/:id' element={<EditAndAddNhanVien/>}/>
          <Route path='/nhanVien/new/:id' element={<EditAndAddNhanVien/>}/>

          <Route path='/kho' element={<KhoList/>}/>
          <Route path='/kho/:id' element={<EditAndAddKho/>}/>
          
          <Route path='/sltonkho' element={<SLTonKhoList/>}/>
          <Route path='/sltonkho/:id' element={<EditAndAddSLTonKho/>}/>

          <Route path='/hoadon' element={<HoaDonList/>}/>
          <Route path='/hoadon/:id' element={<EditAndAddHoaDon/>}/>

          <Route path='/cthd' element={<CTHDList/>}/>
          <Route path='/cthd/:id' element={<EditAndAddCTHD/>}/>
          <Route path='/sanpham' element={<SanPhamsList/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
