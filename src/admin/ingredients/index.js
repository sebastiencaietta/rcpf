import React, {useEffect, useState} from "react";
import IngredientsAdmin from './containers/ingredients-admin'
import Layout from "../../layout";
import SignInPage from '../../global/components/sign-in-page';
import CircularProgress from "@material-ui/core/CircularProgress";
import {getIngredients} from "../../repositories/ingredients";
import {sortAlphabetically} from "../../global/lodash";
import {getRecipes} from "../../repositories/recipes";

const getRecipesByIngredient = ((recipes, ingredients) => {
    const recipesByIngredientId = {};
    ingredients.forEach(ingredient => {
        recipesByIngredientId[ingredient.id] = recipes.filter(recipe => {
            if (!recipe.ingredients || recipe.ingredients.length === 0) {
                return false;
            }

            return recipe.ingredients.sections.some(section => section.ingredients.some(recipeIngredient => recipeIngredient.ingredientId === ingredient.id));
        });
    });
    return recipesByIngredientId;
});

export default function IngredientsAdminPage() {
    const [loading, setLoading] = useState(true);
    const [ingredients, setIngredients] = useState([]);
    const [recipesByIngredientId, setRecipesByIngredientId] = useState({});

    useEffect(() => {
        Promise.all([getIngredients(), getRecipes()]).then(([ingredients, recipes]) => {
            setIngredients(sortAlphabetically(ingredients, 'name'));
            const test = getRecipesByIngredient(recipes, ingredients);
            setRecipesByIngredientId(test);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Layout>
            <div style={{display: 'flex', height: '90vh', alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress />
            </div>
        </Layout>;
    }

    return <Layout>
        <SignInPage>
            <IngredientsAdmin savedIngredients={ingredients} recipesByIngredientId={recipesByIngredientId}/>
        </SignInPage>
    </Layout>
}
