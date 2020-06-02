import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;


export const makeAPICall = () => {
    axios.get(`${BASE_URL}/api/v1/recipes`, {
        headers: {
            'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`
        }
    })
    
}


const loadRecipes = () => {
    axios.get(`${BASE_URL}/api/v1/recipes`, {
        headers: {
            'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`
        }
    })
    .then(res => {
        return res
        }
    )
};
