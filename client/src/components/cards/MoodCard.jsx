import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMood } from '../../features/moods/moodSlice';
import dayjs from 'dayjs';

// Components //
import MoodChartModal from '../modals/MoodChartModal';

// MUI //
import { styled, Card, CardHeader, CardContent, CardActions, Collapse, IconButton, Typography, Stack, Icon, Button, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brown, blue, ivory } from '../../colors';

const theme = createTheme({
    palette: {
        primary: {
        main: blue[700],
        light: blue[400],
        dark: blue[800],
        contrastText: brown[50]
        },
        secondary: {
            main: brown[100],
            light: brown[50],
            dark: brown[400],
            contrastText: brown[700]
        },
        text: {
            main: ivory[50]
        },
    }
  });

  const style = {
    color: 'primary.dark',
    backgroundColor: 'secondary.light',
    input: { color: 'primary.dark' },
    maxWidth: 400,
    height: 'auto',
    margin: 'auto',

    '& .MuiIcon-root': {
        color: 'primary.main'
    },
    '& .MuiFormControl-root': {
        
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

export default function MoodCard() {

    const [expanded, setExpanded] = useState(false);
    const [date, setDate] = useState(dayjs());
    const [rating, setRating] = useState('');
    const [note, setNote] = useState('');

    const dispatch = useDispatch();

    var currentDate = dayjs();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(createMood({rating, note, date}))
        setRating('')
        setNote('')
        setDate(dayjs())
    };

    const moodIcons = [
        {
            icon: <SentimentVeryDissatisfiedIcon />,
            text: 'Rough',
        },
        {
            icon: <SentimentDissatisfiedIcon />,
            text: 'Not good',
        },
        {
            icon: <SentimentSatisfiedIcon />,
            text: 'Okay',
        },
        {
            icon: <SentimentSatisfiedAltIcon />,
            text: 'Good',
        },
        {
            icon: <MoodIcon />,
            text: 'Great!'
        }
    ]

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Card sx={style}>
                    <CardHeader
                        avatar={<MoodIcon />}
                        title='Mood'
                        action={
                            <IconButton aria-label='charts'>
                                <MoodChartModal />
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
                                    <Typography variant='body1' color='text.secondary'>
                                        How was your day?
                                    </Typography>
                                    <form onSubmit={onSubmit}>
                                        <Stack direction='column' spacing={2}>
                                            <Stack direction='row' spacing={2} justifyContent='center'>
                                                {moodIcons.map((icon, i) => (
                                                    // tracking moods from 1-5 on line graph, so setting mood to i + 1; will also simplify finding mood average //
                                                    <div onClick={() => setRating(i + 1)}
                                                        key={i}
                                                    >
                                                        <IconButton>{icon.icon}</IconButton>
                                                        <br/>
                                                        <span>{icon.text}</span>
                                                    </div>
                                                ))}
                                            </Stack>
                                            <Typography variant='body2' color='text.primary'>
                                                Note:
                                            </Typography>
                                            <TextField
                                                type='text'
                                                variant='outlined'
                                                placeholder='What was memorable about today?'
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

