import React from 'react';
import {Route} from 'react-router-dom';
import RecipeList from "./recipe-list";
import AddRecipe from './admin/recipes/new-recipe';

export default function App() {
    return (
        <React.Fragment>
            <Route exact path="/" component={RecipeList}/>
            <Route exact path="/admin/recipes/add" component={AddRecipe}/>
        </React.Fragment>
    );
}
