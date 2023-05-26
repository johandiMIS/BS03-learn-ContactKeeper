import React, { useContext, useEffect } from 'react'
import Contact from '../contacts/Contact'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'
const Home = props => {
  const authContext = useContext(AuthContext)
  const contactContext = useContext(ContactContext)
  const {loadUser} = authContext
  const {getContact} = contactContext
  useEffect(()=>{
    if(localStorage.getItem('token') !== null){
      loadUser()
      getContact()
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