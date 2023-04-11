import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import NoteForm from '../components/forms/NoteForm';
import NoteCard from '../components/cards/NoteCard';
import { getNotes } from '../features/notes/noteSlice';
import { reset } from '../features/auth/authSlice';
import { Grid, Container } from '@mui/material';

function Notes() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
    const { notes, isLoading, isError, message } = useSelector((state) => state.notes)
    const pageTitle = `${user.name}'s notes:`

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
        <>
            <Navbar />
            <div 
                // className='container'
                style={{
                    maxWidth: 500,
                    margin: 'auto',
                    marginTop: '5rem'
                }}
            >
                <Grid
                    // container
                    // spacing={0}
                    // direction='column'
                    // alignItems='center'
                    // justifyContent='center'
                >
                    <Container>
                        <h1 style={{color: 'white'}}>{ pageTitle }</h1>
                        <section>
                            {notes !== undefined && notes.length >= 0 ? (
                                <div className='notes'>
                                    {notes.map((note) => (
                                        <NoteCard key={note._id} note={note} />
                                    ))}
                                </div>
                            ) : (<h4>No notes have been added yet.</h4>)}
                        </section>
                        <NoteForm />
                    </Container>
                </Grid>
            </div>  
            <Footer />
        </>
    )
}

export default Notes