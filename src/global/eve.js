import axios from 'axios';

const headers = {
    post: {'Content-Type': 'application/json'},
};

const eveUrl = 'http://localhost:9090';
const config = {
    baseURL: `${eveUrl}/api/`,
    headers,
};

export const eve = axios.create(config);

export const fetchRecipe = async (slug) => {
    const response = await eve.get(`recipes/${slug}`);
    return response.data;
};

export const fetchCategories = async () => {
    const response = await eve.get('/categories');
    return response.data;
};

export const fetchTags = async () => {
    const response = await eve.get('/tags');
    return response.data;
};

export const editRecipe = async (values) => {
    const {id} = values;

    const response = await eve.put(`recipes/${id}`, values);
    return response.data;
};
