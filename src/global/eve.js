import {getRecipes, getRecipeBySlug, getRecipeList} from '../repositories/recipes';
import {getCategories} from "../repositories/categories";
import {getTags} from "../repositories/tags";

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
