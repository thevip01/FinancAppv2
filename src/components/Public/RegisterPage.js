import React, { createContext, useContext } from 'react'
import { useForm } from 'react-hook-form'
import '../assets/styles/LoginPage.css'
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../utils/validationHelper';
import { contextData } from '../utils/DataContext';
import { Link } from 'react-router-dom';

const RegisterPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(LoginSchema)
    });

    const contextD = useContext(contextData)

    const setUserData = contextD['setUserData']
    const userData = contextD['userData']

    const FieldGenerator = (label, name, dType) => {
        return (
            <label>
                <span> {label} :</span>
                <input type={dType ? dType : 'text'} placeholder={label} {...register(name)} />
                {errors[name] && <span className='error-msg'>{errors[name].message}</span>}
            </label>
        )
    }

    return (
        <div className='Login-page'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(data => {
                const dummyData = userData
                dummyData.push(data)
                setUserData(dummyData)
            }
            )}>
                {FieldGenerator('First Name', 'firstName')}
                {FieldGenerator('Last Name', 'lastName')}
                {FieldGenerator('Phone Number', 'phone')}
                {FieldGenerator('Email', 'email')}
                {FieldGenerator('Password', 'password', 'password')}
                {FieldGenerator('Confirm Password', 'confirmPassword', 'password')}
                <input type="submit" value="Register" />
            </form>
            <Link to={'/login'} >Login</Link>
        </div>
    )
}

export default RegisterPage
