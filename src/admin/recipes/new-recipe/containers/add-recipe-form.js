import React from "react";
import {useEffect, useState} from "react";
import {fetchCategories, fetchTags} from "../../../../global/eve";
import {green} from '@material-ui/core/colors';
import TextField from "@material-ui/core/TextField";
import {makeStyles, withStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import SaveIcon from '@material-ui/icons/Save';
import Fab from "@material-ui/core/Fab";
import slugify from "slugify";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import {EditorState, convertToRaw} from "draft-js";
import Renderer from "../../../../global/components/RteRenderer.js";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DescriptionEditor from "../components/description-editor";
import Typography from "@material-ui/core/Typography";

const AntTabs = withStyles(theme => ({
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
    descriptionLabel: {
        color: theme.palette.text,
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginBottom: 0,
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default (props) => {
    const classes = useStyles();
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [successOpen, setSuccessOpen] = useState(false);
    const [descriptionTab, setDescriptionTab] = useState('editor');
    const fileInput = React.createRef();

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

    useEffect(() => {
        Promise.all([fetchTags(), fetchCategories()]).then(([tags, categories]) => {
            setTags(tags);
            setCategories(categories);
        });
    }, []);

    function handleTitleChange(event) {
        setRecipe({
            ...recipe,
            title: event.target.value,
            slug: slugify(event.target.value).toLowerCase(),
        });
    }

    function handleCategorySelect(event) {
        setRecipe({
            ...recipe,
            category: event.target.value,
        });
    }

    function handleTagSelect(event) {
        setRecipe({
            ...recipe,
            tags: event.target.value,
        });
    }

    function handleDescriptionChange(event) {
        setRecipe({
            ...recipe,
            description: event,
        });
    }

    async function handleSubmit() {
        if (recipe.title === '') {
            return;
        }
        await props.handleSubmit(recipe);
        setSuccessOpen(true);
    }

    function handleSuccessClose() {
        setSuccessOpen(false);
    }

    function handleDescriptionTabChange(event, newValue) {
        setDescriptionTab(newValue);
    }

    async function handleThumbnailImageChange(thumbnail) {
        const slug = recipe.slug || Date.now();
        const thumbUrl = await props.handleUploadRecipeThumbnail(slug, thumbnail);

        setRecipe({
            ...recipe,
            thumbnail: thumbUrl,
        });
    }

    return <form>
        <TextField
            style={{margin: 8}}
            label="Title"
            fullWidth
            margin="normal"
            helperText={recipe.slug}
            value={recipe.title}
            onChange={handleTitleChange}
            required={true}
        />

        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="category_id">Category</InputLabel>
            <Select
                value={recipe.category}
                onChange={handleCategorySelect}
                inputProps={{
                    name: 'category_id',
                    id: 'category_id',
                }}
            >
                {categories.map((category) => {
                    return <MenuItem value={category.id} key={category.id}>{category.title}</MenuItem>
                })}
            </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="tags">Tags</InputLabel>
            <Select
                multiple
                value={recipe.tags}
                onChange={handleTagSelect}
                input={<Input id="tags"/>}
                renderValue={selected => selected.map(id => tags.find((tag) => tag.id === id).title).join(', ')}
                MenuProps={MenuProps}
            >
                {tags.map(tag => (
                    <MenuItem key={tag.id} value={tag.id}>
                        <Checkbox checked={recipe.tags.indexOf(tag.id) > -1}/>
                        <ListItemText primary={tag.title}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <Typography variant="body1" className={classes.descriptionLabel}>
            Description
        </Typography>

        <AntTabs value={descriptionTab} onChange={handleDescriptionTabChange}>
            <AntTab label="Editor" value="editor"/>
            <AntTab label="Preview" value="preview"/>
        </AntTabs>

        {descriptionTab === 'editor' && <DescriptionEditor rawValue={recipe.description}
                                                           onChange={handleDescriptionChange}
                                                           rawValueUpdated={savedRecipe.description}/>}
        {descriptionTab === 'preview' && <Renderer raw={recipe.description}/>}

        <Typography variant="body1" className={classes.descriptionLabel}>
            Recipe list image
        </Typography>

        {recipe.thumbnail ? <Avatar variant="square" className={classes.square} src={recipe.thumbnail} /> : '' }
        <input type="file" ref={fileInput} onChange={(e) => handleThumbnailImageChange(e.target.files[0])}/>

        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={successOpen}
            autoHideDuration={1500}
            onClose={handleSuccessClose}

        >
            <SnackbarContent
                aria-describedby="message-id"
                className={classes.successSnackBar}
                message={<span id="message-id">Recipe saved</span>}
            />
        </Snackbar>

        <Fab disabled={successOpen}
             aria-label="Save"
             className={classes.fab}
             color="primary"
             onClick={handleSubmit}
             type="submit">
            <SaveIcon/>
        </Fab>
    </form>
}
