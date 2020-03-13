import React, {useState} from 'react';
import List from "@material-ui/core/List";
import IngredientListItem from './ingredient-list-item'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

export default ({ingredients, updateIngredient, deleteIngredient}) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [ingredientToDelete, setIngredientToDelete] = useState({});

    const handleDeleteDialogOpen = (ingredient) => {
        setIngredientToDelete(ingredient);
        setDeleteDialogOpen(true);
    };

    const handleClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDelete = async () => {
        await deleteIngredient(ingredientToDelete);
        setDeleteDialogOpen(false);
    };

    return <React.Fragment>

        <List dense>
            {ingredients.map(ingredient => {
                return <IngredientListItem key={ingredient.id}
                                           ingredient={ingredient}
                                           updateIngredient={updateIngredient}
                                           deleteIngredient={handleDeleteDialogOpen}/>;
            })}
        </List>

        <Dialog
            open={deleteDialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Are you sure you want to delete this ingredient?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    By clicking OK, you will permanently delete the ingredient {ingredientToDelete.name}.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>;
};
