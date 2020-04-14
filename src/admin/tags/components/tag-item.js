import React from "react";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
    },
    tagTitleContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    tagTitle: {
        marginRight: theme.spacing(1),
    }
}));

const getRecipeWithTagCount = (tag, recipeList) => recipeList.reduce(
    (sum, recipe) => sum + (recipe.tags.indexOf(tag.id) !== -1 ? 1 : 0),
    0
);

const TagItem = ({tag, recipeList, onEdit, onDelete}) => {
    const classes = useStyles();

    const recipeCount = getRecipeWithTagCount(tag, recipeList);

    function handleDeleteClick() {
        onDelete(tag.id);
    }

    function handleEditClick() {
        onEdit(tag.id);
    }

    return <Paper className={classes.paper}>
        <div className={classes.tagTitleContainer}>
            <span className={classes.tagTitle}>{tag.title}</span>
            <small>({recipeCount})</small>
        </div>
        <div>
            <IconButton size="small" disableFocusRipple={true} onClick={handleEditClick}>
                <EditIcon className={classes.ingredientListItemIcon}/>
            </IconButton>
            <IconButton size="small" disableFocusRipple={true} onClick={handleDeleteClick}>
                <DeleteIcon className={classes.ingredientListItemIcon}/>
            </IconButton>
        </div>
    </Paper>
};

export default TagItem;
