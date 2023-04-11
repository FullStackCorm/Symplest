import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { Box, Button, Container, Grid, Typography } from '@mui/material';


function NoPage() {
    const navigate = useNavigate();

    // const { user } = useSelector((state) => state.auth)
    // const { notes, isLoading, isError, message } = useSelector((state) => state.notes)

    // useEffect(() => {
    //     if (isError) {
    //         console.log(message)
    // }
    //     if (!user) {
    //         navigate('/login')
    //     }

    // }, [user, navigate, isError, message])

    // if (isLoading) {
    //     return <Spinner />
    // }

    const onClick = () => {
        navigate('/')
    }
    
    return (
        <div>
            <Navbar />
            <Grid 
                container
                spacing={0}
                direction='column'
                alignItems='center'
                justifyContent='center'
                sx={{
                    color: 'white'
                }}
            >
                <Grid item>
                    <Box
                        sx={{ 
                            p: 10
                        }}>
                        <Typography variant='h4' component='h4'>
                            404: Page Not Found
                        </Typography>
                        <Button onClick={onClick}>Return Home</Button>
                    </Box>
                </Grid>             
            </Grid>
            <Footer />
        </div>

    );
};

export default NoPage;