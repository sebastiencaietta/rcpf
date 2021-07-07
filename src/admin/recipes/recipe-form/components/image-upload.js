import React, {useState, useEffect} from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import RecipeImage from "../../../../recipe-list/images/recipe.jpg";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import ConfirmIconButton from "../../../../global/components/confirm-icon-button";

const useStyles = makeStyles(theme => ({
    media: {paddingTop: '75%', position: "relative"},
    fileInput: {visibility: 'hidden'},
    thumbnailInputSpan: {
        '&::before': {
            position: 'absolute', content: '" "', top: 0, bottom: 0, left: 0, right: 0, cursor: 'pointer', zIndex: 2
        },
        '&:hover': {
            '&::before': {background: 'rgba(0,0,0, 0.5)'},
            '&::after': {
                content: '"UPLOAD NEW IMAGE"', textAlign: 'center', width: '100%', position: 'absolute',
                top: '50%', left: 0, transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 2,
            }
        }
    },
    thumbnailDisabledInputSpan: {
        '&:hover': {
            '&::before': {background: 'rgba(0,0,0, 0.85)'},
            '&::after': {
                content: '"Veuillez choisir le titre de la recette avant d\'ajouter une image"',
                color: theme.palette.error.light,
            }
        }
    },
    heroReplica: {
        height: 0,
        width: '100%',
        paddingTop: '21%',
        position: 'relative',
        backgroundSize: 'cover',
        '&::before': {
            content: '" "', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.2987570028011205) 0%, rgba(0,0,0,0.5) 27%, rgba(0,0,0,0.5) 73%, rgba(0,0,0,0.3) 100%);',
            zIndex: 1,
        },
    },
    mobileHeroReplica: {
        height: 0,
        paddingTop: '54%',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        '&::before': {
            content: '" "', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.2987570028011205) 0%, rgba(0,0,0,0.5) 27%, rgba(0,0,0,0.5) 73%, rgba(0,0,0,0.3) 100%);',
            zIndex: 1,
        },
    }
}));

const ImageUpload = ({savedRecipe, onThumbnailChange, uploadRecipeThumbnail, recipeSlug, recipeTitle, updateRecipeHero, onHeroChange}) => {
    const thumbnailInput = React.createRef();
    const heroInput = React.createRef();
    const [thumbnail, setThumbnail] = useState('');
    const [hero, setHero] = useState({url: null, verticalPosition: 69});
    const classes = useStyles();

    useEffect(() => {
        if (savedRecipe.thumbnail !== undefined) {
            setThumbnail(savedRecipe.thumbnail);
        }
        if (savedRecipe.hero !== undefined) {
            setHero(savedRecipe.hero);
        }
    }, [savedRecipe])

    async function handleThumbnailImageChange(thumbnail) {
        const thumbUrl = await uploadRecipeThumbnail(recipeSlug, thumbnail);
        onThumbnailChange(thumbUrl);
        setThumbnail(thumbUrl);
    }

    async function handleHeroImageChange(file) {
        const url = await updateRecipeHero(recipeSlug, file);
        onHeroChange({...hero, url});
        setHero({...hero, url});
    }

    const handleMoveHeroUp = () => {
        if (hero.verticalPosition >= 100) {
            return;
        }
        const newPosition = hero.verticalPosition + 1;
        onHeroChange({...hero, verticalPosition: newPosition});
        setHero({...hero, verticalPosition: newPosition});
    }

    const handleMoveHeroDown = () => {
        if (hero.verticalPosition <= 0) {
            return;
        }
        const newPosition = hero.verticalPosition - 1;
        onHeroChange({...hero, verticalPosition: newPosition});
        setHero({...hero, verticalPosition: newPosition});
    };

    const handleHeroResetPosition = () => {
        setHero({...hero, verticalPosition: 69});
        onHeroChange({...hero, verticalPosition: 69});
    }

    const handleDeleteHero = () => {
        setHero({url: null, verticalPosition: 69});
        onHeroChange({url: null, verticalPosition: 69});
    };

    return <div style={{flexGrow: 1}}>
        <h2>Liste des recettes</h2>
        <Grid container>
            <Grid item xs={6} md={4}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={thumbnail || RecipeImage}
                        title={recipeTitle}
                    >
                        <label htmlFor="thumbnail">
                            <input type="file" id="thumbnail" disabled={!recipeSlug} className={classes.fileInput}
                                   ref={thumbnailInput}
                                   onChange={(e) => handleThumbnailImageChange(e.target.files[0])}/>
                            <span
                                className={clsx(classes.thumbnailInputSpan, {[classes.thumbnailDisabledInputSpan]: !recipeSlug})}/>
                        </label>
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="body2" color="textPrimary" component="p" className={classes.cardTitle}>
                            {recipeTitle}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

        <h2>Page recette</h2>
        <h3>Desktop</h3>
        <IconButton onClick={handleMoveHeroUp} disabled={hero.verticalPosition === 100}><ArrowUpwardIcon/></IconButton>
        <IconButton onClick={handleMoveHeroDown} disabled={hero.verticalPosition === 0}><ArrowDownwardIcon/></IconButton>
        <IconButton onClick={handleHeroResetPosition} title="Reset la position" disabled={hero.verticalPosition === 69}>
            <SettingsBackupRestoreIcon/>
        </IconButton>
        <ConfirmIconButton onConfirm={handleDeleteHero} IconComponent={DeleteIcon} disabled={hero.url === undefined}/>

        <div className={classes.heroReplica} style={{
            backgroundImage: `url("${hero && hero.url ? hero.url : thumbnail}")`,
            backgroundPosition: `center ${hero.verticalPosition}%`
        }}>
            <label htmlFor="hero">
                <input type="file" id="hero" disabled={!recipeSlug} className={classes.fileInput} ref={heroInput}
                       onChange={(e) => handleHeroImageChange(e.target.files[0])}/>
                <span
                    className={clsx(classes.thumbnailInputSpan, {[classes.thumbnailDisabledInputSpan]: !recipeSlug})}/>
            </label>
        </div>
        <h3>Mobile</h3>
        <div style={{width: '360px'}}>
            <div className={classes.mobileHeroReplica}
                 style={{backgroundImage: `url("${hero && hero.url ? hero.url : thumbnail}")`}}>
            </div>
        </div>
    </div>;
};

export default ImageUpload;
