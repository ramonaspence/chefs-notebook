import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
let data

export const makeAPICall = (endpoint) => {
    axios.get(`${BASE_URL}/api/v1/${endpoint}/`, {
        headers: {
            'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`
        }
    })
    .then(res => {return res})
    .catch(err => console.log(err));

}
export default makeAPICall;