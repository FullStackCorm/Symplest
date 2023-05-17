import {useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getNotes } from '../features/notes/noteSlice';
import { reset } from '../features/auth/authSlice';

// Components //
import Medications from './Medications';
import Symptoms from './Symptoms';

// MUI //
import { Grid, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brand } from '../colors';

export default function Dashboard () {

    const theme = createTheme({
      palette: {
        primary: {
          main: brand[200], // dark pink
          light: brand[50], // light pink
          dark: brand[600], // slate
        },
        text: {
          main: brand[500],
          light: brand[50],
          dark: brand[600],
          contrastText: brand[700]
        },
        button: {
          main: brand[400],
          hover: brand[300],
          light: brand[100],
          lightHover: brand[50],
          dark: brand[500],
          darkHover: brand[600],
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
        <Container sx={{ minHeight: '100vh', maxHeight: '100vh', maxWidth: '100vw', }}>
            <Navbar />
            <div 
            className='container'
            style={{
              margin: 'auto',
              marginTop: '5rem',
              bgcolor: 'primary.main'
            }}
            >
              <Grid
                container
                spacing={0}
                direction='column'
                alignItems='center'
                justifyContent='center'
              >
                { /* Med Chart */}
                {/* <Grid item xs={8}>
                  <Medications />
                </Grid> */}

                {/* <Grid item md={4}>
                  <Symptoms />    
                </Grid>   */}

                { /* Symptoms */}  
    
              </Grid>              
            </div>
            <Footer />
        </Container>
      </ThemeProvider>
        
    )
}