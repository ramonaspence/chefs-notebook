import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const makeAPICall = (endpoint) => {
    return axios.get(`${BASE_URL}/api/v1/${endpoint}/`, {
        headers: {
            'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`
        }
    });
    // Because we return axios.get() we specify a .then() and .catch() when makeAPICall() is called.

}
export default makeAPICall;