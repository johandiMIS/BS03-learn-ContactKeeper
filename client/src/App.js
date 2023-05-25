import './App.css';
import Navbar from './components/layout/Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home'
import About from './components/pages/About'
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if(localStorage.getItem('token')){
  setAuthToken(localStorage.getItem('token'))
}

const App = () => {
  return (
    <AlertState>
      <AuthState>
        <ContactState>
          <BrowserRouter>
            <div className="App"> 
              <Navbar/>
              <div className='container'>
                <Alerts/>
                <Routes>
                  <Route path='/' element={
                    <PrivateRoute>
                      <Home/>
                    </PrivateRoute>
                  }/>
                  <Route path='/about' element={<About/>}/>
                  <Route path='/register' element={<Register/>}/>
                  <Route path='/login' element={<Login/>}/>
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </ContactState>
      </AuthState>
    </AlertState>
  )
  
}

export default App;
