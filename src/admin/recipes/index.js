import React, {useEffect, useState} from "react";
import Layout from '../../layout'
import {deleteRecipe, listenToRecipes} from "../../repositories/recipes";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
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
import CardMedia from "@material-ui/core/CardMedia";
import RecipeImage from "../../recipe-list/images/recipe.jpg";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

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
        position: 'fixed',
    },
    noRecipesNewRecipeButton: {
        bottom: theme.spacing(2) * -1,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        padding: '16px 16px 4px',
    },
    cardTitle: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
    },
    media: {
        height: 140,
        [theme.breakpoints.up('md')]: {
            height: 180,
        },
    },
    cardActions: {
        padding: '0 8px 8px',
        display: 'flex',
        justifyContent: 'flex-end',
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
                        <CardMedia
                            className={classes.media}
                            image={recipe.thumbnail || RecipeImage}
                            title={recipe.title}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.cardTitle}>
                                {recipe.title}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <Link to={`/admin/recipes/edit/${recipe.slug}`} className={classes.link}>
                                <IconButton size="small">
                                    <EditIcon className={classes.leftIcon}/>
                                </IconButton>
                            </Link>
                            <IconButton size="small" onClick={() => openDeleteDialog(recipe.slug)}>
                                <DeleteIcon className={classes.leftIcon}/>
                            </IconButton>
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
