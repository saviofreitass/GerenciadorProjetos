import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './layout/Navbar';
import Projects from './pages/Projects';
import Project from './pages/Project';
import Home from './pages/Home';
import CriarTarefa from './pages/CriarTarefa';
import CriarProjeto from './pages/CriarProjeto';
import EditarProjeto from './pages/EditarProjeto';
import EditarTarefa from './pages/EditarTarefa';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route path="/projetos" element={<Projects/>}></Route>
        <Route path="/projetos/:id" element={<Project/>}></Route>
        <Route path="/projetos/:id/novaTarefa" element={<CriarTarefa/>}></Route>
        <Route path="/novoProjeto" element={<CriarProjeto/>}></Route>
        <Route path='/projetos/:id/editarProjeto' element={<EditarProjeto/>}></Route>
        <Route path='/projetos/:projetoId/editarTarefa/:id' element={<EditarTarefa/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
