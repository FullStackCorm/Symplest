import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import { Box, Container, Button, TextField, Typography, AppBar, Toolbar } from '@mui/material';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import SymplestImage from '../images/symplest.png';
import CssBaseline from '@mui/material/CssBaseline';


const style = {
  color: 'primary.dark',
  input: { bgcolor: '#fff', color: 'primary.dark' },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'primary.main',
    },
  },
}

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
      <Container component='main' sx={style}>
        <CssBaseline />
        
        {/* Header */}
        <AppBar position='fixed' elevation={0} sx={{ bgcolor: 'primary.dark', color: 'text.main' }} >
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              {/* blank top navbar */}
            </Toolbar>
          </Container>
        </AppBar>

          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Container
              margin='normal'
              maxWidth='sm'
              sx={{ width: 1 }}
            >
              <img src={SymplestImage} 
                alt={'Symplest: your data, your choice'} 
                style={{ maxWidth: '100%', height: 'auto' }} 
              />
            </Container>
            
            <Typography component="h1" variant="h5" paddingTop='1rem'>
              Sign in
            </Typography>

            {/* Form */}
            <Box component='form' onSubmit={onSubmit} sx={{ mt: 1, maxWidth: 'sm' }}>
              <TextField
                margin='normal'
                id='email'
                variant='outlined'
                label='Email Address'
                type='email'
                name='email'
                autoComplete='email'
                autoFocus
                value={email}
                onChange={onChange}
                required
                sx={{ width: 1 }}
              />
              <TextField
                margin='normal'
                id='password'
                variant='outlined'
                label='Password'
                type='password'
                name='password'
                autoComplete='current-password'
                value={password}
                onChange={onChange}
                required
                sx={{ width: 1 }}
              />
              <Button
                type='submit'
                variant='contained'
                sx={{ width: 1, mt: 3, mb: 2, borderRadius: 5, bgcolor: 'button.dark', color: 'text.light', '&:hover': { bgcolor: 'button.darkHover', color: 'text.light' }}}
              >
                Sign In
              </Button>
              <Typography sx={{ mt: 1 }}><Link to='/register' color='text.main' className='reg-link'>Create an Account</Link></Typography>
            </Box>       
          </Box>        
        <Footer />
      </Container>
  );
}

export default Login