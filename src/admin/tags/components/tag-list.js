import Grid from "@material-ui/core/Grid";
import TagItem from "./tag-item";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";

const TagList = ({tags, recipeList, onEdit, onDelete}) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [tagToDelete, setTagToDelete] = React.useState();

    const onTagDeleteClick = (id) => {
        setDeleteDialogOpen(true);
        setTagToDelete(id);
    };

    const onTagDeleteConfirm = async () => {
        await onDelete(tagToDelete);
        handleClose();
    };

    const handleClose = () => setDeleteDialogOpen(false);

    return <Grid container spacing={3}>
        {tags.map(tag => <Grid item xs={6} sm={4} md={3} key={tag.id}>
            <TagItem tag={tag} recipeList={recipeList} onEdit={onEdit} onDelete={onTagDeleteClick}/>
        </Grid>)}

        <Dialog
            open={deleteDialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Are you sure you want to delete this recipe?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    By clicking OK, you will permanently delete the tag
                    "{tagToDelete && tags.find(tag => tag.id === tagToDelete) ? tags.find(tag => tag.id === tagToDelete).title : null}".
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onTagDeleteConfirm} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    </Grid>;
};

export default TagList;
