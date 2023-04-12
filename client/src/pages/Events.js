import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
// import { getCalendarEntries } from '../features/calendar/calendarSlice';
import { getEvents } from '../features/events/eventSlice';
import { reset } from '../features/auth/authSlice';
import { createTheme, ThemeProvider, Grid, Box, Button, Container, Card, Stack } from '@mui/material'
import { DateTimePicker, DateCalendar, LocalizationProvider, DayCalendarSkeleton, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import AddEventModal from '../components/modals/AddEventModal';

const style = {
    color: '#E4CEE1',
    backgroundColor: '#110D11',
    borderRadius: 3,
    "& .MuiDayCalendar-weekDayLabel": {
        color: '#B6A1B3'
    },
    "& .MuiButtonBase-root": {
        color: '#E4CEE1'
    },
    "& .MuiPickersDay-root": {
        color: '#B6A1B3'
    },
    "& .MuiPickersDay-root + .Mui-selected, .Mui-selected:hover, .Mui-selected:focus": {
        backgroundColor: '#3C303C'
    },
    // DateTimePicker
    "& .MuiInputBase-input": {
        color: "#B6A1B3"
    },
    "& .MuiPaper-root": {
        padding: 2,
        marginTop: 1,
        color: "#B6A1B3"
    },
        
}

const Events = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
    const { calendar, isLoading, isError, message } = useSelector((state) => state.calendar)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState(dayjs());
    const [time, setTime] = useState(dayjs());

    var now = dayjs();

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (isError) {
            console.log(message)
    }
        if (!user) {
            navigate('/login')
        }
  
        dispatch(getEvents())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])
  
    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className=''>
            <Navbar />
            <Grid
                container
                style={{                    
                    margin: 'auto',
                    marginTop: '5rem',
                    color: 'white'   
            }}>
                <Stack spacing={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={style}>                  
                            <DateCalendar 
                                sx={style}
                                defaultValue={now}
                                value={date} 
                                views={['day']}
                                showDaysOutsideCurrentMonth 
                                onChange={setDate}
                                clearable='true'
                            />
                                {/* <Button onClick={()=>setValue(null)}>Clear</Button> */}
                            <AddEventModal />
                    </LocalizationProvider>
                </Stack>
            </Grid>
            <Footer />
        </div>
    );
}

export default Events