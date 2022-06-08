import {includesNormalized} from "../lodash";
import {filterIdToObjectMap} from "../constants/filters";

const sortRecipes = (filters, recipes, listMetadata) => {
    const {field, order, isListMetadata} = filterIdToObjectMap[filters.sortBy];
    return recipes.sort((a, b) => {
        let valueA;
        let valueB;
        if (isListMetadata) {
            valueA = listMetadata[a.id][field];
            valueB = listMetadata[b.id][field];
        } else {
            valueA = a[field];
            valueB = b[field];
        }

        const returnValue = valueA < valueB ? -1 : valueA > valueB ? 1 : 0

        return order === 'desc' ? returnValue * -1 : returnValue;
    });
};

export const filterRecipes = (filters, recipes, listMetadata) => {
    const {search, tags, seasons, diets, category} = filters;

    const filtered = recipes.filter((recipe) => {
        if (!includesNormalized(search, recipe.title)) {
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

    return sortRecipes(filters, filtered, listMetadata);
};
