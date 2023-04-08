import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, register, reset } from '../features/auth/authSlice';
import TextField from '@mui/material/TextField';
import Spinner from '../components/Spinner';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password:'',
        confirmPwd: '',
    })

    const { name, email, password, confirmPwd } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/dashboard')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPwd) {
            toast.error('Error: Passwords to not match.')
        } else {
            const userData = {
                name,
                email,
                password,
            }

            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            onSubmit();
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center mx-auto my-5 py-5'>
                <div className='col-6'>
                    <form 
                        onSubmit={onSubmit}
                        onKeyPress={(e) => handleKeyPress(e)}
                        className='auth-form'
                    >
                        <h3 className='row justify-content-center'>Register</h3>
                        <div className='UNAME-FIELD form-outline mb-4'>
                            <label htmlFor='unameField'>Username</label>
                            <input 
                                id='name'
                                value={name}
                                variant='outlined'
                                type='text'
                                name='name'
                                placeholder='Jane123'
                                onChange={onChange}
                                required
                                className='form-control'
                            />  
                        </div>
                        <div className='EMAIL-FIELD form-outline mb-4'>
                            <label htmlFor='emailField'>Email Address</label>
                            <input
                                id='email'
                                value={email}
                                type='email'
                                name='email'
                                placeholder='example@email.com'
                                onChange={onChange}
                                required
                                className='form-control'
                            />
                        </div>
                        <div className='PASSWORD-FIELD form-outline mb-4'>
                            <label htmlFor='passwordField'>Password</label>
                            <input
                                id='password'
                                value={password}
                                type='password'
                                name='password'
                                placeholder='********'
                                onChange={onChange}
                                required
                                className='form-control'
                            />
                        </div>
                        <div className='CONFIRMPWD-FIELD form-outline mb-4'>
                            <label htmlFor='confirmPwdField'>Confirm Password</label>
                            <input
                            id='confirmPwd'
                            value={confirmPwd}
                            type='password'
                            name='confirmPwd'
                            placeholder='********'
                            onChange={onChange}
                            required
                            className='form-control'
                        />
                        </div>
                            <span className='row justify-content-center text-center'>By signing up, you agree to the Terms and Conditions.</span> 
                        <br />
                        <div className='text-center'>
                            <button
                                onClick={onSubmit}
                                className='LOGIN-BTN form-outline btn midBlue'
                                type='submit'
                            >Sign up
                            </button>
                        </div>
                        <span className='row justify-content-center text-center'><Link to='/login'>Already have an account? Sign in</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}

