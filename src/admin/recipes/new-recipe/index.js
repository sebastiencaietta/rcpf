import React, {useEffect, useState} from 'react';
import Layout from "../../../layout/index";
import AddRecipeForm from './containers/add-recipe-form';
import {getRecipe, setRecipe} from "../../../repositories/recipes";

const saveRecipe = async (recipe) => {
    return setRecipe(recipe);
};

const Component = (props) => {
    const [recipe, setRecipe] = useState({});

    if (props.match) {
        useEffect(() => {
            async function fetchRecipe(slug) {
                const result = await getRecipe(slug);
                setRecipe(result);
            }
            fetchRecipe(props.match.params.slug);
        }, []);
    }

    return <Layout title="Add a recipe">
        <AddRecipeForm handleSubmit={saveRecipe} recipe={recipe}/>
    </Layout>
};

export default Component;
