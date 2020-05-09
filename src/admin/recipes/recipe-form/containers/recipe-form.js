import React from "react";
import { useHistory } from "react-router-dom";
import {useEffect, useState} from "react";
import {green} from '@material-ui/core/colors';
import {makeStyles, withStyles} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import Fab from "@material-ui/core/Fab";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import {EditorState, convertToRaw} from "draft-js";
import Renderer from "../../../../global/components/RteRenderer.js";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DescriptionEditor from "../components/description-editor";
import GeneralInformation from '../components/general-information';
import ThumbnailUpload from '../components/thumbnail-upload';
import {ExpandMore} from "@material-ui/icons";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const AntTabs = withStyles(() => ({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
}))(Tabs);

const AntTab = withStyles(theme => ({
    root: {
        textAlign: 'left',
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))(props => <Tab disableRipple {...props} />);

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
    media: {
        paddingTop: '75%',
        position: "relative"
    },
    fileInput: {
        visibility: 'hidden',
    },
    inputSpan: {
        '&::before': {
            position: 'absolute',
            content: '" "',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            cursor: 'pointer',
        },
        '&:hover': {
            '&::before': {background: 'rgba(0,0,0, 0.3)'},
            '&::after': {
                content: '"Upload new image"',
                position: 'absolute',
                width: '100%',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                textAlign: 'center',
                cursor: 'pointer',
            }
        }
    }
}));

export default (props) => {
    const classes = useStyles();
    const [successOpen, setSuccessOpen] = useState(false);
    const [descriptionTab, setDescriptionTab] = useState('editor');
    const history = useHistory();

    const [recipe, setRecipe] = useState({
        title: '',
        slug: '',
        description: convertToRaw(EditorState.createEmpty().getCurrentContent()),
        category: '',
        tags: [],
        thumbnail: '',
    });

    const [savedRecipe, setSavedRecipe] = useState({});

    useEffect(() => {
        if (props.recipe.title) {
            const newState = {
                ...props.recipe,
            };
            setRecipe(newState);
            setSavedRecipe(newState);
        }
    }, [props.recipe]);

    function handleFieldChange(fieldName, fieldValue) {
        setRecipe({
            ...recipe,
            [fieldName]: fieldValue,
        });
    }

    function handleDescriptionChange(event) {
        setRecipe({
            ...recipe,
            description: event,
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

    function handleDescriptionTabChange(event, newValue) {
        setDescriptionTab(newValue);
    }

    return <form onSubmit={handleSubmit}>

        <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary expandIcon={<ExpandMore/>} aria-label="Expand">General Information</ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <GeneralInformation onFieldChange={handleFieldChange} savedRecipe={savedRecipe}/>
            </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary expandIcon={<ExpandMore/>} aria-label="Expand">Ingredients</ExpansionPanelSummary>
            <ExpansionPanelDetails>
                ...
            </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary expandIcon={<ExpandMore/>} aria-label="Expand">Description</ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                    <AntTabs value={descriptionTab} onChange={handleDescriptionTabChange}>
                        <AntTab label="Editor" value="editor"/>
                        <AntTab label="Preview" value="preview"/>
                    </AntTabs>

                    {descriptionTab === 'editor' && <DescriptionEditor
                                                                       onChange={handleDescriptionChange}
                                                                       rawValueUpdated={savedRecipe.description}/>}

                    {descriptionTab === 'preview' && <Renderer raw={recipe.description}/>}
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary expandIcon={<ExpandMore/>} aria-label="Expand">
                Images
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                    <ThumbnailUpload onThumbnailChange={(thumbUrl) => handleFieldChange('thumbnail', thumbUrl)}
                                     uploadRecipeThumbnail={props.handleUploadRecipeThumbnail}
                                     savedRecipe={savedRecipe}
                                    recipeSlug={recipe.slug}
                                    recipeTitle={recipe.title}/>
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
