import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {green} from '@material-ui/core/colors';
import slugify from "slugify";
import {makeStyles} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import Fab from "@material-ui/core/Fab";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import GeneralInformation from '../components/general-information';
import IngredientsForm from '../components/ingredient-form/ingredients-form';
import ImageUpload from '../components/image-upload';
import {ExpandMore} from "@material-ui/icons";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import DescriptionForm from "../components/description-form";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
    successSnackBar: {
        backgroundColor: green[600]
    },
}));

const intialRecipeState = {
    title: '',
    slug: '',
    tags: [],
    category: '',
    portionSize: '',
    portionType: '',
    prepTime: '',
    cookingTime: '',
    source: '',
    ingredients: [],
};

export default (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [recipe, setRecipe] = useState({...intialRecipeState, ...props.recipe});
    const [savedRecipe, setSavedRecipe] = useState({...props.recipe});
    const [successOpen, setSuccessOpen] = useState(false);

    function handleTitleChange(title) {
        setRecipe({
            ...recipe,
            title,
            slug: slugify(title).toLowerCase(),
        });
    }

    function handleFieldChange(fieldName, fieldValue) {
        setRecipe({
            ...recipe,
            [fieldName]: fieldValue,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (recipe.title === '') {
            return;
        }

        const updatedRecipe = await props.handleSubmit(recipe);
        if (savedRecipe.title !== recipe.title) {
            history.replace(`/admin/recipes/edit/${recipe.slug}`);
        }

        setSuccessOpen(true);
        setRecipe(updatedRecipe);
        setSavedRecipe(updatedRecipe);
    }

    function handleSuccessClose() {
        setSuccessOpen(false);
    }

    return <form onSubmit={handleSubmit}>

        <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary expandIcon={<ExpandMore/>} aria-label="Expand">General
                Information</ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {
                    <GeneralInformation onFieldChange={handleFieldChange}
                                        onTitleChange={handleTitleChange}
                                        savedRecipe={savedRecipe}/>
                }
            </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary expandIcon={<ExpandMore/>} aria-label="Expand">Ingrédients</ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {
                    <IngredientsForm
                        onIngredientsChange={(ingArray) => handleFieldChange('ingredients', ingArray)}
                        savedRecipe={savedRecipe}/>
                }
            </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary expandIcon={<ExpandMore/>} aria-label="Expand">Description</ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {
                    <DescriptionForm
                        onDescriptionChange={(description) => handleFieldChange('description', description)}
                        savedRecipe={savedRecipe}/>
                }
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary expandIcon={<ExpandMore/>} aria-label="Expand">
                Images
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {
                    <ImageUpload
                        onThumbnailChange={(thumbUrl) => handleFieldChange('thumbnail', thumbUrl)}
                        onHeroChange={(hero) => handleFieldChange('hero', hero)}
                        uploadRecipeThumbnail={props.handleUploadRecipeThumbnail}
                        updateRecipeHero={props.handleUploadRecipeHero}
                        savedRecipe={savedRecipe}
                        recipeSlug={recipe.slug}
                        recipeTitle={recipe.title}/>
                }
            </ExpansionPanelDetails>
        </ExpansionPanel>

        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={successOpen}
            autoHideDuration={1500}
            onClose={handleSuccessClose}
        >
            <SnackbarContent
                aria-describedby="message-id"
                className={classes.successSnackBar}
                message={<span id="message-id">Recette sauvegardée</span>}
            />
        </Snackbar>

        <Fab disabled={successOpen}
             aria-label="Save"
             className={classes.fab}
             color="primary"
             type="submit">
            <SaveIcon/>
        </Fab>
    </form>
}
