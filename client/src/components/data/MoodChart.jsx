import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'chartjs-adapter-date-fns';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import dayjs from 'dayjs';

// MUI //
import { Modal, Typography, Box } from '@mui/material';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 400,
    width: 700,
    bgcolor: '#fff',
    border: '2px solid #f1e6e1',
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

    if (moods && moods.length > 0) {
        const dateFormat = 'MMM DD'

        function sortData(moods) {
            const moodData = [...moods];
            const sortedData = moodData.sort(
                (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
            );

            // Must sort dates since users can enter symptom data after a date has already passed //
            sortedData.forEach((mood) => {                                              
                const formattedDate = dayjs(mood.date).format(dateFormat);
                data.push(createData(mood.rating, mood.note, formattedDate, mood._id));
            });
        }

        sortData(moods);
    };

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
                    <Typography variant='h6' component='h2' textAlign='center'>Mood Ratings</Typography>
                    <ResponsiveContainer width={600} height={'80%'}>
                        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                            <Line type='monotone' dataKey='rating' stroke='#e1b0ac' strokeWidth={3} />
                            <CartesianGrid stroke='#ccc' strokeDashArray='5 5' />
                            <XAxis dataKey='date' />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>               
                </Box>
            </Modal>                
        </div>
    );
}

export default MoodChart