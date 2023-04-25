import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMedication } from '../../features/medications/medSlice';

// MUI //
import { TextField, Button, Stack, Select, MenuItem } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, white, purple } from '../../colors';

const theme = createTheme({
  palette: {
      primary: {
      main: purple[700],
      light: purple[400],
      dark: purple[800],
      contrastText: blue[50]
      },
      secondary: {
          main: blue[100],
          light: blue[50],
          dark: blue[400],
          contrastText: blue[700]
      },
      text: {
          main: white[100]
      }
  }
});

const style = {
  color: 'primary.dark',
  backgroundColor: '#fafafa',
  input: { color: 'primary.dark' }
}

const UpdateMedForm = (props) => {

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

      dispatch(updateMedication({name, strength, doseForm, directions, timeOfDay, prescriber}))
      setName('')
      setStrength('')
      setDoseForm('')
      setDirections('')
      setPrescriber('')
      setTimeOfDay('')
    
    };

    return (
      <ThemeProvider theme={theme}>
        <form onSubmit={onSubmit} sx={style}>
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
              sx={style}
            />
            <TextField
              type='text'
              variant='outlined'
              placeholder='Strength'
              name='strength'
              value={strength}
              onChange={(e) => setStrength(e.target.value)}
              sx={style}
            />
            <Select
              onChange={(e) => setDoseForm(e.target.value)}
              defaultValue='mg' placeholder='Dose Form'
              sx={style}
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
              sx={style}
            />
            <TextField
              type='text'
              variant='outlined'
              placeholder='Prescriber'
              name='prescriber'
              value={prescriber}
              onChange={(e) => setPrescriber(e.target.value)}
              sx={style}
            />
            <Select
              onChange={(e) => setTimeOfDay(e.target.value)}
              defaultValue='Morning' placeholder='Time of Day'
              sx={style}
            >
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
              sx={{
                bgcolor: 'primary.dark',
                color: 'text.main',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'text.main'
                }
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </ThemeProvider>
      );
}

export default UpdateMedForm