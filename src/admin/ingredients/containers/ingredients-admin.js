import React, {useReducer} from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AdminIngredientList from "../components/ingredient-list";
import {makeStyles} from "@material-ui/core";
import {addIngredient, deleteIngredient, updateIngredient} from "../../../repositories/ingredients";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import Divider from "@material-ui/core/Divider";
import {sortAlphabetically} from "../../../global/lodash";

const useStyles = makeStyles(theme => {
    return {
        paper: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        success: {
            backgroundColor: theme.palette.success.light,
        },
        error: {
            backgroundColor: theme.palette.error.light,
        }
    };
});

const IngredientsAdmin = ({savedIngredients, recipesByIngredientId}) => {
    const classes = useStyles();
    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}), {
            ingredients: [...savedIngredients],
            snackbarOpen: false,
            snackbarType: 'success',
            snackbarMessage: '',
            recipes: {...recipesByIngredientId}
        });

    const showSuccess = message => {
        setState({
            snackbarType: 'success',
            snackbarMessage: message,
            snackbarOpen: true,
        })
    };

    const showError = message => {
        setState({
            snackbarType: 'error',
            snackbarOpen: true,
            snackbarMessage: message,
        });
    };

    const handleAddNewIngredient = async (ingredient) => {
        try {
            const newIngredient = await addIngredient(ingredient);
            setState({
                recipes: {
                    ...state.recipes,
                    [newIngredient.id]: []
                },
                ingredients: sortAlphabetically([
                    ...state.ingredients,
                    newIngredient,
                ], 'name')
            });
            showSuccess('Ingredient ajouté');
        } catch (error) {
            showError(error.message);
        }
    };

    const handleUpdateIngredient = async (ingredientToUpdate) => {
        try {
            const updatedIngredient = await updateIngredient(ingredientToUpdate);
            setState({
                ingredients: state.ingredients.map(
                    ingredient => ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
                )
            });
            showSuccess('Ingredient sauvegardé');
        } catch (error) {
            showError(error.message);
        }
    };

    const handleDeleteIngredient = async (ingredientToDelete) => {
        try {
            await deleteIngredient(ingredientToDelete);
            setState({
                ingredients: state.ingredients.filter(
                    ingredient => ingredient.id !== ingredientToDelete.id
                )
            });
            showSuccess('Ingredient supprimé');
        } catch (error) {
            showError(error.message);
        }
    };

    const handleSuccessClose = () => {
        setState({snackbarOpen: false});
    };

    return <React.Fragment>
        <Paper className={classes.paper}>
            <Typography variant="h6">Ingrédients</Typography>
            <Divider/>
            <AdminIngredientList
                ingredients={state.ingredients}
                recipesByIngredient={state.recipes}
                addIngredient={handleAddNewIngredient}
                updateIngredient={handleUpdateIngredient}
                deleteIngredient={handleDeleteIngredient}/>
        </Paper>

        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            open={state.snackbarOpen}
            autoHideDuration={100000}
            onClose={handleSuccessClose}
        >
            <SnackbarContent
                aria-describedby="message-id"
                className={classes[state.snackbarType]}
                message={<span id="message-id">{state.snackbarMessage}</span>}
            />
        </Snackbar>
    </React.Fragment>
};

export default IngredientsAdmin;
