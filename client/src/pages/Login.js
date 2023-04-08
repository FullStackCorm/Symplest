import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Spinner from '../components/Spinner';

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

  const handleCancel = () => {
    setDialogOpen(false);
  };

  return ( 
    <div>
      <form onSubmit={onSubmit}>
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
          endIcon={<LoginIcon/>}
        >
          Login
        </Button>
      </form>

      <span><Link to='/register'>Create an Account</Link></span>
    </div>
  )
}

export default Login