import React, { useContext, useEffect } from 'react'
import Contact from '../contacts/Contact'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'
const Home = props => {
  const authContext = useContext(AuthContext)
  const {loadUser} = authContext
  useEffect(()=>{
    if(localStorage.getItem('token') !== null){
      loadUser()
    }
    // eslint-disable-next-line
  },[])
  return (
    <div className='grid-2'>
      <div>
        <ContactForm/>
      </div>
      <div>
        <ContactFilter/>
        <Contact/>
      </div>
    </div>
  )
}

// Home.propTypes = {}

export default Home