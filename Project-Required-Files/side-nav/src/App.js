
import { Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Layout from './Layout/layout/Layout';


 

function App() {
  return (
  <>
  {/* <Sidebar/> */}
  <Routes>
    <Route path='/' element={<Layout/>}>
    <Route path="/" element ={<Home/>}/>
    <Route path="/dashboard" element ={<Dashboard/>}/>
    <Route path="/about" element ={<About/>}/>
    <Route path="/services" element ={<Services/>}/>
    <Route path="/contact" element ={<Contact/>}/>
    </Route>
  </Routes>

  </>
  );
}

export default App;
