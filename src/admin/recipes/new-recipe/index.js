import React from 'react';
import Layout from "../../../layout/index";
import AddRecipeForm from './containers/add-recipe-form';
import {setRecipe} from "../../../repositories/recipes";

const saveRecipe = async (recipe) => {
    return setRecipe(recipe);
};

const Component = (props) => {
    return <Layout title="Add a recipe">
        <AddRecipeForm handleSubmit={saveRecipe}/>
    </Layout>
};

export default Component;
