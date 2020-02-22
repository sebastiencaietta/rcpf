import React, {useEffect, useState} from 'react';
import RecipeList from './containers/recipe-list';
import Layout from "../layout/index";
import {fetchCategories, fetchRecipes, fetchTags} from "../global/eve";
import Filters from './containers/filters';

export default () => {
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

    return <Layout title="Recettes" rightSideDrawer={<Filters tags={tags}/>}>
        <RecipeList categories={categories} recipes={recipes}/>
    </Layout>;
};
