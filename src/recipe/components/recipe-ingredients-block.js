import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import IngredientRenderer from "../../global/components/ingredient-renderer";

const useStyles = makeStyles(theme => ({
    ingredientLine: {margin: theme.spacing(1, 0)},
}));

const RecipeIngredientsBlock = ({recipe, ingredients}) => {
    const classes = useStyles();

    return <>
        {
            recipe.ingredients.sections.map((section, index) => <div key={index}>
                <h1>{section.title}</h1>

                {section.ingredients.map((ingredient, index) => (
                    <div className={classes.ingredientLine} key={index}>
                        <IngredientRenderer recipeIngredient={ingredient}
                                            ingredientSettings={ingredients[ingredient.ingredientId]}/>
                    </div>
                ))}
            </div>)
        }
    </>
};

export default RecipeIngredientsBlock;
