import React, {useEffect, useState} from 'react';
import RecipeForm from './containers/recipe-form';
import {
    addRecipe,
    getRecipeBySlug,
    updateRecipe,
    uploadRecipeHero,
    uploadRecipeThumbnail
} from "../../../repositories/recipes";
import Layout from "../../../layout";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Helmet} from "react-helmet-async";
import Container from "../../../layout/container";

const saveRecipe = async (recipe) => {
    if (recipe.id === undefined) {
        return addRecipe(recipe);
    }

    return updateRecipe(recipe);
};

const Component = (props) => {
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(props.match.params.slug !== undefined);

    useEffect(() => {
        if (props.match.params.slug) {
            async function fetchRecipe(slug) {
                const result = await getRecipeBySlug(slug);
                setRecipe(result);
            }
            fetchRecipe(props.match.params.slug).then(() => setLoading(false));
        }
    }, [props.match.params.slug]);

    if (loading) {
        return <Layout>
            <Container justifyContent="center">
                <CircularProgress/>
            </Container>
        </Layout>;
    }

    return <Layout>
        <Helmet>
            <title>CookMate | Admin | {recipe.title || 'Nouvelle recette'}</title>
        </Helmet>
        <Container>
            <RecipeForm
                handleSubmit={saveRecipe}
                recipe={recipe}
                handleUploadRecipeThumbnail={uploadRecipeThumbnail}
                handleUploadRecipeHero={uploadRecipeHero}/>
        </Container>
    </Layout>
};

export default Component;
