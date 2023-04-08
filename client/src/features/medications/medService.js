import axios from 'axios';

const API_URL = 'http://localhost:5000/api/medications/'

const createMedication = async (medicationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, medicationData, config)

    return response.data
}

const getMedications = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.get(API_URL, config)
    
    return response.data
}

const updateMedication = async (medicationId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + medicationId, config)
    return response.data
}

const deleteMedication = async (medicationId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + medicationId, config)

    return response.data
}

const medService = {
    createMedication,
    getMedications,
    updateMedication,
    deleteMedication
}

export default medService;
