import React from "react";
import Layout from '../../layout'
import AdminRecipeList from "./index/recipe-list";
import RequiresLogin from '../../global/components/requires-login';


export default function RecipesAdmin() {

    const RecipeList = RequiresLogin(AdminRecipeList);

    return <Layout title="Recipes Admin">
        {/*Search input*/}
        {<RecipeList />}

    </Layout>
}
