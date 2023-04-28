import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPain } from '../../features/pain/painSlice';
import dayjs from 'dayjs';

// Components //
import PainChartModal from '../modals/PainChartModal';

// MUI //
import { styled, Box, Card, CardHeader, CardContent, CardActions, Collapse, IconButton, MenuItem, Typography, Select, Stack, Slider, Button, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, purple, white } from '../../colors';

const theme = createTheme({
    palette: {
        primary: {
            main: purple[700],
            light: purple[400],
            dark: purple[800],
            contrastText: purple[600]
        },
        secondary: {
            main: white[100],
            light: blue[50]
        },
        text: {
            main: white[100]
        },
    }
});

const style = {
    color: 'primary.dark',
    backgroundColor: 'secondary.main',
    input: { color: 'primary.dark' },
    maxWidth: 400,
    height: 'auto',
    margin: 'auto',
    marginTop: 1,

    '& .MuiIcon-root': {
        color: 'primary.main'
    },
    '& .MuiSvgIcon-root': {
        color: 'primary.main'
    }
}

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

export default function PainCard() {

    const [expanded, setExpanded] = useState(false);
    const [date, setDate] = useState(dayjs());
    const [type, setType] = useState('');
    const [severity, setSeverity] = useState('');
    const [note, setNote] = useState('');

    const dispatch = useDispatch();

    var currentDate = dayjs();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(createPain({type, severity, note, date}))
        setType('')
        setSeverity('')
        setNote('')
        setDate(dayjs())
    };

    function valueText(value) {
        return `${value}°C`;
    }

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Card sx={style}>
                    <CardHeader
                        avatar={<MedicalInformationIcon />}
                        title='Pain Rating'
                        action={
                            <IconButton aria-label='charts'>
                                <PainChartModal />
                            </IconButton>                            
                        } 
                    />
                    <Stack direction='column' width='100%' spacing={2} display='inline-flex' justifyContent='center' textAlign='center'>
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
                                        style={style}
                                    />
                                    <Typography variant='body1' color='primary.contrastText'>
                                        Where are you hurting?
                                    </Typography>
                                    <Select
                                        onChange={(e) => setType(e.target.value)} defaultValue='Select Pain Type' placeholder='Select Pain Type'
                                        sx={style}
                                    >
                                        <MenuItem value='Headache'>Headache</MenuItem>
                                        <MenuItem value='Neck'>Neck</MenuItem>
                                        <MenuItem value='Shoulder'>Shoulder</MenuItem>
                                        <MenuItem value='Wrist'>Wrist</MenuItem>
                                        <MenuItem value='Back (upper)'>Back (upper)</MenuItem>
                                        <MenuItem value='Back (mid)'>Back (mid)</MenuItem>
                                        <MenuItem value='Back (lower)'>Back (lower)</MenuItem>
                                        <MenuItem value='Hip'>Hip</MenuItem>
                                        <MenuItem value='Leg'>Leg</MenuItem>
                                        <MenuItem value='Knee'>Knee</MenuItem>
                                        <MenuItem value='Foot'>Feet</MenuItem>
                                        <MenuItem value='Nerve Pain'>Nerve Pain</MenuItem>
                                    </Select>

                                    <Typography variant='body1' color='primary.contrastText'>
                                        Use the slider to log your symptom
                                    </Typography>
                                    <form onSubmit={onSubmit}>
                                        <Stack direction='column' spacing={2}>
                                            <Stack direction='row' spacing={2} justifyContent='center'>
                                                <Box sx={{ width: 300}}>
                                                    <Slider
                                                        aria-label='Pain'
                                                        defaultValue={severity}
                                                        getAriaValueText={valueText}
                                                        valueLabelDisplay='auto'
                                                        step={1}
                                                        marks
                                                        min={1}
                                                        max={10}
                                                        onChange={(e) => setSeverity(e.target.value)}
                                                    />
                                                </Box>
                                            </Stack>
                                            <TextField
                                                type='text'
                                                variant='outlined'
                                                placeholder='How is your symptom affecting you today?'
                                                name='note'
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                                sx={style}
                                            />
                                            <Button type='submit'>
                                                Submit
                                            </Button>
                                        </Stack>                                    
                                    </form>          
                                </Stack>
                            </CardContent>
                        </Collapse>                    
                    </Stack>                      
                </Card>
            </LocalizationProvider>
        </ThemeProvider>

    )
}
