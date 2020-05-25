import React, {useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import MoveUpIcon from "@material-ui/icons/ExpandLess";
import MoveDownIcon from "@material-ui/icons/ExpandMore";
import IngredientRenderer from "./ingredient-renderer";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIngredientButton from "./delete-ingredient-button";
import {makeStyles} from "@material-ui/core/styles";
import IngredientFormInputs from "./ingredient-form-inputs";

const useStyles = makeStyles(theme => ({
    moveIngredientButton: {padding: 0, borderRadius: 0},
    listItemRoot: {display: 'flex', alignItems: 'center', '&:hover $actionsWrapper button': {visibility: 'initial'}},
    moveUpDownWrapper: {display: 'flex', flexDirection: "column", marginRight: theme.spacing(2)},
    ingredientDescription: {marginRight: theme.spacing(2)},
    actionsWrapper: {justifyContent: 'space-between', marginLeft: 'auto', '& >button': {visibility: 'hidden'}},
}));

const IngredientListItem = ({ingredient, onMoveUpClick, onMoveDownClick, onIngredientChange, canMoveUp, canMoveDown, ingredientsById, onDelete, ingredientOptions}) => {
    const [showForm, setShowForm] = useState(false);
    const classes = useStyles();

    function handleEditIngredient(editedIngredient) {
        onIngredientChange(editedIngredient);
        setShowForm(false);
    }

    function handleCancelEdit() {
        setShowForm(false)
    };

    return <div className={classes.listItemRoot}>
        <div className={classes.moveUpDownWrapper}>
            <IconButton className={classes.moveIngredientButton} disabled={!canMoveUp}
                        onClick={onMoveUpClick}>
                <MoveUpIcon/>
            </IconButton>
            <IconButton className={classes.moveIngredientButton} disabled={!canMoveDown}
                        onClick={onMoveDownClick}>
                <MoveDownIcon/>
            </IconButton>
        </div>
        {
            showForm
                ? <IngredientFormInputs onSubmit={handleEditIngredient}
                                        onCancel={handleCancelEdit}
                                        ingredientOptions={ingredientOptions}
                                        savedIngredient={ingredient}/>
                : <div className={classes.ingredientDescription}>
                    <IngredientRenderer recipeIngredient={ingredient}
                                        ingredientSettings={ingredientsById[ingredient.ingredientId]}/>
                </div>
        }
        {
            showForm
                ? ''
                : <div className={classes.actionsWrapper}>
                    <IconButton title="Ajouter un remplacement" disabled={true}>
                        <SyncAltIcon/>
                    </IconButton>

                    <IconButton onClick={() => setShowForm(true)}>
                        <EditIcon/>
                    </IconButton>

                    <DeleteIngredientButton onDelete={onDelete}/>
                </div>
        }
    </div>;
};

export default IngredientListItem;
