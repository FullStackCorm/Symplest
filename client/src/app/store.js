import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import noteReducer from '../features/notes/noteSlice';
import medReducer from '../features/medications/medSlice';
import calendarReducer from '../features/calendar/calendarSlice';
import eventReducer from '../features/events/eventSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        notes: noteReducer,
        medications: medReducer,
        calendar: calendarReducer,
        event: eventReducer,
    }
});