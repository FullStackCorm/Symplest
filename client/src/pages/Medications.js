import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components //
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
    
        <Paper elevation={3} sx={{ bgcolor: 'white', p: '2rem', borderRadius: 5, border: 1, borderColor: 'text.light', maxWidth: 1200 }} xs={12}>
            <div
              style={{
                margin: 'auto',
              }}>
                  <Grid container sx={{ justifyContent: 'center'}}>
                    <Grid item md={12} xs={8}>
                      <Typography component='h2' variant='h5' sx={{ color: 'text.dark' }}>Medications</Typography>
                      <MedDataGridTable />
                    </Grid>
                  </Grid>                      
            </div>
        </Paper>     
      );
}

export default Medications