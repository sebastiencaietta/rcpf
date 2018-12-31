import {connect} from 'react-redux';
import Recipe from '../components/recipe';

const mapStateToProps = (state) => ({
    recipe: state.currentRecipe,
});

const mapDispatchToProps = (dispatch) => ({
   initRecipe: (recipe) => dispatch({type: 'RECIPE_RECEIVED', payload: recipe})
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
