import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components //
import { getPain } from '../../features/pain/painSlice';
import { reset } from '../../features/auth/authSlice';
import Spinner from '../Spinner';
import PainChart from '../data/PainChart';

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

const PainChartModal = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user } = useSelector((state) => state.auth)
    const { pain, isLoading, isError, message } = useSelector((state) => state.pain)

    useEffect(() => {
        if (isError) {
            console.log(message)
    }
        if (!user) {
            navigate('/login')
        }
    
        dispatch(getPain())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <ThemeProvider theme={theme} style={style}>
            <PainChart />
        </ThemeProvider>
    );
}

export default PainChartModal