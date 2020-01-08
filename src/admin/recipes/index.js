import React, {useEffect, useState} from "react";
import Layout from '../../layout'
import {deleteRecipe, listenToRecipes} from "../../repositories/recipes";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom";
import clsx from "clsx";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
    },
    link: {
        textDecoration: 'none',
    },
    newRecipe: {
        bottom: theme.spacing(1),
        right: theme.spacing(1),
        position: 'absolute',
    },
    noRecipesNewRecipeButton: {
        bottom: theme.spacing(2) * -1,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    }
}));

export default function RecipesAdmin() {
    const [recipes, setRecipes] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState();
    const classes = useStyles();

    function openDeleteDialog(slug) {
        setDeleteDialogOpen(true);
        setRecipeToDelete(slug);
    }

    function handleClose() {
        setDeleteDialogOpen(false);
    }

    function handleDelete() {
        deleteRecipe(recipeToDelete).then(() => {
            setDeleteDialogOpen(false);
        });
    }

    useEffect(() => {
        const unsubscribeFromRecipes = listenToRecipes((querySnapshot) => {
            const result = [];
            querySnapshot.forEach(function(recipe) {
                result.push(recipe.data());
            });
            setRecipes(result);
        });

        return () => {
            unsubscribeFromRecipes();
        }
    }, []);

    return <Layout title="Recipes Admin">
        {/*Search input*/}

        <Grid container spacing={3} className={classes.root}>
            {recipes.map((recipe) => {
                return <Grid item xs={12} md={4} lg={3} key={recipe.slug}>
                    <Card className={classes.card}>
                        <CardHeader title={recipe.title}/>
                        <CardActions>
                            <Link to={`/admin/recipes/edit/${recipe.slug}`} className={classes.link}>
                                <Button size="small" color="primary" variant="outlined">
                                    <EditIcon className={classes.leftIcon}/>
                                    Edit
                                </Button>
                            </Link>
                            <Button size="small" color="secondary" variant="outlined"
                                    onClick={() => openDeleteDialog(recipe.slug)}>
                                <DeleteIcon className={classes.leftIcon}/>
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            })}
        </Grid>

        <Dialog
            open={deleteDialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Are you sure you want to delete this recipe?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    By clicking OK, you will permantently delete the recipe {recipeToDelete}.
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

        <Link to="/admin/recipes/add">
            <Fab color="primary" aria-label="Add"
                 className={clsx(classes.newRecipe, {[classes.noRecipesNewRecipeButton]: recipes.length === 0})}>
                <AddIcon/>
            </Fab>
        </Link>
    </Layout>
}
