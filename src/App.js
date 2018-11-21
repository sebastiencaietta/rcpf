import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './navigation/nav-bar';
import RecipeList from './recipe-list';


class App extends Component {
  render() {
    return (
        <main className={'container-fluid App'}>
            <Route path="/" component={NavBar}/>
            <Route path="/" component={RecipeList}/>
        </main>
    );
  }
}

export default App;
