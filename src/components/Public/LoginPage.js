import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import '../assets/styles/LoginPage.css'
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema, showPassword } from '../utils/validationHelper';
import { contextData } from '../utils/DataContext';
import { useNavigate } from 'react-router-dom';
import { tokenGenerator } from '../utils/helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {

    const userData = useContext(contextData);
    const Users = userData['userData']
    const setCookie = userData['setCookie']

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(LoginSchema)
    });


    const myNavigator = useNavigate()

    const notify = () => {
        toast.error("Invalid credential !!!",
            {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                closeOnClick: true,
            })
    }

    //Handle Login
    const handleSubmit1 = (e) => {
        e.preventDefault()
        // eslint-disable-next-line
        let resErr = ''
        // eslint-disable-next-line
        let isValid = Users.some((user) => {
            if ((user.password === watch().password) && (user.email === watch().email)) {
                return true;
            }
            else {
                return false;
            }
        })
        if (isValid) {
            setCookie('token', tokenGenerator())
            myNavigator('/transaction')
        }
        else {
            notify()
        }
    }

    return (
        <div className='Login-page'>
            <h1>Login</h1>
            <form onSubmit={(e) => { handleSubmit()(handleSubmit1(e)) }}>

                <label>
                    <span> Email:</span>
                    <input type='text' placeholder='Enter Email' {...register('email')} />
                    {errors.email && <span className='error-msg'>{errors.email.message}</span>}
                </label>
                <label>
                    <span> Password:</span>
                    <input type='password' placeholder='Enter Password' {...register('password')} />

                    <button onClick={e => {
                        let MyNode = e.target.parentNode.childNodes[1];
                        if (MyNode.type === showPassword[1]) {
                            MyNode.type = showPassword[2]
                        }
                        else {
                            MyNode.type = showPassword[1]
                        }
                    }} type="button" className='show-btn'></button>
                    {errors.password && <span className='error-msg'>{errors.password.message}</span>}
                </label>
                <input type="submit" value="Login" />
                <ToastContainer autoClose={1000} />
            </form>
        </div >
    )
}

export default LoginPage
