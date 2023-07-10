import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components //
import Spinner from '../components/Spinner';
import NoteCard from '../components/cards/NoteCard';
import NoteFormModal from '../components/modals/NoteFormModal';
import { getNotes } from '../features/notes/noteSlice';
import { reset } from '../features/auth/authSlice';

// MUI //
import { Box, Grid, Container, Typography, Paper, Stack, IconButton } from '@mui/material';

function Notes() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
    const { notes, isLoading, isError, message } = useSelector((state) => state.notes)

    useEffect(() => {
        if (isError) {
            console.log(message)
    }
        if (!user) {
            navigate('/login')
        }

        dispatch(getNotes())
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
            marginTop='1rem'
        >
            <Container
                style={{
                    minWidth: '20vw',
                    maxWidth: 800,
                    margin: 'auto',
                }}
            >
                <Paper
                elevation={3}
                sx={{ 
                    margin: 'auto',
                    direction: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: 350,
                    p: '2rem',
                    maxHeight: 500,
                    overflow: 'auto'
                }}
                xs={12}
            >
                    <Stack
                        direction='row'
                        display='inline-flex'
                        justify-content='center'
                        >
                        <Grid
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={8}>
                                <Typography component='h2' variant='h5' sx={{ color: 'text.dark' }}>
                                    Notes 
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton>
                                    <NoteFormModal />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Stack>
            
                    {notes !== undefined && notes.length >= 0 ? (
                        <Box>
                            {notes.map((note) => (
                                <NoteCard key={note._id} note={note} />
                            ))}
                        </Box>
                    ) : (<h4>No notes have been added yet.</h4>)}
            </Paper>
            </Container>
            
        </Grid>       
    );
}

export default Notes