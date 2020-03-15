import React, {useEffect, useState} from "react";
import {getRecipe} from "../repositories/recipes";
import RecipePage from './components/recipe-page'
import CircularProgress from "@material-ui/core/CircularProgress";

const Component = (props) => {
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        async function fetchRecipe(slug) {
            const result = await getRecipe(slug);
            setRecipe(result);
        }

        fetchRecipe(props.match.params.slug).catch(error => console.error(error));
    }, []);

    return recipe.title ? <RecipePage recipe={recipe}/> : <CircularProgress />
};

export default Component;
