import React from 'react';
import Recipe from './recipe-card';
import CategoryTabs from "./category-tabs";

const filterRecipes = (filters, recipes) => {
    const {search = '', tags = [], category} = filters;

    return recipes.filter((recipe) => {
        if (search !== '' && !recipe.title.toLowerCase().includes(search.toLowerCase())) {
            return false;
        }

        if (tags.length !== 0) {
            const hasAllTags = tags.every((tagId) => {
                return recipe.tags.some((recipeTagId) => recipeTagId === tagId);
            });

            if (!hasAllTags) {
                return false;
            }
        }

        if (category) {
            return recipe.category === category;
        }

        return true;
    });
};

export default class RecipeList extends React.Component {
    render() {
        const {recipes = [], categories = [], filters} = this.props;

        return (
            <React.Fragment>
                <CategoryTabs categories={categories} onChange={this.props.toggleCategory} />
                {filterRecipes(filters, recipes).map(recipe => <Recipe recipe={recipe} key={recipe.slug}/>)}
            </React.Fragment>
        );
    };

}
