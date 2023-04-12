import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../features/events/eventSlice';
import { Modal, Typography, Button, Box, Grid } from '@mui/material';
import EventForm from '../forms/EventForm';
import dayjs from 'dayjs';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    color: '#3C303C',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5
  };

const AddEventModal = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(dayjs());
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [time, setTime] = useState('');
    
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const onSubmit = (e) => {
      e.preventDefault();

      dispatch(createEvent({title, description, date, start, end, time}))
        setTitle('')
        setDescription('')
        setDate('')
        setStart('')
        setEnd('')
        setTime('')
    
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Grid container justifyContent='center'>
                    <Button onClick={handleOpen} sx={{borderRadius: 5, backgroundColor: '#3C303C',
                          color: '#B6A1B3', }}>Add Event</Button>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    keepMounted
                >
                    <Box sx={style}>
                        <Typography id='modal-modal-title' variant='h6' component='h2'>
                            New Calendar Item
                            <EventForm />
                        </Typography>
                    </Box>
                </Modal>
            </form>
        </div>
    );
}

export default AddEventModal;