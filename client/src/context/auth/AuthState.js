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

    const loadUser = async () =>{
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try{
            const res = await axios.get('/api/auth')
            console.log("load user =>\n", localStorage.token)
            dispatch({
                type: USER_LOADED,
                payload:res.data,
            })
        }catch(err){
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
    // REGISTER USER
    const register = async formData =>{
        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res  = await axios.post('/api/users', formData, config)           
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            })

            // wait REGISTER_SUCCESS dispatch complete set localStorage
            setTimeout(()=>{
                loadUser()
            }, 10)

        }catch(err){
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg,
            })
        }
    }
    // LOGIN USER
    const login = async formData =>{
        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res  = await axios.post('/api/auth', formData, config)           
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            })

            // wait REGISTER_SUCCESS dispatch complete set localStorage
            setTimeout(()=>{
                loadUser()
            }, 10)

        }catch(err){
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg,
            })
        }
    }
    // LOGOUT
    const logout = () =>{
        dispatch({
            type: LOGOUT
        })
    }
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
            loadUser,
            login,
            logout,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState