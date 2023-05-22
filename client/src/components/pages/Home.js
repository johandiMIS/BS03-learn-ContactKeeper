import React from 'react'
import Contact from '../contacts/Contact'
import ContactForm from '../contacts/ContactForm'
// import PropTypes from 'prop-types'

const Home = props => {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm/>
      </div>
      <div>
        <Contact/>
      </div>
    </div>
  )
}

// Home.propTypes = {}

export default Home