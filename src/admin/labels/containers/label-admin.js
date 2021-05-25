import React, {useEffect, useState} from 'react';
import {fetchRecipes} from "../../../global/eve";
import LabelSelect from "../components/label-select";
import RecipeSelect from "../components/recipe-select";
import {updateLabel} from "../../../repositories/recipes";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import {makeStyles} from "@material-ui/core/styles";

const updateRecipeListAfterLabelUpdated = (type, value, recipeList, recipesAdded, recipesRemoved) => {
    const added = recipesAdded.map(recipe => recipe.id);
    const removed = recipesRemoved.map(recipe => recipe.id);

    return recipeList.map(recipe => {
        if (added.includes(recipe.id)) {
            return {...recipe, [type]: [...recipe[type], value]};
        }

        if (removed.includes(recipe.id)) {
            return {...recipe, [type]: [
                    ...recipe[type].slice(0, recipe[type].indexOf(value)),
                    ...recipe[type].slice(recipe[type].indexOf(value) + 1, recipe[type].length),
                ]}
        }

        return recipe;
    })
};

const useStyles = makeStyles((theme) => ({
    success: {
        backgroundColor: theme.palette.success.light,
    },
}))

const LabelAdmin = () => {
    const [editing, setEditing] = useState({type: null, value: null, recipes: []});
    const [recipeList, setRecipeList] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const classes = useStyles();

    const handleEditLabel = (type, value) => {
        setEditing({...editing, type, value});
    };

    const handleCancel = () => {
        setEditing({type: null, value: null, recipes: []});
    };

    const handleSave = async (recipeIds) => {
        const type = editing.type; //seasons/diet
        const value = editing.value; // keto/printemps/végé/etc...

        //We need to add the label to all the recipes that did not have it before and are in the recipeIds array
        const recipesAdded = recipeList.filter(recipe => recipeIds.indexOf(recipe.id) !== -1 && recipe[type].indexOf(value) === -1);

        //We need to remove the label from all the recipes that had it before, and is not in the recipeIds array
        const recipesRemoved = recipeList.filter(recipe => recipeIds.indexOf(recipe.id) === -1 && recipe[type].indexOf(value) !== -1);
        await updateLabel(type, value, recipesAdded, recipesRemoved);

        showSuccess(type === 'seasons' ? `Saison ${value} enregistrée` : `Régime ${value} enregistré`);
        setRecipeList(updateRecipeListAfterLabelUpdated(type, value, recipeList, recipesAdded, recipesRemoved))
    };

    const showSuccess = (message) => {
        setSnackbarOpen(true);
        setSnackbarMessage(message);
    };

    const handleSuccessClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        fetchRecipes().then(recipes => setRecipeList(recipes));
    }, []);

    return <>
        {
            editing.value === null
                ? <LabelSelect
                    onSelectDiet={(diet) => handleEditLabel('diets', diet)}
                    onSelectSeason={(season) => handleEditLabel('seasons', season)}
                />
                : <>
                    <RecipeSelect type={editing.type} value={editing.value} recipeList={recipeList}
                                  onCancel={handleCancel} onSave={handleSave}/>
                </>
        }
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleSuccessClose}
        >
            <SnackbarContent
                aria-describedby="message-id"
                className={classes.success}
                message={<span id="message-id">{snackbarMessage}</span>}
            />
        </Snackbar>
    </>
};

export default LabelAdmin;
