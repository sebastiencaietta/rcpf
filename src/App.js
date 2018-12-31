import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './navigation/nav-bar';
import RecipeList from './recipe-list';
import Recipe from './recipe/containers/recipe';
import EditRecipe from './recipe/containers/edit-recipe';

class App extends Component {
  render() {
    return (
        <main className={'container-fluid App'}>
            <Route path="/" component={NavBar}/>

            <Route exact path="/" component={RecipeList}/>

            <Route exact path="/recipes/:slug" component={Recipe}/>

            <Route path="/recipes/:slug/edit" component={EditRecipe}/>
        </main>
    );
  }
}

export default App;
