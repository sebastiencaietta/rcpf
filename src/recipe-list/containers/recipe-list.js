import React from 'react';
import RecipeList from '../components/recipe-list';
import {useFilters} from "../use-filters";

const filterRecipes = (filters, recipes) => {
    const {search, tags, seasons, diets, category} = filters;

    return recipes.filter((recipe) => {
        if (search !== '' && !recipe.title.toLowerCase().includes(search.toLowerCase())) {
            return false;
        }

        if (category && recipe.category !== category) {
            return false;
        }

        if (tags.length !== 0) {
            const hasAllTags = tags.every((tagId) => {
                return recipe.tags.some((recipeTagId) => recipeTagId === tagId);
            });

            if (!hasAllTags) {
                return false;
            }
        }

        if (seasons.length !== 0 && recipe.seasons !== undefined) {
            const hasAllSeasons = seasons.every((seasonName) => {
                return recipe.seasons.some((recipeSeasonName) => recipeSeasonName === seasonName);
            });

            if (!hasAllSeasons) {
                return false;
            }
        }

        if (diets.length !== 0 && recipe.diets !== undefined) {
            const hasAllDiets = diets.every((dietName) => {
                return recipe.diets.some((recipeDietName) => recipeDietName === dietName);
            });

            if (!hasAllDiets) {
                return false;
            }
        }

        return true;
    });
};

export default ({recipes}) => {
    const {filters} = useFilters();
    return <RecipeList recipes={filterRecipes(filters, recipes)}/>
};
