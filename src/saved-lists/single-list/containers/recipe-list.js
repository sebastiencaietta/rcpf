import React from 'react';
import RecipeList from '../components/recipe-list';
import NoRecipeInList from "../components/no-recipe-in-list";
import PaginatedElement, {paginated} from "../../../global/components/paginated-element";
import {useListViewFilters} from "../use-filters";
import {filterRecipes} from "../../../global/containers/filtered-recipe-list";

const Recipes = ({recipes, currentList}) => {
    const {filters, onUpdatePage} = useListViewFilters();
    const visibleRecipes = filterRecipes(filters, recipes, currentList.recipes);

    if (visibleRecipes.length === 0) {
        return <NoRecipeInList/>;
    }

    const options = {
        items: visibleRecipes,
        onPageChangeCallback: onUpdatePage,
        currentPage: filters.page,
        perPage: 42,
        propName: 'recipes',
    }

    // return <PaginatedElement items={recipes} onPageChangeCallback={onUpdatePage} currentPage={filters.page} perPage={42}>
    //     <RecipeList recipes={visibleRecipes} />
    // </PaginatedElement>

    return paginated(options, {currentList})(RecipeList);
};

export default Recipes;
