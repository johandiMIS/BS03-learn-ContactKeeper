import './App.css';
import Navbar from './components/layout/Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home'
import About from './components/pages/About'
import ContactState from './context/contact/ContactState';

const App = () => {
  return (
    <ContactState>
      <BrowserRouter>
        <div className="App"> 
          <Navbar/>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ContactState>
  )
  
}

export default App;
