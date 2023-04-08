import {useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import NoteForm from '../components/forms/NoteForm';
import { getNotes } from '../features/notes/noteSlice';
import { reset } from '../features/auth/authSlice';

export default function Dashboard () {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {notes, isLoading, isError, message} = useSelector((state) => state.notes)

    useEffect(() => {
      if(isError) {
        console.log(message)
      }

      if(!user) {
        navigate('/login')
      }

      dispatch(getNotes())

      return () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading) {
      return <Spinner />
    }

    return (
        <div>
            <Header />
            <h1>Dashboard</h1>
            <NoteForm />
        </div>
    )
}