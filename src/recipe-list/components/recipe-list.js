import React from 'react';
import Recipe from './recipe-card';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    recipeList: {
        paddingTop: theme.spacing(3),
    }
}));

export default function RecipeList({recipes}) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container justifyContent="flex-start" spacing={4} className={classes.recipeList}>
                {recipes.map(recipe => <Recipe recipe={recipe} key={recipe.slug}/>)}
            </Grid>
        </React.Fragment>
    );
}
