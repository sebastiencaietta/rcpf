import React from 'react';
import {eve} from '../../global/eve';
import Recipe from './recipe-card';

const fetchRecipes = async initRecipes => {
    const response = await eve.get('recipes');
    initRecipes(response.data);
};

export default class RecipeList extends React.Component {
    componentWillMount() {
        const {initRecipes} = this.props;
        fetchRecipes(initRecipes);
    }

    render() {
        const {recipes = []} = this.props;

        return (
            <div className="row">
                {recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id}/>)}
            </div>
        );
    };

}
