import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getEvents = async ( filters = {} ) => {
    try {
        const query = new URLSearchParams(filters).toString()
        // console.log(API_URL + "?" + query)
        const response = await axios.get(API_URL, { params: filters })
        // console.log("response.data: ", response.data)
        // console.log("response.url: ", response.config.url)
    
        return response.data
    } catch (error) {
        console.log("Error getting events: ", error)
        return []
    }
}

export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(API_URL, eventData)
        // console.log(response.data)
        // console.log("Response status: ",response.status)
        return response.data
    } catch (error) {
        console.log("Error creating event", error)
        return null
    }
}

export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(API_URL + "/" + eventId)
        console.log("Delete respponse data: ", response.data)
        return response.data
    } catch (error) {
        console.log("Error deleting event: ", error)
    }
}