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
import MedFormModal from '../components/modals/MedFormModal';
import PainChart from '../components/data/PainChart';
import Notes from '../pages/Notes';

// MUI //
import { Box, Grid, Container } from '@mui/material';
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
          main: brand[500], // slate
          light: brand[50], // ivory
          dark: brand[600], //dark slate
          contrastText: brand[200] // light pink
        },
        button: {
          main: brand[200],
          hover: brand[100],
          light: brand[100],
          lightHover: brand[50],
          dark: brand[600],
          darkHover: brand[500],
        },
        input: {
          main: brand[50],
          light: brand[100],
        },
        bg: {
          main: brand[800],
          light: brand[50],
          dark: brand[100],
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
        <Container maxWidth='xl' bgcolor='red'>
        <Navbar />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >    
            <Grid container spacing={2} sx={{ mt: 5, maxWidth: 'lg' }}>
              <Grid item xs={12} sm={6}>
                <Medications />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Symptoms />
              </Grid>
            </Grid>
          </Box>       
        <Footer />
        </Container>
      
      </ThemeProvider>        
    );
}