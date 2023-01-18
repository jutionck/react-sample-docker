import axios from "axios";

export const apiConfig = () => {
    return axios.create({
        headers: { 'Content-Type': 'application/json'},
    })
}