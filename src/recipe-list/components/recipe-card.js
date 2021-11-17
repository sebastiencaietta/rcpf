import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import RecipeImage from '../images/recipe.jpg';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles(theme => ({
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    titleContainer: {
        paddingTop: '1rem',
    },
    title: {
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    image: {
        paddingTop: '100%',
        maxWidth: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen * 2
        }),
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover $image': {transform: 'scale(1.1)'},
        '&:hover $title': {color: theme.palette.primary["50"]}
    },
    divider: {
        margin: theme.spacing(2),
    }
}));

export default function Recipe({recipe}) {
    const classes = useStyles();

    return <Grid item xs={12} sm={6} md={4}>
        <Link to={`/recipes/${recipe.slug}`} className={classes.link}>
            <div className={classes.imageContainer}>
                <div className={classes.image} style={{
                    backgroundImage: `url("${recipe.thumbnail || RecipeImage}")`
                }}>
                </div>
            </div>
            <div className={classes.titleContainer}>
                <Typography variant="body2" color="textPrimary" component="p" className={classes.title}>
                    {recipe.title}
                </Typography>
            </div>
        </Link>
    </Grid>
}
