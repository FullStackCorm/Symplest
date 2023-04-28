import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'chartjs-adapter-date-fns';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { format, compareAsc } from 'date-fns'
import dayjs from 'dayjs';

// MUI //
import { Modal, Typography, IconButton, Box, Stack } from '@mui/material';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple, white } from '../../colors';


const theme = createTheme({
    
    palette: {
        primary: {
            main: purple[700],
            light: purple[400],
            dark: purple[800],
            contrastText: white[100]
        },
        secondary: {
            main: white[100],
            contrastText: purple[50]
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

    MuiIconButton :{
        color: '#4831cc'
    }
};

const PainChart = (props) => {

    const { user } = useSelector((state) => state.auth)
    const { pain } = useSelector((state) => state.pain)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Data Mapping //
    function createData(severity, note, date, _id) {
        return { severity, note, date, _id };
    };

    const data = []

    if (pain) {
        pain.map(pain =>
            {
                data.push(createData(pain.severity, pain.note, pain.date, pain._id))
            }
        );
    };
    

    // Must sort dates since users can enter symptom data after a date has already passed //
    const sortedDates = data.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });


    return (
        <ThemeProvider theme={theme}>
            <EqualizerIcon sx={{ color: '#4831cc' }} onClick={handleOpen}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                keepMounted
            >
                <Box sx={style}>
                    <Typography variant='h6' component='h2' textAlign='center'>Pain History</Typography>
                    <ResponsiveContainer width={600} height={'80%'}>
                        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                            <Line type='monotone' dataKey='severity' stroke='#7a43f1' strokeWidth={3} />
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

export default PainChart