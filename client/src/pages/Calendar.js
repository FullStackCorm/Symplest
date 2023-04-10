import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import CalendarComponent from '../components/Calendar';
import { getCalendarEntries } from '../features/calendar/calendarSlice';
import { reset } from '../features/auth/authSlice';

function Calendar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
    const { calendar, isLoading, isError, message } = useSelector((state) => state.calendar)

    useEffect(() => {
        if (isError) {
            console.log(message)
    }
        if (!user) {
            navigate('/login')
        }
  
        dispatch(getCalendarEntries())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])
  
    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='page'>
            <Navbar />
            <div className='container'
                style={{
                   maxWidth: 800,
                   margin: 'auto',
                   marginTop: '5rem'
            }}>
                <CalendarComponent />
            </div>
            <Footer />
        </div>
    );
}

export default Calendar