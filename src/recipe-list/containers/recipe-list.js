import React from 'react';
import RecipeList from '../components/recipe-list';
import {useFilters} from "../use-filters";
import NoRecipeFound from "../components/no-recipe-found";
import {filterRecipes} from "../../global/containers/filtered-recipe-list";
import {paginated} from "../../global/components/paginated-element";

const Recipes = ({recipes}) => {
    const {filters, onUpdatePage} = useFilters();
    const visibleRecipes = filterRecipes(filters, recipes);

    if (visibleRecipes.length === 0) {
        return <NoRecipeFound/>;
    }

    const options = {
        items: visibleRecipes,
        onPageChangeCallback: onUpdatePage,
        currentPage: filters.page,
        perPage: 42,
        propName: 'recipes',
    }

    return paginated(options)(RecipeList);
};

export default Recipes;
