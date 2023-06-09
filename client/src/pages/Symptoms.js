import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSymptoms } from '../features/symptoms/symptomSlice';
import { reset } from '../features/auth/authSlice';

// Components //
import Spinner from '../components/Spinner';
import MoodCard from '../components/cards/MoodCard';
import PainCard from '../components/cards/PainCard';

// MUI //
import { Box, Grid, Container } from '@mui/material';

function Symptoms () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
    const { symptoms, isLoading, isError, message } = useSelector((state) => state.symptoms)

    useEffect(() => {
        if (isError) {
            console.log(message)
    }
        if (!user) {
            navigate('/login')
        }

        dispatch(getSymptoms())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Grid
            container
            spacing={2}
            direction='column'
            alignItems='center'
            justifyContent='center'
        >
            <Container
                style={{
                    minWidth: '20vw',
                    maxWidth: 800,
                    margin: 'auto',
                    marginTop: '1rem'
                }}
            >
                <Box className='content'>
                    <MoodCard />
                    <PainCard />
                </Box>
            </Container>
        </Grid>
    );
}

export default Symptoms