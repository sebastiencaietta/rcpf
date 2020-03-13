import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
    textField: {width: '80%'},
    formGrid: {alignItems: 'flex-end'},
    saveButton: {padding: 0},
    avatar: {cursor: 'pointer'},
}));

export default ({ingredient: propsIngredient, onSubmit}) => {
    const ingredientInitialState = {
        thumbnail: '',
        name: '',
        links: [''],
    };

    const [ingredient, setIngredient] = useState({
        ...ingredientInitialState,
        ...propsIngredient,
    });
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [loading, setLoading] = useState(false);

    const fileInput = React.createRef();
    const classes = useStyles();

    const onNameChange = (e) => {
        setIngredient({
            ...ingredient,
            name: e.target.value,
        });
    };

    const onLinkChange = (e) => {
        setIngredient({
            ...ingredient,
            links: [e.target.value]
        });
    };

    const onNewThumbnailUpload = (file) => {
        setIngredient({
            ...ingredient,
            newThumbnail: file,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(ingredient);
        setIngredient(ingredientInitialState);
        setThumbnailPreview('');
        setLoading(false);
    };

    const onThumbnailImageChange = (event) => {
        if (!event.target.files.length) {
            setThumbnailPreview('');
            return;
        }

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => setThumbnailPreview(reader.result);

        reader.readAsDataURL(file);
        onNewThumbnailUpload(file);
    };

    return <form onSubmit={handleSubmit}>
        <Grid container className={classes.formGrid}>
            <Grid item xs={3} md={1}>
                <input type="file"
                       ref={fileInput}
                       onChange={onThumbnailImageChange}
                       style={{display: 'none'}}/>
                <Avatar onClick={() => {
                    fileInput.current.click()
                }} variant="square" src={thumbnailPreview || ingredient.thumbnail} className={classes.avatar}/>
            </Grid>
            <Grid item xs={9} md={5}>
                <TextField id="ingredient-name" label="Name" className={classes.textField} value={ingredient.name} onChange={onNameChange}/>
            </Grid>
            <Grid item xs={9} md={5}>
                <TextField label="Link" className={classes.textField} value={ingredient.links[0]} onChange={onLinkChange}/>
            </Grid>
            <Grid item xs={3} md={1}>
                <IconButton className={classes.saveButton} type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={24}/> : <SaveIcon/> }
                </IconButton>
            </Grid>
        </Grid>
    </form>;
}
