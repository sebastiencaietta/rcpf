import React from 'react';
import Filters from './containers/filters';
import RecipeList from './containers/recipe-list';

export default () => (
    <div className="row recipe-list">
        <div className="col-sm-12 col-md-3">
            <Filters />
        </div>

        <div className="col-sm-12 col-md-9">
            <RecipeList />
        </div>
    </div>
);
