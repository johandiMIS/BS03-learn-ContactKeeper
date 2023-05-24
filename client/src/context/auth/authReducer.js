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

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action)=>{
    switch(action.type){
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                loading:false,
                isAuthenticated:true,
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                loading:false,
                isAuthenticated:false,
                user: null,
                error: action.payload,
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading:false,
                user:action.payload,
            }
        case LOGIN_SUCCESS:
            return null
        case LOGIN_FAIL:
            return null
        case LOGOUT:
            return null
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}