import React, {useState, useEffect} from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import RecipeImage from "../../../../recipe-list/images/recipe.jpg";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
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
    },
    disabledInputSpan: {
        '&:hover': {
            '&::before': {background: 'rgba(0,0,0, 0.8)'},
            '&::after': {
                content: '"Set the title for the recipe before uploading the thumbnail"',
                color: theme.palette.error.light,
            }
        }
    }
}));

const ThumbnailUpload = ({savedRecipe, onThumbnailChange, uploadRecipeThumbnail, recipeSlug, recipeTitle}) => {
    const fileInput = React.createRef();
    const [thumbnail, setThumbnail] = useState('');
    const classes = useStyles();

    async function handleThumbnailImageChange(thumbnail) {
        const thumbUrl = await uploadRecipeThumbnail(recipeSlug, thumbnail);
        onThumbnailChange(thumbUrl);
        setThumbnail(thumbUrl);
    }

    useEffect(() => {
        if (savedRecipe.thumbnail !== undefined) {
            setThumbnail(savedRecipe.thumbnail);
        }
    }, [savedRecipe])


    return <>
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={thumbnail || RecipeImage}
                title={recipeTitle}
            >
                <label htmlFor="thumbnail">
                    <input type="file" id="thumbnail" disabled={!recipeSlug} className={classes.fileInput} ref={fileInput} onChange={(e) => handleThumbnailImageChange(e.target.files[0])}/>
                    <span className={clsx(classes.inputSpan, {[classes.disabledInputSpan]: !recipeSlug})} />
                </label>
            </CardMedia>
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" color="textPrimary" component="p" className={classes.cardTitle}>
                    {recipeTitle}
                </Typography>
            </CardContent>
        </Card>
    </>;
};

export default ThumbnailUpload;
