import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import dayjs from 'dayjs';

// MUI //
import { Modal, Typography, Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 400,
    width: 700,
    maxHeight: 450,
    maxWidth: 700,
    bgcolor: '#fff',
    border: '2px solid #f1e6e1', // modal border color
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    '& .MuiSelect-select': {
        bgcolor: '#fff'
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: 'primary.main',
        },
    },
};

const PainChart = (props) => {

    const { user } = useSelector((state) => state.auth)
    const { pain } = useSelector((state) => state.pain)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [selectedPainType, setSelectedPainType] = useState('');
    const [range, setRange] = useState('');

    const handlePainTypeSelect = (e) => {
        setSelectedPainType(e.target.value);
        console.log(range)
    };

    const handleRangeSelect = (e) => {
        setRange(e.target.value);
    }

    // Data Mapping //
    const painData = []
    
    function createData(type, severity, note, date, _id) { // Retrieves all pain data.
        return { type, severity, note, date, _id };
    }

    if (pain && pain.length > 0) {
        const dateFormat = 'MMM DD';     // Shortens the date labels on users' line charts.

        function filterAndMapPainData(type) {
            const filteredData = pain.filter(obj => obj.hasOwnProperty('type') && obj.type === type); // Filters by type of pain, ex: Headache, Neck Pain, Back Pain, etc.

                filteredData.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());       // Sorts users' symptom entries by date selected when created, 
                    filteredData.forEach(pain => {                                                    // since they can add symptom data after a date has already passed. 
                        const date = dayjs(pain.date).format(dateFormat);
                        painData.push(createData(pain.type, pain.severity, pain.note, date, pain._id));
                });
        }

        filterAndMapPainData(selectedPainType);

    }

    return (
        <div>
            <EqualizerIcon onClick={handleOpen}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                keepMounted
            >
                <Box sx={style}>
                    <Typography variant='h6' component='h2' textAlign='center'>Pain History</Typography>
                        <Stack direction='row' justifyContent='center'>
                            <FormControl size='small' sx={{ width: '33%', alignContent: 'center', margin: '0.2rem' }}>
                                <InputLabel id='pain-type-selector'>Pain Type</InputLabel>
                                    <Select
                                        labelId='pain-type'
                                        id='pain-type'
                                        label='Pain Type'
                                        value={selectedPainType}
                                        onChange={handlePainTypeSelect}
                                    >
                                        <MenuItem value={'Headache'}>Headaches</MenuItem>
                                        <MenuItem value={'Neck'}>Neck Pain</MenuItem>
                                        <MenuItem value={'Shoulder'}>Shoulder Pain</MenuItem>
                                        <MenuItem value={'Wrist'}>Wrist Pain</MenuItem>
                                        <MenuItem value={'Back'}>Back Pain</MenuItem>
                                        <MenuItem value={'Hip'}>Hip Pain</MenuItem>
                                        <MenuItem value={'Leg'}>Leg Pain</MenuItem>
                                        <MenuItem value={'Knee'}>Knee Pain</MenuItem>
                                        <MenuItem value={'Feet'}>Foot Pain</MenuItem>
                                        <MenuItem value={'Nerve Pain'}>Nerve Pain</MenuItem>
                                        <MenuItem value={'Other'}>Misc. Pain</MenuItem>        
                                    </Select>
                            </FormControl>
                            {/* <FormControl size='small' sx={{ width: '33%', margin: '0.2rem' }}>
                                <InputLabel id='time-duration-selector'>Time Interval</InputLabel>
                                    <Select
                                        labelId='day-interval'
                                        id='day-interval'
                                        label='Time Interval'
                                        value={range}
                                        defaultValue={100000000}
                                        onChange={handleRangeSelect}

                                    >
                                        <MenuItem value={100000000}>All Data</MenuItem>
                                        <MenuItem value={7}>Past 7 Days</MenuItem>
                                        <MenuItem value={30}>Past 30 Days</MenuItem>
                                        <MenuItem value={365}>Past Year</MenuItem>
                                    </Select>
                            </FormControl> */}
                        </Stack>
                    <ResponsiveContainer width={600} height={'80%'}>
                        <LineChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                            <Line data={painData} type='monotone' dataKey='severity' stroke='#e1b0ac' strokeWidth={3} />
                            <CartesianGrid stroke='#ddd' strokeDashArray='5 5' />
                            <XAxis dataKey='date' />
                            <YAxis ticks={[2, 4, 6, 8, 10]} />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>               
                </Box>
            </Modal>                
        </div>
    );
}

export default PainChart