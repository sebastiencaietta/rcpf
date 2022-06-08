import React from 'react';
import {IconButton, Menu, MenuItem, TextField,} from "@material-ui/core";
import {MoreVert} from "@material-ui/icons";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const MoreButton = ({onDelete, onRename, listName}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
    const [newListName, setNewListName] = React.useState(listName);

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuDeleteClick = (e) => {
        e.preventDefault();
        setDeleteDialogOpen(true);
    }

    const handleDeleteDialogClose = (e) => {
        e.preventDefault();
        setDeleteDialogOpen(false);
        setAnchorEl(null);
    }

    const handleDelete = async () => {
        await onDelete();
    }

    const handleMenuRenameClick = (e) => {
        e.preventDefault();
        setRenameDialogOpen(true);
    }

    const handleRenameDialogClose = (e) => {
        e.preventDefault();
        setRenameDialogOpen(false);
        setAnchorEl(null);
    }

    const handleRename = async (e) => {
        e.preventDefault();
        await onRename(newListName);
    }

    const onChangeNewListName = (e) => {
        setNewListName(e.target.value);
    }

    return (
        <>
            <IconButton onClick={handleClick} size={"small"}>
                <MoreVert fontSize="large" color={"action"}/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleMenuRenameClick}>Renommer</MenuItem>
                <MenuItem onClick={handleMenuDeleteClick}>Supprimer</MenuItem>
            </Menu>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Etes vous sur de vouloir supprimer cette liste?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        En confirmant, la liste "{listName}" sera effacée et ne pourra pas être récupérée.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={renameDialogOpen} onClose={handleRenameDialogClose} aria-labelledby="form-dialog-title">
                <form action="" onSubmit={handleRename}>
                    <DialogTitle id="form-dialog-title">Renommer {listName}</DialogTitle>
                    <DialogContent>
                        <TextField
                            onChange={onChangeNewListName}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nouveau nom"
                            type="text"
                            value={newListName}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleRenameDialogClose}>
                            Annuler
                        </Button>
                        <Button onClick={handleRename} color="primary" variant={"contained"}>
                            Renommer
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default MoreButton;
