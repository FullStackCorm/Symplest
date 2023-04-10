import axios from 'axios'

const API_URL = 'http://localhost:5000/api/calendar-entries/'

const createCalendarEntry = async (entryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, entryData, config)

    return response.data
}

const getCalendarEntries = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const deleteCalendarEntry = async (entryId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + entryId, config)

    return response.data
}

const calendarService = {
    createCalendarEntry,
    getCalendarEntries,
    deleteCalendarEntry,
}

export default calendarService