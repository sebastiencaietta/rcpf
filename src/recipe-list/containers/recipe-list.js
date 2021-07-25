import React, {useEffect} from 'react';
import RecipeList from '../components/recipe-list';
import {useFilters} from "../use-filters";
import {includesNormalized} from "../../global/lodash";
import {Pagination} from "@material-ui/lab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NoRecipeFound from "../components/no-recipe-found";

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
    const visibleRecipes = paginatedRecipes(filteredRecipes, filters.page);

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
