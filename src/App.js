import React from 'react';
import {Route} from 'react-router-dom';
import RecipeList from "./recipe-list";
import Recipe from './recipe';
import AddRecipe from './admin/recipes/new-recipe';
import RecipesAdmin from './admin/recipes';
import IngredientsAdmin from "./admin/ingredients";
import Auth from './auth'

export default () => (
    <React.Fragment>
        <Auth />
        <Route exact path="/" component={RecipeList}/>
        <Route exact path="/recipes/:slug" component={Recipe}/>
        <Route exact path="/admin/recipes/add" component={AddRecipe}/>
        <Route exact path="/admin/recipes" component={RecipesAdmin}/>
        <Route exact path="/admin/recipes/edit/:slug" component={AddRecipe}/>
        <Route exact path="/admin/ingredients/" component={IngredientsAdmin}/>
    </React.Fragment>
);

