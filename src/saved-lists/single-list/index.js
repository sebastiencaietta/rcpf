import React, {useEffect, useState} from "react";
import Layout from "../../layout";
import {Helmet} from "react-helmet-async";
import Container from "../../layout/container";
import {useAuth} from "../../auth/use-auth";
import {getRecipesByRecipeIds} from "../../repositories/recipes";
import Hero from "../../global/components/hero";
import Grid from "@material-ui/core/Grid";
import RecipeList from "./components/recipe-list";
import Filters from "./containers/filters";
import FilteredRecipeList from "../../global/containers/filtered-recipe-list";
import {useListViewFilters} from "./use-filters";

const SingleListPage = (props) => {
    const listId = props.match.params.listId;
    const auth = useAuth();

    console.log(auth.user.lists);
    const list = auth.user.lists.find(list => list.id === listId);

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const recipeIds = Object.keys(list.recipes);
        getRecipesByRecipeIds(recipeIds).then((result) => setRecipes(result));
    }, [list.recipes]);

    const filters = useListViewFilters();

    return <Layout>
        <Helmet>
            <title>CookMate | {list.name}</title>
        </Helmet>

        <Hero title={list.name}/>

        <Filters />

        <Container>
            {listId}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <RecipeList recipes={recipes} currentListId={listId}/>
                </Grid>
            </Grid>


        </Container>
    </Layout>;
}

export default SingleListPage;
