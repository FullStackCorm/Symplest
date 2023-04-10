import { useDispatch } from 'react-redux';
import { createMedication } from '../../features/medications/medSlice';
import React, { useState } from 'react';
import { TextField, Button, Stack, Select, MenuItem } from '@mui/material';

const MedForm = (props) => {

    const [name, setName] = useState('');
    const [strength, setStrength] = useState('');
    const [doseForm, setDoseForm] = useState('');
    const [directions, setDirections] = useState('');
    const [timeOfDay, setTimeOfDay] = useState('');
    const [prescriber, setPrescriber] = useState('');
    
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
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
                  <form onSubmit={onSubmit}>
                    <Stack
                      direction='column'
                      spacing={2}
                    >
                      <TextField
                        type='text'
                        variant='outlined'
                        placeholder='Medication Name'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <TextField
                        type='text'
                        variant='outlined'
                        placeholder='Strength'
                        name='strength'
                        value={strength}
                        onChange={(e) => setStrength(e.target.value)}
                      />
                      <Select
                        // sx={{
                        //   marginTop: 1,
                        //   width: 250,
                        //   height: 50,
                        // }}
                        onChange={(e) => setDoseForm(e.target.value)}
                        defaultValue='mg' placeholder='Dose Form'
                      >
                        <MenuItem value='mg'>mg</MenuItem>
                        <MenuItem value='mcg'>mcg</MenuItem>
                        <MenuItem value='mL'>mL</MenuItem>
                        <MenuItem value='mg/mL'>mg/mL</MenuItem>
                      </Select>
                      <TextField
                        type='text'
                        variant='outlined'
                        placeholder='Directions'
                        name='directions'
                        value={directions}
                        onChange={(e) => setDirections(e.target.value)}
                      />
                      <TextField
                        type='text'
                        variant='outlined'
                        placeholder='Prescriber'
                        name='prescriber'
                        value={prescriber}
                        onChange={(e) => setPrescriber(e.target.value)}
                      />
                      <Select
                        onChange={(e) => setTimeOfDay(e.target.value)}
                        defaultValue='Morning' placeholder='Time of Day'>
                        <MenuItem value='Morning'>Morning</MenuItem>
                        <MenuItem value='Noon'>Noon</MenuItem>
                        <MenuItem value='Afternoon'>Afternoon</MenuItem>
                        <MenuItem value='Evening'>Evening</MenuItem>
                        <MenuItem value='Bedtime'>Bedtime</MenuItem>
                        <MenuItem value='As Needed'>As Needed</MenuItem>
                        <MenuItem value='Twice Daily'>Twice Daily</MenuItem>
                        <MenuItem value='Three Times Daily'>Three Times Daily</MenuItem>
                      </Select>
                      <Button
                        type='submit'
                      >
                        Submit
                      </Button>
                    </Stack>
                  </form>
      );
}

export default MedForm