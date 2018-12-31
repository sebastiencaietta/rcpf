import {connect} from 'react-redux';
import RecipeList from '../components/recipe-list';
import {RECIPES_RECEIVED} from '../types/recipes';

const mapStateToPros = state => ({
    recipes: filterRecipes(state.filters, state.recipes),
});

const filterRecipes = (filters, recipes) => {
    const {search = '', tags = [], category} = filters;

    return recipes.filter((recipe) => {
        if (search !== '' && !recipe.title.toLowerCase().includes(search.toLowerCase())) {
            return false;
        }

        if (tags.length !== 0) {
            const hasAllTags = tags.every((tagId) => {
                return recipe.tags.some((tag) => tag.id === tagId);
            });

            if (!hasAllTags) {
                return false;
            }
        }

        if (category) {
            return recipe.category.id === category;
        }

        return true;
    });
};

const mapDispatchToProps = dispatch => ({
    initRecipes: recipes => dispatch({type: RECIPES_RECEIVED, payload: recipes}),
});

export default connect(mapStateToPros, mapDispatchToProps)(RecipeList)
