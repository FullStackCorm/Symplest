import { useDispatch } from 'react-redux';
import { createEvent } from '../../features/events/eventSlice';
import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { DateField, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const EventForm = (props) => {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState(dayjs());
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [time, setTime] = useState(dayjs());
    
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleChange = (newValue) => {
      setValue(newValue);
    }
    
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
                  <form onSubmit={onSubmit}>
                    <Container>
                      <Stack
                        direction='column'
                        spacing={2}
                      >
                        <DateField 
                          defaultValue={date}
                          onChange={(e) => setDate(e)}
                        />
                        <TextField
                          type='text'
                          variant='outlined'
                          placeholder='Title (required)'
                          name='title'
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                          type='text'
                          variant='outlined'
                          placeholder='Description'
                          name='description'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <TimePicker 
                          defaultValue={time}
                          value={time}
                          format='h:m:a'
                          onChange={(e) => setTime(e)}
                        />
                        <Button
                          type='submit'
                          sx={{
                            backgroundColor: '#E4CEE1',
                            color: '#3C303C',
                            borderRadius: 5
                          }}
                        >
                          Add to Calendar
                        </Button>
                      </Stack>
                    </Container>
                  </form>
      );
}

export default EventForm