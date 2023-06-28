import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components //
import { getMoods } from '../../features/moods/moodSlice';
import { reset } from '../../features/auth/authSlice';
import Spinner from '../Spinner';
import MoodChart from '../data/MoodChart';

// MUI //
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
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
        <ThemeProvider theme={theme}>
            <MoodChart />
        </ThemeProvider>
    );
}

export default MoodChartModal