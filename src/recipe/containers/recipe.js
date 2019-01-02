import {connect} from 'react-redux';
import Recipe from '../components/recipe';
import {CATEGORIES_RECEIVED} from '../../recipe-list/types/categories';

const mapStateToProps = (state) => ({
    recipe: state.currentRecipe,
    categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
    initRecipe: (recipe) => dispatch({type: 'RECIPE_RECEIVED', payload: recipe}),
    initCategories: (recipe) => dispatch({type: CATEGORIES_RECEIVED, payload: recipe}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
