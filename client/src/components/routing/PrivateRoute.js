import React, {Fragment, useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import {Navigate} from 'react-router-dom'

const PrivateRoute = (props) => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated, loading} = authContext

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