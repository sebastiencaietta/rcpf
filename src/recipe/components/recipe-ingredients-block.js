import React from 'react';
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import IngredientRenderer from "../../global/components/ingredient-renderer";

const useStyles = makeStyles(theme => ({
    root: {padding: theme.spacing(2)},
    ingredientLine: {margin: theme.spacing(1, 0)},
}));

const RecipeIngredientsBlock = ({recipe, ingredients}) => {
    const classes = useStyles();

    return <Paper className={classes.root}>
        {
            recipe.ingredients.sections.map((section, index) => <div key={index}>
                <h2>{section.title}</h2>

                {section.ingredients.map((ingredient, index) => (
                    <div className={classes.ingredientLine} key={index}>
                        <IngredientRenderer recipeIngredient={ingredient}
                                            ingredientSettings={ingredients[ingredient.ingredientId]}/>
                    </div>
                ))}
            </div>)
        }
    </Paper>
};

export default RecipeIngredientsBlock;
