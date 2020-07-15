import React, {useEffect, useRef, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    textField: {width: '80%'},
    formGrid: {alignItems: 'flex-end'},
    saveButton: {padding: 0},
    avatar: {cursor: 'pointer'},
    formTitle: {marginBottom: 0},
    loadingSave: {display: 'flex', alignItems: "center"},
    circularProgress: {marginLeft: theme.spacing(1)},
}));

export default ({ingredient: propsIngredient, onSubmit, onCancel}) => {
    const ingredientInitialState = {
        thumbnail: '',
        name: '',
        plural: '',
        links: [''],
    };

    const [ingredient, setIngredient] = useState({
        ...ingredientInitialState,
        ...propsIngredient,
    });
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const nameInputRef = useRef(null);

    useEffect(() => {
        nameInputRef.current.focus();
    }, []);

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

    const onPluralChange = (e) => {
        setIngredient({
            ...ingredient,
            plural: e.target.value,
        });
    }

    const onNewThumbnailUpload = (file) => {
        setIngredient({
            ...ingredient,
            newThumbnail: file,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid()) {
            return;
        }
        setLoading(true);
        onSubmit(ingredient);
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

    const isValid = () => {
        return ingredient.name !== '';
    }

    return <form onSubmit={handleSubmit}>
        <DialogContent>
            <Grid container className={classes.formGrid}>
                <Grid item xs={2}>
                    <input type="file"
                           ref={fileInput}
                           onChange={onThumbnailImageChange}
                           style={{display: 'none'}}/>
                    <Avatar onClick={() => {
                        fileInput.current.click()
                    }} variant="square" src={thumbnailPreview || ingredient.thumbnail} className={classes.avatar}/>
                </Grid>
                <Grid item xs={10}>
                    <TextField label="Nom" className={classes.textField} value={ingredient.name}
                               onChange={onNameChange} inputRef={nameInputRef}/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <h4 className={classes.formTitle}>Options</h4>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Pluriel" className={classes.textField}
                               value={ingredient.plural}
                               onChange={onPluralChange}/>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox name="excludeFromGroceries"/>}
                        label="Exclure de la liste de courses"
                    />
                </Grid>
                <Grid item xs={12}>
                    <h4 className={classes.formTitle}>Liens</h4>
                    <TextField label="Lien" className={classes.textField} value={ingredient.links[0]}
                               onChange={onLinkChange}/>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={onCancel} color="primary" disabled={loading}>
                Annuler
            </Button>
            <Button onClick={handleSubmit} color="primary" disabled={loading || !isValid()}>
                {
                    loading ?
                        <span className={classes.loadingSave}>
                            Sauvegarder <CircularProgress size={16} className={classes.circularProgress}/>
                        </span>
                        : 'Sauvegarder'
                }
            </Button>
        </DialogActions>

    </form>;
}
