import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LineChart from '../components/common/LineChart';
import 'chartjs-adapter-date-fns';

// MUI //
import { Modal, Typography, IconButton, Box, Stack } from '@mui/material';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { brown, blue, ivory, } from '../colors';

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
            main: ivory[50]
        }
    }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 400,
    width: 800,
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
        // console.log(data);
    };

    data.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    })
    console.log(data)

    const [chartData, setChartData] = useState({
        // labels: data.map((data) => data.date),
        labels: data.map((data) => data.date),
        datasets: [
            {
                label: "Mood Rating",
                data: data.map((data) => data.rating),
                backgroundColor: '#b595f6',
                borderColor: '#7a43f1',
                lineTension: 0.5,
            },       
        ],
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Mood Ratings',
                font: {
                    width: 'bold',
                    size: 14,
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: function (value) {
                            return value % 1 === 0 ? value : '';
                        }
                    }
                },
                x: {
                    display: false
                }    
            }
        }
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
                    <LineChart chartData={chartData} />
                </Box>
            </Modal>                
        </ThemeProvider>
    );
}

export default MoodChart