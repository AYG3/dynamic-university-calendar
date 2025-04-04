import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getEvents = async ( filters = {} ) => {
    try {
        const response = await axios.get(API_URL, { params: filters })
        console.log("response.data: ", response.data)
    
        return response.data
    } catch (error) {
        console.log("Error getting events: ", error)
        return []
    }
}

export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(API_URL, eventData)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log("Error creating event", error)
        return null
    }
}