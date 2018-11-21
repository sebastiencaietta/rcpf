import {connect} from 'react-redux';
import RecipeList from '../components/recipe-list';
import {RECIPES_RECEIVED} from '../types/recipes';

const mapStateToPros = state => ({
    recipes: state.recipes,
});

const mapDispatchToProps = dispatch => ({
    initRecipes: recipes => dispatch({type: RECIPES_RECEIVED, payload: recipes}),
});

export default connect(mapStateToPros, mapDispatchToProps)(RecipeList)
