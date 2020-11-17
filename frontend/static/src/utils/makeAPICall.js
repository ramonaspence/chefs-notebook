import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const GetAPICall = (endpoint) => {
    return axios.get(`${BASE_URL}/api/v1/${endpoint}`, {
        headers: {
            'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`
        }
    });

}

export const PostAPICall = (endpoint, data) => {
    return axios.post(`${BASE_URL}/api/v1/${endpoint}`, data, {
        headers: {
            'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`
        }
    });
}
export default GetAPICall