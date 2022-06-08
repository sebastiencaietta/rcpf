import React from 'react';
import RecipeList from '../components/recipe-list';
import NoRecipeInList from "../components/no-recipe-in-list";
import {paginated} from "../../../global/components/paginated-element";
import {useListViewFilters} from "../use-filters";
import {filterRecipes} from "../../../global/containers/filtered-recipe-list";

const Recipes = ({recipes, currentList}) => {
    const {filters, onUpdatePage, hasChanges, reset} = useListViewFilters();
    const visibleRecipes = filterRecipes(filters, recipes, currentList.recipes);

    if (visibleRecipes.length === 0) {
        return <NoRecipeInList resetFilters={reset} isFiltered={hasChanges()}/>;
    }

    const options = {
        items: visibleRecipes,
        onPageChangeCallback: onUpdatePage,
        currentPage: filters.page,
        perPage: 42,
        propName: 'recipes',
    }

    return paginated(options, {currentList})(RecipeList);
};

export default Recipes;
