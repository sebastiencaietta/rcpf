import React from 'react';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MoveUpIcon from "@material-ui/icons/ExpandLess";
import MoveDownIcon from "@material-ui/icons/ExpandMore";
import IngredientRenderer from "./ingredient-renderer";
import DeleteIngredientButton from "./delete-ingredient-button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    moveIngredientButton: {padding: 0, borderRadius: 0},
}));

const IngredientList = ({ingredients, onIngredientsChange, ingredientsById}) => {
    const classes = useStyles();

    function handleMoveIngredientUp(index) {
        const newIngredients = [
            ...ingredients.slice(0, index - 1),
            ingredients[index],
            ingredients[index-1],
            ...ingredients.slice(index + 1, ingredients.length)
        ];
        onIngredientsChange(newIngredients);
    }

    function handleMoveIngredientDown(index) {
        const newIngredients = [...ingredients.slice(0, index),
            ingredients[index+1],
            ingredients[index],
            ...ingredients.slice(index + 2, ingredients.length)
        ];
        onIngredientsChange(newIngredients);
    }

    function handleDeleteIngredient(index) {
        const newIngredients = [...ingredients.slice(0, index), ...ingredients.slice(index+1, ingredients.length)];
        onIngredientsChange(newIngredients);
    }

    return <Grid item xs={12} container spacing={2} alignItems="center">
        {ingredients.map((ingredient, index) => (<React.Fragment key={index}>
            <Grid item xs={1} container direction="column">
                <IconButton className={classes.moveIngredientButton} disabled={index === 0}
                            onClick={() => handleMoveIngredientUp(index)}>
                    <MoveUpIcon/>
                </IconButton>
                <IconButton className={classes.moveIngredientButton} disabled={index === ingredients.length - 1}
                            onClick={() => handleMoveIngredientDown(index)}>
                    <MoveDownIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={9}>
                <IngredientRenderer recipeIngredient={ingredient}
                                    ingredientSettings={ingredientsById[ingredient.ingredientId]}/>
            </Grid>
            <Grid item xs={2} container alignItems="center" justify="center">
                <DeleteIngredientButton onDelete={(index) => handleDeleteIngredient(index)} index={index}/>
            </Grid>
        </React.Fragment>))}
    </Grid>;
};

export default IngredientList;
