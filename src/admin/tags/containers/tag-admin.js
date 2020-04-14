import React, {useEffect, useState} from "react";
import {fetchRecipes, fetchTags} from "../../../global/eve";
import TagList from '../components/tag-list';
import {makeStyles} from "@material-ui/core/styles";
import {createTag, deleteTag, updateTag} from "../../../repositories/tags";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import TagForm from "../components/tag-form";

const useStyles = makeStyles(theme => ({
    tagAdminSection: {
        padding: `${theme.spacing(2)}px 0`,
        marginBottom: theme.spacing(2),
    },
    divider: {
        marginBottom: theme.spacing(3),
    },
    success: {
        backgroundColor: theme.palette.success.light,
    },
}));

const updateRecipeListAfterTagUpdated = (tagId, recipeList, recipesAdded, recipesDeleted) => {
    return recipeList.map(recipe => {
        if (recipesAdded.includes(recipe.id)) {
            return {...recipe, tags: [...recipe.tags, tagId]};
        }

        if (recipesDeleted.includes(recipe.id)) {
            return {...recipe, tags: [
                    ...recipe.tags.slice(0, recipe.tags.indexOf(tagId)),
                    ...recipe.tags.slice(recipe.tags.indexOf(tagId) + 1, recipe.tags.length),
                ]}
        }

        return recipe;
    })
};

const TagAdmin = () => {
    const [tags, setTags] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    const [tagToEdit, setTagToEdit] = useState(undefined);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const classes = useStyles();

    useEffect(() => {
        Promise.all([fetchTags(), fetchRecipes()]).then(([tags, recipeList]) => {
            setRecipeList(recipeList);
            setTags(tags);
        });
    }, []);

    const showSuccess = (message) => {
        setSnackbarOpen(true);
        setSnackbarMessage(message);
    };

    const handleSuccessClose = () => {
        setSnackbarOpen(false);
    };

    const handleSave = async (tagData) => {
        if (tagToEdit) {
            const recipesToAdd = tagData.recipes.filter(recipeId => !tagToEdit.recipes.includes(recipeId));
            const recipesToDelete = tagToEdit.recipes.filter(recipeId => !tagData.recipes.includes(recipeId));
            await updateTag(tagData, recipesToAdd, recipesToDelete);
            const newRecipeList =  updateRecipeListAfterTagUpdated(tagData.id, recipeList, recipesToAdd, recipesToDelete);
            setRecipeList(newRecipeList);
            setTags(tags.map(tag => tag.id !== tagData.id ? tag : {id: tagData.id, title: tagData.title}));
            showSuccess('Tag sauvegardé');
        } else {
            const newTag = await createTag(tagData);
            const newRecipeList = updateRecipeListAfterTagUpdated(newTag.id, recipeList, tagData.recipes, []);
            setRecipeList(newRecipeList);
            setTags([...tags, {id: newTag.id, title: newTag.title}]);
            showSuccess('Tag ajouté');
        }
    };

    const handleEdit = (tagId) => {
        const tag = tags.find(tag => tag.id === tagId);
        const recipesWithTag = recipeList.filter(recipe => recipe.tags.indexOf(tag.id) !== -1);
        setTagToEdit({...tag, recipes: recipesWithTag.map(recipe => recipe.id)});
    };

    const handleDelete = async (id) => {
        await deleteTag(id);
        showSuccess('Tag supprimé');
        setTags(tags.filter(tag => tag.id !== id));

        if (tagToEdit !== undefined && tagToEdit.id === id) {
            setTagToEdit(undefined);
        }
    };

    const handleClear = () => {
        setTagToEdit(undefined);
    };

    return <>
        <div className={classes.tagAdminSection}>
            <Typography variant="h6">Ajouter un nouveau tag</Typography>
            <Divider className={classes.divider}/>
            <TagForm tagToEdit={tagToEdit} recipeList={recipeList} onSave={handleSave} onClear={handleClear}/>
        </div>

        <div className={classes.tagAdminSection}>
            <Typography variant="h6">Tags enregistrés</Typography>
            <Divider className={classes.divider}/>
            <TagList tags={tags} recipeList={recipeList} onEdit={handleEdit} onDelete={handleDelete}/>
        </div>

        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            open={snackbarOpen}
            autoHideDuration={100000}
            onClose={handleSuccessClose}
        >
            <SnackbarContent
                aria-describedby="message-id"
                className={classes.success}
                message={<span id="message-id">{snackbarMessage}</span>}
            />
        </Snackbar>
    </>
};

export default TagAdmin;
