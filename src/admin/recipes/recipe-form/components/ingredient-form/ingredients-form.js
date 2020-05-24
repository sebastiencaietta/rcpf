import React, {useEffect, useMemo, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {getIngredients} from "../../../../../repositories/ingredients";
import IngredientList from "./ingredient-list";
import AddIngredientForm from "./add-ingredient-form";

const IngredientsForm = ({savedRecipe, onIngredientsChange}) => {
    const [ingredients, setIngredients] = useState([]);
    const [ingredientOptions, setIngredientOptions] = useState([]);
    const [ingredientsById, setIngredientsById] = useState({});

    useEffect(() => {
        const initIngredients = async () => {
            const savedIngredients = await getIngredients();
            setIngredientOptions(savedIngredients.map(ingredient => ({
                label: ingredient.name,
                value: ingredient.id,
                image: ingredient.thumbnail,
            })));
            const tmp = {};
            savedIngredients.forEach(ingredient => tmp[ingredient.id] = ingredient)
            setIngredientsById({...tmp});
        }

        const initSavedRecipeIngredients = () => {
            if (savedRecipe.ingredients !== undefined && savedRecipe.ingredients.length > 0) {
                setIngredients(savedRecipe.ingredients);
            }
        };

        if (Object.keys(ingredientsById).length > 0) {
            initSavedRecipeIngredients();
        } else {
            initIngredients().then(initSavedRecipeIngredients);
        }
    }, [savedRecipe]);

    function handleAddIngredient(newIngredient) {
        const newIngredients = [...ingredients, newIngredient];
        setIngredients(newIngredients);
        onIngredientsChange(newIngredients)
    }

    function handleIngredientsChange(newIngredients) {
        setIngredients(newIngredients);
        onIngredientsChange(newIngredients);
    }

    return <Grid container item xs={12}>
        <AddIngredientForm onAddIngredient={handleAddIngredient} ingredientOptions={ingredientOptions}/>

        {useMemo(
            () => <IngredientList ingredients={ingredients}
                                  ingredientsById={ingredientsById}
                                  onIngredientsChange={handleIngredientsChange}/>,
            [ingredients]
        )}
    </Grid>;
}

export default IngredientsForm;
