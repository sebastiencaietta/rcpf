import React, {useEffect, useState} from 'react';
import RecipeListContainer from './containers/recipe-list';
import {fetchCategories, fetchRecipes, fetchTags} from "../global/eve";
import Grid from "@material-ui/core/Grid";
import Layout from "../layout";
import heroBg from './images/recipes-hero.webp';
import Hero from "../global/components/hero";
import Filters from "./components/filters";
import {Helmet} from 'react-helmet-async';
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "../layout/container";

const RecipeList = () => {
    const [tags, setTags] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([fetchRecipes(), fetchTags(), fetchCategories()]).then(([recipes, tags, categories]) => {
            setTags(tags);
            setRecipes(recipes);
            setCategories(categories);
            setLoading(false);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return <Layout hero={<Hero title="Recettes" bg={heroBg}/>}>
        <Helmet>
            <title>CookMate | Toutes les recettes</title>
        </Helmet>

        <Filters tags={tags} categories={categories}/>

        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {
                        loading ? <CircularProgress/> : <RecipeListContainer recipes={recipes}/>
                    }
                </Grid>
            </Grid>
        </Container>


    </Layout>;
};

export default RecipeList;
