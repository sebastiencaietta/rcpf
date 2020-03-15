import React from 'react';
import {Link} from 'react-router-dom';
import Card from "@material-ui/core/Card";
import {Grid, makeStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import RecipeImage from '../images/recipe.jpg';

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
    },
    cardTitle: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        alignSelf: 'center',
    },
    media: {
        paddingTop: '75%',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
    divider: {
        margin: theme.spacing(2),
    }
}));

export default function Recipe({recipe}) {
    const classes = useStyles();

    return <Grid item xs={6} md={4}>
        <Link to={`/recipes/${recipe.slug}`} className={classes.link}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={recipe.thumbnail || RecipeImage}
                    title={recipe.title}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="body2" color="textPrimary" component="p" className={classes.cardTitle}>
                        {recipe.title}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    </Grid>
}
