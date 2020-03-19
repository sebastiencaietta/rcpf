import {getRecipes, getRecipeBySlug, getRecipeList} from '../repositories/recipes';
import {getCategories} from "../repositories/categories";
import {getTags} from "../repositories/tags";
import {signIn} from "../repositories/users";

export const fetchRecipes = async () => {
    try {
        return getRecipeList();
    } catch (error) {
        return getRecipes();
    }
};

export const fetchRecipe = async (slug) => {
    return getRecipeBySlug(slug);
};

export const fetchCategories = async () => {
    return getCategories();
};

export const fetchTags = async () => {
    return getTags();
};

export const signUserIn = async (email, password) => {
    return new Promise((resolve, reject) => {
        signIn(email, password).then(response => resolve(response)).catch(error => {
            reject(error.message);
        })
    });
};
