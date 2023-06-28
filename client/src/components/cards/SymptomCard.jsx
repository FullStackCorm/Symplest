import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSymptom } from '../../features/symptoms/symptomSlice';
import dayjs from 'dayjs';

// MUI //
import { styled, Card, CardHeader, CardContent, CardActions, Collapse, IconButton, Typography, Stack, Icon, Button, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brand } from '../../colors';

const theme = createTheme({
  palette: {
      text: {
          light: brand[50]
      },
      button: {
          light: brand[50]
      }
  },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
  }),
}));

export default function SymptomCard () {

  const [expanded, setExpanded] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [symptomType, setSymptomType] = useState('');
  const [severity, setSeverity] = useState('');
  const [note, setNote] = useState('');
  const dispatch = useDispatch();
  
  var currentDate = dayjs();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(createSymptom({symptomType, severity, note, date}))
        setSymptomType('')
        setSeverity('')
        setNote('')
        setDate(dayjs())
    };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card >
          <CardHeader
            avatar={<MedicalInformationIcon />}
            title='Symptom'
            action={
              <IconButton aria-label='charts'>
                <EqualizerIcon sx={{ color: '#4831cc' }} />
              </IconButton>
            }
            />
            <CardActions>
              <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label='show more'
              >
                  <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                <Stack direction='column' spacing={2}>
                  <DatePicker
                    defaultValue={currentDate}
                    value={date}
                    views={['day']}
                    showDaysOutsideCurrentMonth
                    onChange={(date) => setDate(date)}
                    clearable='true'
                    
                  />
                  <form onSubmit={onSubmit}>
                      <Stack direction='column' spacing={2}>
                          <Stack direction='row' spacing={2} justifyContent='center'>
                              
                          </Stack>
                          <TextField
                              type='text'
                              variant='outlined'
                              placeholder='Symptom Type'
                              name='note'
                              value={note}
                              onChange={(e) => setSymptomType(e.target.value)}
                          
                          />
                          <Button
                            type='submit'
                            sx={{
                                bgcolor: 'button.dark',
                                color: 'text.light',
                                '&:hover': {
                                bgcolor: 'button.darkHover',
                                color: 'text.light'
                                },
                                borderRadius: 5
                            }}
                            variant='contained'
                          >
                              Submit
                          </Button>
                      </Stack>                                    
                  </form>
                </Stack>
              </CardContent>
            </Collapse>
        </Card>
      </LocalizationProvider>
    </ThemeProvider>
  );
};
