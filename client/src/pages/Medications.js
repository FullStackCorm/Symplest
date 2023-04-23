import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components //
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import MedDataGridTable from '../components/data/MedDataGrid';
import MedFormModal from '../components/modals/MedFormModal';
import { getMedications } from '../features/medications/medSlice';
import { reset } from '../features/auth/authSlice';

// MUI //
import { Typography, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brown, pink, blue, ivory } from '../colors';

function Medications() {

  const theme = createTheme({
    palette: {
        primary: {
            main: blue[200],
            light: brown[100],
            dark: blue[500],
            contrastText: brown[50]
        },
        secondary: {
            main: pink[100],
            contrastText: pink[50]
        },
        text: {
            main: ivory[50]
        }
    }

  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth)
  const { medications, isLoading, isError, message } = useSelector((state) => state.medications)

  useEffect(() => {
      if (isError) {
          console.log(message)
  }
      if (!user) {
          navigate('/login')
      }

      dispatch(getMedications())
      return () => {
          dispatch(reset())
      }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
      return <Spinner />
  }

    return (
      <ThemeProvider theme={theme}>
        <div>
          <Navbar />
            <div
              style={{
                margin: 'auto',
                marginTop: '5rem',
              }}>
              <section>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography component='h1' variant='h3' sx={{ color: 'black' }}> All Medications</Typography>
                      <MedFormModal />
                      <hr />
                      <MedDataGridTable />
                    </Grid>
                  </Grid>                      
              </section>
            </div>
          <Footer />
        </div>
      </ThemeProvider>       
      );
}

export default Medications