import React from 'react';
import RecipeImage from "../../recipe-list/images/recipe.jpg";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core";

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
        display: 'block',
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover $image': {transform: 'scale(1.1)'},
        '&:hover $title': {color: theme.palette.type === 'dark' ? theme.palette.primary["50"] : theme.palette.primary["900"]},
    }
}));

const Card = ({link, image, title}) => {
    const classes = useStyles();

    return <Link to={link} className={classes.link}>
        <div className={classes.imageContainer}>
            <div className={classes.image} style={{
                backgroundImage: `url("${image || RecipeImage}")`
            }}>
            </div>
        </div>
        <div className={classes.titleContainer}>
            <Typography variant="body2" color="textPrimary" component="p" className={classes.title}>
                {title}
            </Typography>
        </div>
    </Link>;
}

export default Card;
