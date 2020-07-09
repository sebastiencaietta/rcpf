import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AdminIngredientForm from "../components/ingredient-form";
import AdminIngredientList from "../components/ingredient-list";
import {makeStyles} from "@material-ui/core";
import {addIngredient, deleteIngredient, getIngredients, updateIngredient} from "../../../repositories/ingredients";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import Divider from "@material-ui/core/Divider";

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

export default () => {
    const classes = useStyles();
    const [ingredients, setIngredients] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const showSuccess = message => {
        setSnackbarType('success');
        setSnackbarOpen(true);
        setSnackbarMessage(message);
    };

    const showError = message => {
        setSnackbarType('error');
        setSnackbarOpen(true);
        setSnackbarMessage(message);
    };

    const addNewIngredient = async (ingredient) => {
        try {
            const newIngredient = await addIngredient(ingredient);
            setIngredients([
                ...ingredients,
                newIngredient,
            ]);
            showSuccess('Ingredient ajouté');
        } catch (error) {
            showError(error.message);
        }
    };

    const handleUpdateIngredient = async (ingredientToUpdate) => {
        try {
            const updatedIngredient = await updateIngredient(ingredientToUpdate);
            setIngredients(ingredients.map(
                ingredient => ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
            ));
            showSuccess('Ingredient sauvegardé');
        } catch (error) {
            showError(error.message);
        }
    };

    const handleDeleteIngredient = async (ingredientToDelete) => {
        try {
            await deleteIngredient(ingredientToDelete);
            setIngredients(ingredients.filter(
                ingredient => ingredient.id !== ingredientToDelete.id
            ));
            showSuccess('Ingredient supprimé');
        } catch (error) {
            showError(error.message);
        }
    };

    useEffect(() => {
        const fetchIngredients = async () => {
            const ingredients = await getIngredients();
            ingredients.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
            setIngredients(ingredients);
        };

        fetchIngredients();
    }, []);

    const handleSuccessClose = () => {
        setSnackbarOpen(false);
    };

    return <React.Fragment>
        <Paper className={classes.paper}>
            <Typography variant="h6">Ajouter un nouvel ingrédient</Typography>
            <Divider />
            <AdminIngredientForm onSubmit={addNewIngredient}/>
        </Paper>

        <Paper className={classes.paper}>
            <Typography variant="h6">Ingrédients sauvegardés</Typography>
            <Divider />
            <AdminIngredientList
                ingredients={ingredients}
                updateIngredient={handleUpdateIngredient}
                deleteIngredient={handleDeleteIngredient}/>
        </Paper>

        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            open={snackbarOpen}
            autoHideDuration={100000}
            onClose={handleSuccessClose}
        >
            <SnackbarContent
                aria-describedby="message-id"
                className={classes[snackbarType]}
                message={<span id="message-id">{snackbarMessage}</span>}
            />
        </Snackbar>
    </React.Fragment>
}
