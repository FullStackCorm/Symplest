import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import SymplestImage from '../images/symplest.png';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const [openDialog, setDialogOpen] = useState(true);

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
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

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return ( 
    <div>
      <img src={SymplestImage} alt={'Symplest: your data, your choice'} className='symplest-image img-fluid ' />
      <div class='container mt-5'>
        <form onSubmit={onSubmit} className='pt-5 pl-5 pr-5'>
          <Stack
            direction='column'
            spacing={2}
          >
            <TextField
            id=''
            variant='outlined'
            label='email'
            type='email'
            name='email'
            placeholder='example@email.com'
            value={email}
            onChange={onChange}
            required 
          />

          <TextField
            id=''
            variant='outlined'
            label='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />

          <Button
            type='submit'
            variant='contained'
            size='large'
          >
            Login
          </Button>
          </Stack>
        </form>
      <span><Link to='/register'>Create an Account</Link></span>
      </div>
      <Footer />
    </div>
  )
}

export default Login