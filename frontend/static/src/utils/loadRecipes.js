import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loadRecipes = () => {
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

export const loadData = async url => {
    const response = await fetch(url)
    const data = response.json()
    return data;
};