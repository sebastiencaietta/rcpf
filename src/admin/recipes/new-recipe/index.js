import React, {useEffect, useState} from 'react';
import AddRecipeForm from './containers/add-recipe-form';
import {getRecipeBySlug, addRecipe, uploadRecipeThumbnail, updateRecipe} from "../../../repositories/recipes";
import SignUpPage from '../../../global/components/sign-in-page';
import Layout from "../../../layout";

const saveRecipe = async (recipe) => {
    if (recipe.id === undefined) {
        return addRecipe(recipe);
    }

    return updateRecipe(recipe);
};

const Component = (props) => {
    const [recipe, setRecipe] = useState({});

    if (props.match.params.slug) {
        useEffect(() => {
            async function fetchRecipe(slug) {
                const result = await getRecipeBySlug(slug);
                setRecipe(result);
            }
            fetchRecipe(props.match.params.slug);
        }, []);
    }

    return <Layout>
        <SignUpPage>
            <AddRecipeForm
                handleSubmit={saveRecipe}
                recipe={recipe}
                handleUploadRecipeThumbnail={uploadRecipeThumbnail}/>
        </SignUpPage>
    </Layout>
};

export default Component;
