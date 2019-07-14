import React from 'react';
import {Link} from 'react-router-dom';
import Card from "@material-ui/core/Card";
import {Grid, makeStyles} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
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

    return <Grid item xs={12} sm={4} md={3}>
        <Link to={`/recipes/${recipe.slug}`} className={classes.link}>
            <Card className={classes.card}>
                <CardHeader title={recipe.title} />
            </Card>
        </Link>
    </Grid>
}
