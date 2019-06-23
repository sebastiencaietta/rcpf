import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import RecipeList from './containers/recipe-list';
import Layout from "../layout/index";
import {fetchCategories, fetchRecipes, fetchTags} from "../global/eve";
import Filters from './components/filters';
import {TOGGLE_TAG, UPDATE_SEARCH} from "./types/filters";

const Component = (props) => {
    const [tags, setTags] = useState([]);
    const [recipes, setRecipes] = useState();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Promise.all([fetchRecipes(), fetchTags(), fetchCategories()]).then(([recipes, tags, categories]) => {
            setTags(tags);
            setRecipes(recipes);
            setCategories(categories);
        });
    }, []);

    return <Layout title="Recipes" rightSideDrawer={<Filters tags={tags} onToggle={props.selectTag} onSearch={props.onSearch}/>}>
        <RecipeList categories={categories} recipes={recipes}/>
    </Layout>;
};

const mapDispatchToProps = (dispatch) => ({
    selectTag: (tagId) => dispatch({type: TOGGLE_TAG, payload: tagId}),
    onSearch: (search) => dispatch({type: UPDATE_SEARCH, payload: search})
});

export default connect(null, mapDispatchToProps)(Component)