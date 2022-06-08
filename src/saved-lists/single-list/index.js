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

    const [state, setState] = useState({
        recipes: [],
        list: {name: ''},
        loading: true,
    });

    useEffect(() => {
        const recipeIds = Object.keys(auth.user.lists.find(list => list.id === listId).recipes);
        getRecipesByRecipeIds(recipeIds).then((result) => {
            setState({
                recipes: result,
                list: auth.user.lists.find(list => list.id === listId),
                loading: false,
            });
        });
    }, [listId, auth.user.lists]);

    return <Layout>
        <Helmet>
            <title>CookMate | {state.list.name}</title>
        </Helmet>

        <Hero title={state.list.name} bg="/images/list-bg.jpg"/>

        <Filters />

        {
            state.loading
                ? <div style={{display: 'flex', height: '10vh', alignItems: 'center', justifyContent: 'center'}}>
                    <CircularProgress/>
                </div>
                :
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <RecipeList recipes={state.recipes} currentList={state.list}/>
                        </Grid>
                    </Grid>
                </Container>
        }
    </Layout>;
}

export default SingleListPage;
