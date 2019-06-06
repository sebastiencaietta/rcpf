import React from 'react';
import {connect} from 'react-redux';
import EditRecipeForm from '../components/edit-recipe-form';
import {RECIPE_RECEIVED} from '../types/current-recipe';
import {CATEGORIES_RECEIVED} from '../../recipe-list/types/categories';
import {FORM_RESPONSE_SUCCESS, FORM_SUBMITTED} from '../types/edit-recipe-form';
import {editRecipe} from '../../global/eve';

const mapStateToProps = (state) => ({
    recipe: state.currentRecipe,
    categories: state.categories,
    initialValues: state.currentRecipe,
});

const submit = (dispatch) => (async (values) => {
    dispatch({type: FORM_SUBMITTED, payload: values});

    const response = await editRecipe(values);

    dispatch({type: FORM_RESPONSE_SUCCESS, payload: response});
});

const mapDispatchToProps = (dispatch) => ({
    initRecipe: (recipe) => dispatch({type: RECIPE_RECEIVED, payload: recipe}),
    initCategories: (recipe) => dispatch({type: CATEGORIES_RECEIVED, payload: recipe}),
    onSubmit: submit(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    (props) => <EditRecipeForm onSubmit={props.onSubmit} {...props}/>
);
