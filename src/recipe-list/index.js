import React, {useEffect, useState} from 'react';
import RecipeList from './containers/recipe-list';
import {fetchCategories, fetchRecipes, fetchTags} from "../global/eve";
import Filters from './containers/filters';
import Grid from "@material-ui/core/Grid";
import Layout from "../layout";
import heroBg from './images/recipes-hero.webp';
import Hero from "../global/components/hero";

export default () => {
    const [tags, setTags] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Promise.all([fetchRecipes(), fetchTags(), fetchCategories()]).then(([recipes, tags, categories]) => {
            setTags(tags);
            setRecipes(recipes);
            setCategories(categories);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return <Layout hero={<Hero title="Recettes" bg={heroBg}/>}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
                <Filters tags={tags} categories={categories}/>
            </Grid>
            <Grid item xs={12} md={9}>
                <RecipeList recipes={recipes}/>
            </Grid>
        </Grid>

    </Layout>;
};
