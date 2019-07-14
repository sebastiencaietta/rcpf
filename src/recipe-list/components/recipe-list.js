import React from 'react';
import Recipe from './recipe-card';
import CategoryTabs from "./category-tabs";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";

const filterRecipes = (filters, recipes) => {
    const {search = '', tags = [], category} = filters;

    return recipes.filter((recipe) => {
        if (search !== '' && !recipe.title.toLowerCase().includes(search.toLowerCase())) {
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

        if (category) {
            return recipe.category === category;
        }

        return true;
    });
};

const useStyles = makeStyles(theme => ({
    recipeList: {
        paddingTop: theme.spacing(3),
    }
}));

export default function RecipeList(props) {
    const {recipes = [], categories = [], filters} = props;
    const classes = useStyles();

    return (
        <React.Fragment>
            <CategoryTabs categories={categories} onChange={props.toggleCategory}/>
            <Grid container justify="flex-start" spacing={3} className={classes.recipeList}>
                {filterRecipes(filters, recipes).map(recipe => <Recipe recipe={recipe} key={recipe.slug}/>)}
            </Grid>
        </React.Fragment>
    );
}
