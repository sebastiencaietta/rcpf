import React, {useState} from 'react';
import IngredientListItemComponent from './ingredient-list-item'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Search} from "@material-ui/icons";
import Input from "@material-ui/core/Input";
import AdminIngredientForm from "./ingredient-form";
import {Link} from "react-router-dom";
import MuiLink from '@material-ui/core/Link';
import {filterSearch} from "../../../global/lodash";

const useStyles = makeStyles((theme) => ({
    listSearchAdd: {margin: theme.spacing(2, 0)},
    recipeListRoot: {padding: theme.spacing(0, 0, 2)},
    recipeLink: {fontSize: '1.1em'},
}));

const RecipeLink = React.forwardRef((props, ref) => {
    const {navigate, ...rest} = props;
    return <MuiLink underline="none" {...rest} ref={ref} href={props.href}>{props.children}</MuiLink>
});

const IngredientListItem = ({ingredients, recipesByIngredient, deleteIngredient, addIngredient, updateIngredient}) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [ingredientToEdit, setIngredientToEdit] = useState(null);
    const [viewingIngredient, setViewingIngredient] = useState(null);
    const [ingredientToDelete, setIngredientToDelete] = useState({});
    const [search, setSearch] = useState('');
    const classes = useStyles();

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

    const handleAddIngredient = async (ingredient) => {
        await addIngredient(ingredient);
        setFormDialogOpen(false);
    }

    const handleEditIngredient = async (ingredient) => {
        await updateIngredient(ingredient);
        setFormDialogOpen(false);
    }

    const handleFormDialogClose = () => {
        setIngredientToEdit(null);
        setFormDialogOpen(false);
    }

    const handleEditClick = (ingredient) => {
        setIngredientToEdit(ingredient);
        setFormDialogOpen(true);
    }

    const handleAddClick = () => {
        setIngredientToEdit(null);
        setFormDialogOpen(true);
    }

    const handleViewClick = (ingredient) => {
        setViewingIngredient(ingredient);
        setViewDialogOpen(true);
    }

    const handleViewClose = () => {
        setViewingIngredient(null);
        setViewDialogOpen(false);
    }

    const visibleIngredients = () => {
        if (search === '') {
            return ingredients;
        }

        return filterSearch(search, ingredients, ingredient => ingredient.name);
    }

    return <>
        <Grid container spacing={1} className={classes.listSearchAdd}>
            <Grid item sm={8} md={10} lg={10}>
                <Input
                    placeholder="Chercher un ingrédient"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <Search/>
                        </InputAdornment>
                    }
                    fullWidth
                />
            </Grid>
            <Grid item sm={4} md={2} lg={2}>
                <Button variant={"contained"} color="primary" size="small" startIcon={<AddIcon/>}
                        fullWidth disableFocusRipple onClick={handleAddClick}>
                    Ingrédient
                </Button>
            </Grid>
        </Grid>
        <Grid container spacing={1}>
            {visibleIngredients().map(ingredient => {
                return <IngredientListItemComponent key={ingredient.id}
                                           ingredient={ingredient}
                                           recipes={recipesByIngredient[ingredient.id]}
                                           onViewClick={handleViewClick}
                                           onEditClick={handleEditClick}
                                           onDeleteClick={handleDeleteDialogOpen}/>;
            })}
        </Grid>

        <Dialog open={formDialogOpen}
                onClose={handleFormDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <DialogTitle
                id="alert-dialog-title">{ingredientToEdit ? ingredientToEdit.name : 'Nouvel ingrédient'}</DialogTitle>
            <DialogContent>
                <AdminIngredientForm onSubmit={ingredientToEdit ? handleEditIngredient : handleAddIngredient}
                                     onCancel={handleFormDialogClose}
                                     ingredient={ingredientToEdit}/>
            </DialogContent>
        </Dialog>

        <Dialog
            open={deleteDialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Etes vous sur de vouloir supprimer cet ingrédient?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    En cliquant supprimer, l'ingrédient "{ingredientToDelete && ingredientToDelete.name}" sera effacé et
                    ne pourra pas être récupéré.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Annuler
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    Supprimer
                </Button>
            </DialogActions>
        </Dialog>

        <Dialog open={viewDialogOpen}
                onClose={handleViewClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth>
            {viewingIngredient
                ? <>
                    <DialogTitle id="alert-dialog-title">
                        L'ingrédient "{viewingIngredient.name}" est présent dans ces recettes
                    </DialogTitle>
                    <DialogContent>
                        <div className={classes.recipeListRoot}>
                            {
                                recipesByIngredient[viewingIngredient.id].map(
                                    recipe => <div className={classes.recipeLink} key={recipe.id}>
                                        <Link component={RecipeLink} to={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
                                    </div>
                                )
                            }
                        </div>
                    </DialogContent>
                </>
                : ''}
        </Dialog>
    </>;
};
export default IngredientListItem;
