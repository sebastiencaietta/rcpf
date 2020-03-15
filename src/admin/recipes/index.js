import React from "react";
import AdminRecipeList from "./index/recipe-list";
import {requiresLogin} from '../../global/components/requires-login';

export default function RecipesAdmin() {
    const RecipeList = requiresLogin(AdminRecipeList);
    return <RecipeList />
}
