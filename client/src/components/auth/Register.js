import React, { useContext, useEffect, useState } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'
import {useNavigate} from 'react-router-dom'
const Register = props => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const {setAlert} = alertContext
    const {register, error, clearError, isAuthenticated} = authContext
    const navigate = useNavigate()
    useEffect(()=>{
        if(isAuthenticated && authContext.user !== null){
            navigate('/')
        }
        if(error){
            setAlert(error, 'danger')
        }
        clearError()
        // eslint-disable-next-line
    }, [error, isAuthenticated, authContext.user])

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        password2:"",
    })

    const {name, email, password, password2} = user

    const onChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        if (name === '' || email === '' || password === ''){
            setAlert('please enter all field', 'danger')
        }
        else if (password !== password2){
            setAlert('password do not match ', 'danger')
        }
        else{
            register({
                username:name,
                email,
                password,
            })
        }
    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={onChange} required/>
                </div>  
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required/>
                </div>  
                <div className='form-group'>
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} required/>
                </div>  
                <input type="submit" value="Register" className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default Register