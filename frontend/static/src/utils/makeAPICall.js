import axios from "axios";

export default const makeAPICall = (endpoint) => {
    const response = await axios.get(`${BASE_URL}/api/v1/${endpoint}`);
    const data = await response.json();

    return data;
}