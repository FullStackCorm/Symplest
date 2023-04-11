import { useDispatch } from 'react-redux';
import {deleteMedication} from '../../features/medications/medSlice';
import { Container, Grid, Box, Button } from '@mui/material';

// https://mui.com/material-ui/react-dialog/ to confirm delete medication

function MedCard({medication}) {
    const dispatch = useDispatch()

  return (
    <div>
      <Grid container margin='auto' width='80%'> 
        <Grid item xs={12}>
          <h5>Medication: {medication.name} {medication.strength}{medication.doseForm}</h5>
        </Grid>
        <Grid item xs={12}>
          <span>Directions: {medication.directions}</span>
        </Grid>
        <Grid item xs={12} md={6}>
          <span>Time of Day: {medication.timeOfDay}</span>
        </Grid>
        <Grid item xs={12} md={6}>
          <span>Prescriber: {medication.prescriber}</span>
        </Grid>

        <Grid item xs={6}>
          <Button 
            type='button' 
          >
            Edit Medication
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            type='button'
            onClick={() => dispatch(deleteMedication(medication._id))} 
          >
            Delete Medication
          </Button>
        </Grid>   
      </Grid> 
      <hr />
    </div>  
  );
}

export default MedCard