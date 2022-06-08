import React from 'react';
import RecipeCard from "./recipe-card";
import RecipeImage from "../../../recipe-list/images/recipe.jpg";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    recipeList: {
        paddingTop: theme.spacing(3),
    }
}));


const RecipeList = ({recipes, currentList}) => {
    const classes = useStyles();

    return <React.Fragment>
        <Grid container justifyContent="flex-start" spacing={4} className={classes.recipeList}>
            {recipes.map((recipe) => <Grid item xs={12} sm={6} md={4} key={recipe.slug}>
                <RecipeCard id={recipe.id}
                            image={recipe.thumbnail || RecipeImage}
                            // image={RecipeImage}
                            link={`/recipes/${recipe.slug}`}
                            title={recipe.title}
                            currentListId={currentList.id}
                />
            </Grid>)}
        </Grid>
    </React.Fragment>
}

export default RecipeList;
