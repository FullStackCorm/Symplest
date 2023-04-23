import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components //
import { getMoods } from '../../features/moods/moodSlice';
import { reset } from '../../features/auth/authSlice';
import Spinner from '../Spinner';
import MoodChart from '../MoodChart';

// MUI //
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { brown, blue, ivory, } from '../../colors';

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
    width: 400,
    bgcolor: 'secondary.main',
    border: '2px solid #004e87',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

const MoodChartModal = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user } = useSelector((state) => state.auth)
    const { moods, isLoading, isError, message } = useSelector((state) => state.moods)

    useEffect(() => {
        if (isError) {
            console.log(message)
    }
        if (!user) {
            navigate('/login')
        }
    
        dispatch(getMoods())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <ThemeProvider theme={theme} style={style}>
            <MoodChart />
        </ThemeProvider>
    );
}

export default MoodChartModal