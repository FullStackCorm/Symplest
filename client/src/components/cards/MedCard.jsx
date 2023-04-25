import { useDispatch } from 'react-redux';
import { deleteMedication } from '../../features/medications/medSlice';
import {  Box, Button, Card, CardHeader, CardContent, Container, Grid, Typography, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function MedCard({medication}) {
    const dispatch = useDispatch()

  return (
    <div>
      <Grid 
        container
        spacing={2} 
        margin='auto'
        direction='column'
        alignItems='center'
        justifyContent='center' 
      > 
        <Grid item xs={12}>
          <Card sx={{ height: 250, width: 330, backgroundColor: '#FFFFFF', borderRadius: 2 }}>
            <CardContent>
              <Box
                sx={{ color: '#343232', backgroundColor: '#F8F8F8', borderRadius: 3 }}
              >
                <CardHeader
                  variant='h1' 
                  title={`${medication.name} ${medication.strength}${medication.doseForm}`}
                  />
                <Typography variant='body1'>
                  Directions: {medication.directions}
                </Typography>
                <Typography variant='body2'>
                Time of Day: {medication.timeOfDay} | Prescriber: {medication.prescriber}
                </Typography>
                <br />
                <Typography variant='button'>
                  <Button sx={{ color: '#08b19c', p: 2 }}>
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => dispatch(deleteMedication(medication._id))} 
                    sx={{ color: '#372186', p: 2 }}
                  >
                    <DeleteIcon />
                  </Button>
                </Typography>
              </Box> 
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>  
  );
}

export default MedCard