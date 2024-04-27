import React, {useEffect, useState} from 'react';
import RecipeListContainer from './containers/recipe-list';
import {fetchCategories, fetchRecipes, fetchTags} from "../global/eve";
import Grid from "@material-ui/core/Grid";
import Layout from "../layout";
import heroBg from './images/recipes-hero.webp';
import Hero from "../global/components/hero";
import Filters from "./containers/filters";
import {Helmet} from 'react-helmet-async';
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "../layout/container";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([fetchRecipes(), fetchTags(), fetchCategories()]).then(([recipes, tags, categories]) => {
            setRecipes(recipes);
            setLoading(false);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return <Layout hero={<Hero title="Recettes" bg={heroBg}/>}>
        <Helmet>
            <title>CookMate | Toutes les recettes</title>
        </Helmet>

        <Filters/>

        {
            loading
                ? <div style={{display: 'flex', height: '10vh', alignItems: 'center', justifyContent: 'center'}}>
                    <CircularProgress />
                </div>
                : <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <RecipeListContainer recipes={recipes}/>
                        </Grid>
                    </Grid>
                </Container>
        }


    </Layout>;
};

export default RecipeList;
