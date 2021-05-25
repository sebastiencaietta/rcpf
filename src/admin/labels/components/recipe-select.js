import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import RecipeList from "../../tags/components/recipe-list";
import {addOrRemoveInArray} from "../../../global/lodash";
import Button from "@material-ui/core/Button";
import {ArrowBack} from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1},
    button: {marginRight: theme.spacing(2)},
}));

const getRecipesForLabel = (type, value, recipeList) => {
    return recipeList.filter(recipe => recipe[type].find(label => label === value) !== undefined)
        .map(recipe => recipe.id);
}

const RecipeSelect = ({type, recipeList, value, onCancel, onSave}) => {
    const [checked, setChecked] = useState(getRecipesForLabel(type, value, recipeList));
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const handleRecipeSelect = (recipeId) => {
        setChecked(addOrRemoveInArray(checked, recipeId));
    }

    const handleSave = async () => {
        setLoading(true);
        await onSave(checked);
        setLoading(false);
    }

    return <div className={classes.root}>
        <Typography variant="h4">
            {type === 'diets' ? 'Régime' : 'Saison'} {value}
        </Typography>

        <RecipeList checkedRecipes={checked} onRecipeSelect={handleRecipeSelect} recipeList={recipeList} height={500}/>

        <div>
            <Button onClick={onCancel} startIcon={<ArrowBack/>} color="secondary" variant="outlined" className={classes.button}>
                Retour
            </Button>
            <Button onClick={handleSave} color="primary" startIcon={<SaveIcon/>} variant="contained" disabled={loading} className={classes.button}>
                Enregistrer
            </Button>
        </div>
    </div>
}

export default RecipeSelect;
