import { useDispatch } from 'react-redux';
import {deleteMedication} from '../../features/medications/medSlice';
import {  Box, Button, Card, CardHeader, CardContent, Container, Grid, Typography, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// https://mui.com/material-ui/react-dialog/ to confirm delete medication

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
          <Card sx={{ height: 250, width: 330 }}>
            <CardContent>
              <CardHeader
                variant='h1' 
                title={`Medication: ${medication.name} ${medication.strength}${medication.doseForm}`}
              />
              <Typography variant='body1'>
                Directions: {medication.directions}
              </Typography>
              <Typography variant='caption'>
                Time of Day: {medication.timeOfDay} | Prescriber: {medication.prescriber}
              </Typography>
              <br />
              <Typography variant='button'>
                <Button>
                  <EditIcon />
                </Button>
                <Button
                  onClick={() => dispatch(deleteMedication(medication._id))} 
                >
                  <DeleteIcon />
                </Button>
              </Typography>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
    </div>  
  );
}

export default MedCard