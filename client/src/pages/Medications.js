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
import { Typography, Grid, Paper } from '@mui/material';

function Medications() {

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
    
        <Paper elevation={3} sx={{ bgcolor: 'primary.dark', p: '2rem', borderRadius: 5 }}>
            <div
              style={{
                margin: 'auto',
              }}>
              <section>
                  <Grid container justifyContent='center'>
                    <Grid item md={12} xs={10}>
                      <Typography component='h2' variant='h4' sx={{ color: 'text.light' }}>Medications</Typography>
                      <MedFormModal />
                      <hr />
                      <MedDataGridTable />
                    </Grid>
                  </Grid>                      
              </section>
            </div>
        </Paper>     
      );
}

export default Medications