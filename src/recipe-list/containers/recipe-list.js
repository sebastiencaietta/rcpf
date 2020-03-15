import {connect} from 'react-redux';
import RecipeList from '../components/recipe-list';

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

const mapStateToProps = (state, ownProps) => {
    const recipes = ownProps.recipes;
    const filters = state.filters;

    return {
        recipes: filterRecipes(filters, recipes),
    }
};

export default connect(mapStateToProps)(RecipeList)
