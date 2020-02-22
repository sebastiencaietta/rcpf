import React, {useEffect, useState} from 'react';
import Layout from "../../../layout/index";
import AddRecipeForm from './containers/add-recipe-form';
import {getRecipe, setRecipe, uploadRecipeThumbnail} from "../../../repositories/recipes";
import {requiresLogin} from "../../../global/components/requires-login";

const saveRecipe = async (recipe) => {
    return setRecipe(recipe);
};

const ProtectedRecipeForm = requiresLogin(AddRecipeForm);

const Component = (props) => {
    const [recipe, setRecipe] = useState({});

    if (props.match.params.slug) {
        useEffect(() => {
            async function fetchRecipe(slug) {
                const result = await getRecipe(slug);
                setRecipe(result);
            }
            fetchRecipe(props.match.params.slug);
        }, []);
    }

    return <Layout title="Add a recipe">
        <ProtectedRecipeForm handleSubmit={saveRecipe} recipe={recipe} handleUploadRecipeThumbnail={uploadRecipeThumbnail}/>
    </Layout>
};

export default Component;
