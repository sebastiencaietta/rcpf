import React, {useEffect, useState} from 'react';
import RecipeList from './containers/recipe-list';
import {fetchCategories, fetchRecipes, fetchTags} from "../global/eve";
import Filters from './containers/filters';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    filtersGridItem:{
        // paddingRight: theme.spacing(2),
    }
}));

export default () => {
    const [tags, setTags] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        Promise.all([fetchRecipes(), fetchTags(), fetchCategories()]).then(([recipes, tags, categories]) => {
            setTags(tags);
            setRecipes(recipes);
            setCategories(categories);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return <React.Fragment>
        <Grid container spacing={3}>
            <Grid item xs={12} md={3} className={classes.filtersGridItem}>
                <Filters tags={tags} categories={categories}/>
            </Grid>
            <Grid item xs={12} md={9}>
                <RecipeList recipes={recipes}/>
            </Grid>
        </Grid>

    </React.Fragment>;
};
