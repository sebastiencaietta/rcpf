import React, {useEffect, useState} from "react";
import Layout from "../../layout";
import {Helmet} from "react-helmet-async";
import Container from "../../layout/container";
import {useAuth} from "../../auth/use-auth";
import {getRecipesByRecipeIds} from "../../repositories/recipes";
import Hero from "../../global/components/hero";
import Grid from "@material-ui/core/Grid";
import RecipeList from "./containers/recipe-list";
import Filters from "./containers/filters";
import CircularProgress from "@material-ui/core/CircularProgress";

const SingleListPage = (props) => {
    const listId = props.match.params.listId;
    const auth = useAuth();

    const list = auth.user.lists.find(list => list.id === listId);

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recipeIds = Object.keys(list.recipes);
        getRecipesByRecipeIds(recipeIds).then((result) => {setRecipes(result); setLoading(false)});
    }, [list.recipes]);

    return <Layout>
        <Helmet>
            <title>CookMate | {list.name}</title>
        </Helmet>

        <Hero title={list.name}/>

        <Filters />

        {
            loading
                ? <div style={{display: 'flex', height: '10vh', alignItems: 'center', justifyContent: 'center'}}>
                    <CircularProgress/>
                </div>
                :
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <RecipeList recipes={recipes} currentList={list}/>
                        </Grid>
                    </Grid>
                </Container>
        }
    </Layout>;
}

export default SingleListPage;
