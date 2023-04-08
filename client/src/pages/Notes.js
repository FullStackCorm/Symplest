import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import NoteForm from '../components/forms/NoteForm';
import NoteItem from '../components/items/NoteItem';
import { getNotes } from '../features/notes/noteSlice';
import { reset } from '../features/auth/authSlice';

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
            
            <h1>{ pageTitle }</h1>
            <section className='content'>
                {notes !== undefined && notes.length >= 0 ? (
                    <div className='notes'>
                        {notes.map((note) => (
                            <NoteItem key={note._id} note={note} />
                        ))}
                    </div>
                ) : (<h4>No notes have been added yet.</h4>)}
            </section>
            <br />
            <NoteForm />
            <Footer />
        </>
    )
}

export default Notes