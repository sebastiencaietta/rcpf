import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import RecipeList from "./recipe-list";
import {makeStyles} from "@material-ui/core/styles";
import {addOrRemoveInArray} from "../../../global/lodash";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from "@material-ui/icons/Cancel"

const useStyles = makeStyles(() => ({
    recipeList: {
        flexDirection: 'column',
    },
    iconsContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

const initialTagStage = {
    id: undefined,
    title: '',
    recipes: [],
};

const TagForm = ({recipeList, tagToEdit, onSave, onClear}) => {
    const classes = useStyles();
    const [tagStage, setTagStage] = useState(initialTagStage);

    useEffect(() => {
        setTagStage(tagToEdit ||initialTagStage);
    }, [tagToEdit]);

    const handleTagTitleChange = (e) => setTagStage({...tagStage, title: e.target.value});

    const handleRecipeSelect = (recipeId) => {
        const newRecipesArray = addOrRemoveInArray(tagStage.recipes, recipeId);
        setTagStage({...tagStage, recipes: newRecipesArray});
    };

    const handleSave = async (e) => {
        e.preventDefault();
        await onSave(tagStage);
        setTagStage(initialTagStage);
    };

    return <form onSubmit={handleSave}>
        <Grid container spacing={3} alignItems="center" justify="center">
            <Grid item xs={10}>
                <TextField
                    label="Titre"
                    required
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    value={tagStage.title}
                    onChange={handleTagTitleChange}
                />
            </Grid>
            <Grid item xs={2} className={classes.iconsContainer}>
                {tagToEdit
                    ? <IconButton disableFocusRipple={true} type="reset" onClick={onClear}>
                        <CancelIcon/>
                    </IconButton>
                : null}
                <IconButton disableFocusRipple={true} type="submit">
                    <SaveIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="recipe-list"
                        id="recipe-list"
                    >
                        <Typography>Liste de recettes</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.recipeList}>
                        <RecipeList recipeList={recipeList}
                                    onRecipeSelect={handleRecipeSelect}
                                    checkedRecipes={tagStage.recipes}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
        </Grid>
    </form>;
};

export default TagForm;
