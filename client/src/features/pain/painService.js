import axios from 'axios'

const API_URL = 'http://localhost:5000/api/pain/'

const createPain = async (painData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, painData, config)

    return response.data
}

const getPain = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const deletePain = async (painId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + painId, config)

    return response.data
}

const painService = {
    createPain,
    getPain,
    deletePain,
}

export default painService