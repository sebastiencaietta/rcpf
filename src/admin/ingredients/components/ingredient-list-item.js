import React, {useState} from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel"
import Collapse from "@material-ui/core/Collapse";
import IngredientForm from './ingredient-form';
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
    ingredientListItemIcon: {
        verticalAlign: 'baseline',
    },
    secondaryActions: {
        top: theme.spacing(1) / 2,
        transform: 'none',
    },
}));

export default ({ingredient, updateIngredient, deleteIngredient}) => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();

    const handleEditSubmit = async (ingredientToUpdate) => {
        await updateIngredient(ingredientToUpdate);
        setIsOpen(false);
    };

    const handleEditClick = () => {
        setIsOpen(!isOpen);
    };

    const handleDeleteClick = () => {
        deleteIngredient(ingredient);
    };

    return <React.Fragment>
        <ListItem button onClick={isOpen ? null : handleEditClick}>
            <ListItemAvatar>
                <Avatar alt={ingredient.name} src={ingredient.thumbnail}/>
            </ListItemAvatar>
            <ListItemText>
                <div>{ingredient.name}</div>
                <Collapse component="div" in={isOpen}>
                    <IngredientForm ingredient={ingredient}
                                    onSubmit={handleEditSubmit}/>
                </Collapse>
            </ListItemText>
            <ListItemSecondaryAction className={classes.secondaryActions}>
                {isOpen ? <IconButton size="small" disableFocusRipple={true} onClick={handleEditClick}>
                    <CancelIcon/>
                </IconButton> : ''}
                <IconButton size="small" disableFocusRipple={true} onClick={handleDeleteClick}>
                    <DeleteIcon className={classes.ingredientListItemIcon}/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    </React.Fragment>;
}
