import React, {useEffect} from 'react';
import RecipeList from '../components/recipe-list';
import {useFilters} from "../use-filters";
import {includesNormalized} from "../../global/lodash";
import {Pagination} from "@material-ui/lab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NoRecipeFound from "../components/no-recipe-found";
import {FILTER_NAME_ID, FILTER_NEW_ID} from "../../global/constants/filters";

const filterRecipes = (filters, recipes) => {
    const {search, tags, seasons, diets, category} = filters;

    return recipes.filter((recipe) => {
        if (!includesNormalized(search, recipe.title)) {
            return false;
        }

        if (category && recipe.category !== category) {
            return false;
        }

        if (tags.length !== 0) {
            const tagIds = tags.map(tag => tag['id']);
            const hasAllTags = tagIds.every((tagId) => {
                return recipe.tags.some((recipeTagId) => recipeTagId === tagId);
            });

            if (!hasAllTags) {
                return false;
            }
        }

        if (seasons.length !== 0 && recipe.seasons !== undefined) {
            const seasonNames = seasons.map(season => season['name']);
            const hasAllSeasons = seasonNames.every((seasonName) => {
                return recipe.seasons.some((recipeSeasonName) => recipeSeasonName === seasonName);
            });

            if (!hasAllSeasons) {
                return false;
            }
        }

        if (diets.length !== 0 && recipe.diets !== undefined) {
            const dietNames = diets.map(diet => diet['name']);
            const hasAllDiets = dietNames.every((dietName) => {
                return recipe.diets.some((recipeDietName) => recipeDietName === dietName);
            });

            if (!hasAllDiets) {
                return false;
            }
        }

        return true;
    });
};

const sortRecipes = (filters, recipes) => {
      return recipes.sort((a, b) => {
          const field = filters.sortBy === FILTER_NAME_ID ? 'slug' : 'createdAt';
          const valueA = a[field];
          const valueB = b[field];

          const returnValue = valueA < valueB ? -1 : valueA > valueB ? 1 : 0

          return filters.sortBy === FILTER_NEW_ID ? returnValue * -1 : returnValue;
      });
};

const useStyles = makeStyles((theme) => ({
    paginationRoot: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(1),
    }
}))

const paginatedRecipes = (filteredRecipes, page) => {
    return [
        ...filteredRecipes.slice(
            (page - 1) * 42,
            Math.max((page - 1) * 42 + 42), filteredRecipes.length
        ),
    ];
}

const Recipes = ({recipes}) => {
    const {filters, onUpdatePage} = useFilters();
    const classes = useStyles();
    const filteredRecipes = filterRecipes(filters, recipes);
    const sortedRecipes = sortRecipes(filters, recipes);
    const visibleRecipes = paginatedRecipes(sortedRecipes, filters.page);

    const pageCount = Math.max(1, Math.ceil(filteredRecipes.length / 42));

    const handlePageChange = (event, value) => {
        window.scrollTo(0, 0);
        onUpdatePage(value);
    }

    useEffect(() => {
        if (pageCount < filters.page) {
            onUpdatePage(pageCount);
        }
    }, [pageCount, onUpdatePage, filteredRecipes, filters.page])

    if (visibleRecipes.length === 0) {
        return <NoRecipeFound/>;
    }

    return <>
        <RecipeList recipes={visibleRecipes}/>
        {
            pageCount <= 1
                ? ''
                : <div className={classes.paginationRoot}>
                    <Pagination count={pageCount} page={filters.page} onChange={handlePageChange} color="primary"/>
                </div>
        }
    </>
};

export default Recipes;
