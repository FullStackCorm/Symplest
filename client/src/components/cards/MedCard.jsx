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
          <Card sx={{ backgroundColor: '#FFFFFF', borderRadius: 2 }}>
            <CardContent>
              <Typography variant='h5' component='div'>
                Medications
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>  
  );
}

export default MedCard