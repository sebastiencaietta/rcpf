import axios from 'axios';
import {getRecipes, getRecipe} from '../repositories/recipes';
import {getCategories} from "../repositories/categories";
import {getTags} from "../repositories/tags";

const headers = {
    post: {'Content-Type': 'application/json'},
};

const eveUrl = 'http://localhost:9090';
const config = {
    baseURL: `${eveUrl}/api/`,
    headers,
};

export const eve = axios.create(config);

export const fetchRecipes = async () => {
    return getRecipes();
};

export const fetchRecipe = async (slug) => {
    return getRecipe(slug);
};

export const fetchCategories = async () => {
    return getCategories();
};

export const fetchTags = async () => {
    return getTags();
};

export const fetchUnits = async () => {
    const response = await eve.get('/units');
    return response.data;
};

export const editRecipe = async (values) => {
    const {id} = values;

    const response = await eve.put(`recipes/${id}`, values);
    return response.data;
};
