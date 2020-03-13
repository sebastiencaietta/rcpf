import React from "react";
import Layout from '../../layout'
import AdminRecipeList from "./index/recipe-list";
import {requiresLogin} from '../../global/components/requires-login';

export default function RecipesAdmin() {
    const RecipeList = requiresLogin(AdminRecipeList);

    return <Layout title="Recipes Admin">
        {/*Search input*/}
        {<RecipeList />}
    </Layout>
}
