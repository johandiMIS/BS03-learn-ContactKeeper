import React, {Fragment, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import {Navigate} from 'react-router-dom'

const PrivateRoute = (props) => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated, loading, loadUser} = authContext
    
    useEffect(()=>{
        if(localStorage.getItem('token') !== null){
            loadUser()
        }
        // eslint-disable-next-line
      },[])

    if(!(isAuthenticated && !loading)){
        return <Navigate to={'/login'} replace/>
    }
    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

export default PrivateRoute