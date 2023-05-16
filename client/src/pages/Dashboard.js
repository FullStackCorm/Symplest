import {useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NoteForm from '../components/forms/NoteForm';
import { getNotes } from '../features/notes/noteSlice';
import { reset } from '../features/auth/authSlice';
import Medications from './Medications';

// MUI //
import { Box, Grid, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brand } from '../colors';

export default function Dashboard () {

    const theme = createTheme({
      palette: {
        primary: {
          main: brand[400],
          light: brand[300],
          dark: brand[600],
        },
        secondary: {
          main: brand[300],
          light: brand[200],
          dark: brand[700]
        },
        background: {
          main: brand[600],
          light: brand[400],
          lightest: brand[300],
          dark: brand[800]
        },
        paper: {
          main: brand[600]
        },
        text: {
          main: brand[800],
          light: brand[50],
          contrastText: brand[700]
        },
        button: {
          main: brand[500],
          hover: brand[400],
          light: brand[50],
          lightHover: brand[100],
          dark: brand[600],
          darkHover: brand[800],
          contrast: brand[100],
          bright: brand[700]
        },
        input: {
          main: brand[50],
        }
      }
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {notes, isLoading, isError, message} = useSelector((state) => state.notes)

    useEffect(() => {
      if(isError) {
        console.log(message)
      }

      if(!user) {
        navigate('/login')
      }

      dispatch(getNotes())

      return () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading) {
      return <Spinner />
    }

    return (
      <ThemeProvider theme={theme}>
        <Container sx={{ minHeight: '100vh', maxHeight: '100vh'}}>
            <Navbar />
            <div 
            className='container'
            style={{
              margin: 'auto',
              marginTop: '5rem',
              bgcolor: 'background.main'
            }}
            >
              <Grid
                container
                spacing={0}
                direction='column'
                alignItems='center'
                justifyContent='center'
              >
                <Box>
                  <Medications />
                </Box>              
              </Grid>              
            </div>
            <Footer />
        </Container>
      </ThemeProvider>
        
    )
}