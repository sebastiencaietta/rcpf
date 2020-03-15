import React from "react";
import AdminRecipeList from "./index/recipe-list";
import {requiresLogin} from '../../global/components/requires-login';
import Layout from "../../layout";

export default function RecipesAdmin() {
    const RecipeList = requiresLogin(AdminRecipeList);
    return <Layout><RecipeList /></Layout>
}
