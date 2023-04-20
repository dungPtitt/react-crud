import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import PetsList from "./components/PetsList";
import EditAndAddPet from './components/EditAndAddPet';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (


    <div className='App'>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/pets" className="navbar-brand">
          dungptit
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/pets"} className="nav-link">
              Pets
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
          <Route path='/' element={<PetsList/>}/>
          <Route path='/pets' element={<PetsList/>}/>
          <Route path='/pet/:id' element={<EditAndAddPet/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
