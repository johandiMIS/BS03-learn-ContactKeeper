import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext)
    const {user, isAuthenticated} = authContext

    const authLink =(
        <Fragment>
            <li>
                Hello, {user && user.name}
            </li>
            <li>
                <a href='#!'>
                    <i className='fas fa-sign-out-alt'/> <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>)

    const guestLink = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/Login'>Login</Link>
            </li>
        </Fragment>)
    

    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon}/> {title}
            </h1>
            <ul>
                {isAuthenticated? authLink : guestLink}
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
}
Navbar.defaultProps = {
    title: "Contact Keeper",
    icon: "fas fa-id-card-alt"
}
export default Navbar