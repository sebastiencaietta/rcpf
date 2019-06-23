import React from 'react';
import {Route} from 'react-router-dom';
import RecipeList from "./recipe-list/";

export default function App() {
    return (
        <React.Fragment>
            <Route exact path="/" component={RecipeList}/>
        </React.Fragment>
    );
}
