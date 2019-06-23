import {connect} from 'react-redux';
import RecipeList from '../components/recipe-list';
import {TOGGLE_CATEGORY} from "../types/filters";

const mapStateToPros = state => ({
    filters: {...state.filters},
});

const mapDispatchToProps = dispatch => ({
    toggleCategory: categoryId => dispatch({type: TOGGLE_CATEGORY, payload: categoryId}),
});

export default connect(mapStateToPros, mapDispatchToProps)(RecipeList)
