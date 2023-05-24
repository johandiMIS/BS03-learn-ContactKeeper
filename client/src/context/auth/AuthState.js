import React, {useReducer} from 'react'
import authReducer from './authReducer'
import AuthContext from './authContext'
import axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types'
import setAuthToken from '../../utils/setAuthToken'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
    }
    const [state, dispatch] = useReducer(authReducer, initialState)

    // LOAD USER
    const loadUser = () =>{
        if(localStorage.getItem('token')){
            setAuthToken(localStorage.getItem('token'))
        }
        Promise.resolve()
        .then(()=>{
            axios.get('/api/auth')
            console.log("2")
        })
        .then((res)=>{
            dispatch({
                type: USER_LOADED,
                payload:res.data,
            })
            console.log("3")
        })
        .catch(()=>{
            dispatch({
                type: AUTH_ERROR
            })
        })
    }
    // REGISTER USER
    const register = formData =>{
        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.post('/api/users', formData, config)
        .then(res =>{
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            })
        })
        .then( loadUser() )
        .catch((err)=>{
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg,
            })
        })
    }
    // LOGIN USER

    // LOGOUT

    // CLEAR ERRORS
    const clearError = ()=>{
        dispatch({
            type: CLEAR_ERRORS
        })
    }
    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            clearError,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState