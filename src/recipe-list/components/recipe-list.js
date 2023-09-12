import React from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";
import RecipeCard from "./recipe-card";
import RecipeImage from '../images/recipe.jpg'

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
                {recipes.map(recipe => <Grid item xs={12} sm={6} md={4} key={recipe.slug}>
                        <RecipeCard
                            id={recipe.id}
                            image={recipe.thumbnail || RecipeImage}
                            // image={RecipeImage}
                            link={`/recipes/${recipe.slug}`}
                            title={recipe.title}/>
                    </Grid>
                )}
            </Grid>
        </React.Fragment>
    );
}
