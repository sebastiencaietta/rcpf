import React, {useEffect, useState} from "react";
import Layout from "../layout";
import {getRecipe} from "../repositories/recipes";
import RecipePage from './components/recipe-page'

const Component = (props) => {
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        async function fetchRecipe(slug) {
            const result = await getRecipe(slug);
            setRecipe(result);
        }

        fetchRecipe(props.match.params.slug).catch(error => console.error(error));
    }, []);

    return <Layout title={`${recipe.title}`}>
        <RecipePage recipe={recipe}/>
    </Layout>
};

export default Component;
