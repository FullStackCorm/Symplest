import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LineChartt from '../common/LineChart';
import 'chartjs-adapter-date-fns';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { format, compareAsc } from 'date-fns'
import dayjs from 'dayjs';

// MUI //
import { Modal, Typography, IconButton, Box, Stack } from '@mui/material';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brown, blue, white, } from '../../colors';
import { model } from 'mongoose';

const theme = createTheme({
    palette: {
        primary: {
            main: blue[700],
            light: blue[400],
            dark: blue[800],
            contrastText: brown[50]
        },
        secondary: {
            main: brown[50],
            contrastText: blue[50]
        },
        text: {
            main: white[100]
        }
    }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 400,
    width: 700,
    bgcolor: 'secondary.main',
    border: '2px solid #004e87',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

const MoodChart = (props) => {

    const { user } = useSelector((state) => state.auth)
    const { moods } = useSelector((state) => state.moods)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Data Mapping //
    function createData(rating, note, date, _id) {
        return { rating, note, date, _id };
    };

    const data = []

    if (moods) {
        moods.map(mood =>
            {
                data.push(createData(mood.rating, mood.note, mood.date, mood._id))
            }
        );
    };

    // const sortedDates = data.filter((e) => {
    //     const newDate = new Date(e.date);
    //     const options = {year: 'numeric', month: 'short', day: 'numeric'};

    //     return (new Intl.DateTimeFormat('en-US').format(newDate))
    // })


    // Must sort dates since users can enter symptom data after a date has already passed //
    const sortedDates = data.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });


    return (
        <ThemeProvider theme={theme}>
            <IconButton 
                sx={{ bgcolor: 'primary.main', color: 'text.main', borderRadius: 5, m: 1,
                '&:hover': {
                backgroundColor: 'primary.light',
                color: 'text.main',
                } }}
                onClick={handleOpen}>
                <EqualizerIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                keepMounted
            >
                <Box sx={style}>
                    <Typography variant='h6' component='h2' textAlign='center'>Mood Ratings</Typography>
                    <ResponsiveContainer width={600} height={'80%'}>
                        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                            <Line type='monotone' dataKey='rating' stroke='#7a43f1' />
                            <CartesianGrid stroke='#ccc' strokeDashArray='5 5' />
                            <XAxis dataKey='date' />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>               
                </Box>
            </Modal>                
        </ThemeProvider>
    );
}

export default MoodChart