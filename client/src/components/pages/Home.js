import React from 'react'
import Contact from '../contacts/Contact'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'

const Home = props => {
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