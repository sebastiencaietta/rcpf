import React from 'react';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    TextField
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import {makeStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
    success: {
        backgroundColor: green[600],
    },
    snackbar: {
        visibility: 'visible',
    }
}));

const SaveButton = ({
                        listsRecipeIsIn,
                        onSaveToFavourites,
                        onSaveToList,
                        onSaveToNewList,
                        onRemoveFromFavourites,
                        lists,
                        onRemoveFromList,
                    }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorAllLists, setAnchorAllLists] = React.useState(null);
    const [newListDialogOpen, setNewListDialogOpen] = React.useState(false);
    const [newListName, setNewListName] = React.useState('');
    const [success, setSuccess] = React.useState({
        isOpen: false,
        message: '',
    });

    const isInFavourites = listsRecipeIsIn.some(list => list.id === 'favourites');
    const isInOtherLists = listsRecipeIsIn.filter(list => list.id !== 'favourites').length > 0;

    const classes = useStyles();

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorAllLists(null);
    };

    const handleAllListsClose = () => {
        setAnchorAllLists(null);
    };

    const handleSaveToFavourites = async () => {
        setAnchorEl(null);
        try {
            await onSaveToFavourites();
            setSuccess({isOpen: true, message: 'Ajoutée aux recettes favorites'});
        } catch (error) {
            console.error(error);
        }
    }

    const handleRemoveFromFavourites = async () => {
        setAnchorEl(null);
        try {
            await onRemoveFromFavourites();
            setSuccess({isOpen: true, message: 'Suprimée des recettes favorites'});
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddToAnotherList = () => {
        setAnchorEl(null);
        setAnchorAllLists(anchorEl);
    }

    const handleAddToList = async (listId) => {
        setAnchorAllLists(null);
        try {
            await onSaveToList(listId);
            const list = lists.find(list => list.id === listId);
            setSuccess({isOpen: true, message: `Ajoutée à la liste "${list.name}"`});
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddToNewList = () => {
        setAnchorAllLists(null);
        setNewListDialogOpen(true);
    }

    const handleDialogClose = () => {
        setNewListDialogOpen(false);
    }

    const handleCreateNewList = async e => {
        try {
            await onSaveToNewList(newListName);
            setSuccess({isOpen: true, message: `Ajoutée à la liste "${newListName}"`});
        } catch (error) {
            console.error(error);
        }
        setNewListDialogOpen(false);
    }

    const onChangeNewListName = e => {
        setNewListName(e.target.value);
    }

    const handleSuccessClose = () => {
        setSuccess({isOpen: false, message: ''});
    }

    const handleRemoveFromList = async () => {
        try {
            await onRemoveFromList();
        } catch (error) {
            console.error(error);
            setAnchorEl(false);
        }
    }

    return (
        <>
            <IconButton onClick={handleClick} size={"small"}>
                {isInFavourites
                    ? <FavoriteIcon fontSize="large" color={"primary"}/>
                    : isInOtherLists
                        ? <FavoriteBorderIcon fontSize="large" color={"primary"}/>
                        : <FavoriteBorderIcon fontSize="large" color={"action"}/>}
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    isInFavourites
                        ? <MenuItem onClick={handleRemoveFromFavourites}>Supprimer des favoris</MenuItem>
                        : <MenuItem onClick={handleSaveToFavourites}>Ajouter aux favoris</MenuItem>
                }
                <MenuItem onClick={handleAddToAnotherList}>Ajouter à
                    une {onRemoveFromList === undefined ? '' : 'autre'} liste</MenuItem>
                {onRemoveFromList === undefined
                    ? ''
                    : <MenuItem onClick={handleRemoveFromList}>Supprimer de la liste</MenuItem>}
            </Menu>

            <Menu
                id="all-lists"
                anchorEl={anchorAllLists}
                open={Boolean(anchorAllLists)}
                onClose={handleAllListsClose}
            >
                <MenuItem onClick={handleAddToNewList}>Ajouter à une nouvelle liste</MenuItem>
                <Divider/>
                {
                    lists.filter(list => list.id !== 'favourites').map(
                        list => {
                            const isInList = listsRecipeIsIn.some(listRecipeIsIn => listRecipeIsIn.id === list.id);
                            return <MenuItem key={list.id} onClick={() => handleAddToList(list.id)}
                                             disabled={isInList}>
                                {list.name}
                            </MenuItem>;
                        }
                    )
                }
            </Menu>

            <Dialog open={newListDialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Créer une liste de recettes</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={onChangeNewListName}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nom de la liste"
                        type="text"
                        value={newListName}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>
                        Annuler
                    </Button>
                    <Button onClick={handleCreateNewList} color="primary" variant={"contained"}>
                        Créer
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={success.isOpen}
                autoHideDuration={2000}
                onClose={handleSuccessClose}
                className={classes.snackbar}
            >
                <SnackbarContent
                    aria-describedby="message-id"
                    className={classes.success}
                    message={<span id="message-id">{success.message}</span>}
                />
            </Snackbar>
        </>
    );
};

export default SaveButton;
