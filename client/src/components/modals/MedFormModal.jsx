import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMedication } from '../../features/medications/medSlice';
import { Modal, Typography, Button, Box, Grid } from '@mui/material';
import MedForm from '../forms/MedForm';
import FilterMedsMenu from '../FilterMedsMenu';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#3D3737',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const addButtonStyle = {
  backgroundColor: '#524747',
  color: '#C69F9F',
  borderRadius: 5,
  m: 1,
  '&:hover': {
    backgroundColor: '#C69F9F',
    color: '#F8F8F8',
  }
}

const MedFormModal = (props) => {

    const [name, setName] = useState('');
    const [strength, setStrength] = useState('');
    const [doseForm, setDoseForm] = useState('');
    const [directions, setDirections] = useState('');
    const [timeOfDay, setTimeOfDay] = useState('');
    const [prescriber, setPrescriber] = useState('');
    
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const onSubmit = (e) => {
      e.preventDefault();

      dispatch(createMedication({name, strength, doseForm, directions, timeOfDay, prescriber}))
      setName('')
      setStrength('')
      setDoseForm('')
      setDirections('')
      setPrescriber('')
      setTimeOfDay('')
 
    };

    return (
        <div>
          <form onSubmit={onSubmit}>
              <Grid container justifyContent='center'>
                  <Button 
                    sx={addButtonStyle}
                    onClick={handleOpen}>
                      + Add New Medication
                  </Button>
                  <FilterMedsMenu />
              </Grid>                   
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
              keepMounted
            >
              <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6' component='h2' color='#E89D9D' marginBottom='1em'>
                    Add a New Medication
                </Typography> 
                <MedForm />
              </Box>
            </Modal>
          </form>     
       </div>
      );
}

export default MedFormModal