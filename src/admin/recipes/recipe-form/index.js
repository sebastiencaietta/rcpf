import React, {useEffect, useState} from 'react';
import RecipeForm from './containers/recipe-form';
import {
    getRecipeBySlug,
    addRecipe,
    uploadRecipeThumbnail,
    updateRecipe,
    uploadRecipeHero
} from "../../../repositories/recipes";
import SignUpPage from '../../../global/components/sign-in-page';
import Layout from "../../../layout";
import CircularProgress from "@material-ui/core/CircularProgress";

const saveRecipe = async (recipe) => {
    if (recipe.id === undefined) {
        return addRecipe(recipe);
    }

    return updateRecipe(recipe);
};

const Component = (props) => {
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(props.match.params.slug !== undefined);

    if (props.match.params.slug) {
        useEffect(() => {
            async function fetchRecipe(slug) {
                const result = await getRecipeBySlug(slug);
                setRecipe(result);
            }
            fetchRecipe(props.match.params.slug).then(() => setLoading(false));
        }, []);
    }

    if (loading) {
        return <Layout>
            <div style={{display: 'flex', height: '90vh', alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress />
            </div>
        </Layout>;
    }

    return <Layout>
        <SignUpPage>
            <RecipeForm
                handleSubmit={saveRecipe}
                recipe={recipe}
                handleUploadRecipeThumbnail={uploadRecipeThumbnail}
                handleUploadRecipeHero={uploadRecipeHero}/>
        </SignUpPage>
    </Layout>
};

export default Component;
