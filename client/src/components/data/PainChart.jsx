import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'chartjs-adapter-date-fns';
import { ResponsiveContainer, Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
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
    function createData(type, severity, note, date, _id) {
        return { type, severity, note, date, _id };
    };

    const headacheData = []
    const neckData = []
    const shoulderData = []
    const wristData = []
    const backData = []
    const hipData = []
    const legData = []
    const kneeData = []
    const footData = []
    const nervePainData = []

    // Filters for pain type so they can be compared to each other. 
    // Sorts users' symptom entries by date selected, since they can add symptom data after a date has already passed. 
    // Also shortens the date labels on their line charts.
    if (pain && pain.length > 0) {
        const filterHeadacheData = pain.filter(obj => obj.hasOwnProperty('type') && obj.type === 'Headache');
            filterHeadacheData.sort((a, b) => 
                dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
            filterHeadacheData.map(pain => {
                const date = dayjs(pain.date).format('MMM DD');
                headacheData.push(createData( 
                    pain.type, 
                    pain.severity, 
                    pain.note, 
                    date, 
                    pain._id 
                ))
                return headacheData;
            });
            
        const filterNeckData = pain.filter(obj => obj.hasOwnProperty('type') && obj.type === 'Neck');
            filterNeckData.sort((a, b) => 
                dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
            filterNeckData.map(pain => {
                const date = dayjs(pain.date).format('MMM DD');
                neckData.push(createData( 
                    pain.type, 
                    pain.severity, 
                    pain.note, 
                    date, 
                    pain._id 
                ))
                return neckData;
            });

        const filterShoulderData = pain.filter(obj => obj.hasOwnProperty('type') && obj.type === 'Shoulder');
            filterShoulderData.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
            filterShoulderData.map(pain => {
                const date = dayjs(pain.date).format('MMM DD');
                shoulderData.push(createData( 
                    pain.type, 
                    pain.severity, 
                    pain.note, 
                    date, 
                    pain._id 
                ))
                return shoulderData;
            });
            
        const filterWristData = pain.filter(obj => obj.hasOwnProperty('type') && obj.type === 'Shoulder');
            filterWristData.sort((a, b) => dayjs(a.date).valueOf - dayjs(b.date).valueOf);
            filterWristData.map(pain => {
                const date = dayjs(pain.date).format('MMM DD');
                wristData.push(createData( 
                    pain.type, 
                    pain.severity, 
                    pain.note, 
                    date, 
                    pain._id 
                ))
                return wristData;
            });

        const filterBackData = pain.filter(obj => obj.hasOwnProperty('type') && obj.type === 'Back');
            filterBackData.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
            filterBackData.map(pain => {
                const date = dayjs(pain.date).format('MMM DD');
                backData.push(createData( 
                    pain.type, 
                    pain.severity, 
                    pain.note, 
                    date, 
                    pain._id 
                ))
                return backData;
            });
        

        const filterHipData = pain.filter(obj => obj.hasOwnProperty('type') && obj.type === 'Hip');
            filterHipData.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
            filterHipData.map(pain => {
                const date = dayjs(pain.date).format('MMM DD');
                hipData.push(createData(
                    pain.type,
                    pain.severity,
                    pain.note,
                    date,
                    pain._id
                ))
                return hipData;
            });
            

        const filterLegData = pain.filter(obj => obj.hasOwnProperty('type') && obj.type === 'Leg');
            filterLegData.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
            filterLegData.map(pain => {
                const date = dayjs(pain.date).format('MMM DD');
                legData.push(createData(
                    pain.type,
                    pain.severity,
                    pain.note,
                    date,
                    pain._id
                ))
                return legData;
            });

        const filterKneeData = pain.filter(obj => obj.hasOwnProperty('type') && obj.type === 'Knee');
            filterKneeData.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
            filterKneeData.map(pain => {
                const date = dayjs(pain.date).format('MMM DD');
                kneeData.push(createData(
                    pain.type,
                    pain.severity,
                    pain.note,
                    date,
                    pain._id
                ))
                return kneeData;
            });

        const filterFootData = pain.filter(obj => obj.hasOwnProperty('type') && obj.type === 'Foot');
            filterFootData.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
            filterFootData.map(pain => {
                const date = dayjs(pain.date).format('MMM DD');
                footData.push(createData(
                    pain.type,
                    pain.severity,
                    pain.note,
                    date,
                    pain._id
                ))
                return footData;
            });

        const filterNerveData = pain.filter(obj => obj.hasOwnProperty('type') && obj.type === 'Nerve Pain');
            filterNerveData.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
            filterNerveData.map(pain => {
                const date = dayjs(pain.date).format('MMM DD');
                nervePainData.push(createData(
                    pain.type,
                    pain.severity,
                    pain.note,
                    date,
                    pain._id
                ))
                return nervePainData;
            });
    }

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
                        <LineChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                            <Line data={headacheData} type='monotone' dataKey='severity' stroke='#7a43f1' strokeWidth={3} />
                            <Line data={neckData} type='monotone' dataKey='severity' stroke='#b00091' strokeWidth={3} />
                            <Line data={shoulderData} type='monotone' dataKey='severity' stroke='#2e59d2' strokeWidth={3} />
                            <Line data={wristData} type='monotone' dataKey='severity' stroke='#389aff' strokeWidth={3} />
                            <Line data={backData} type='monotone' dataKey='severity' stroke='#b6a1f0' strokeWidth={3} />
                            <Line data={hipData} type='monotone' dataKey='severity' stroke='#e89d9d' strokeWidth={3} />
                            <Line data={legData} type='monotone' dataKey='severity' stroke='#1320b6' strokeWidth={3} />
                            <Line data={kneeData} type='monotone' dataKey='severity' stroke='#008c83' strokeWidth={3} />
                            <Line data={footData} type='monotone' dataKey='severity' stroke='#00f1ff' strokeWidth={3} />
                            <Line data={nervePainData} type='monotone' dataKey='severity' stroke='#ffcb45' strokeWidth={3} />
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