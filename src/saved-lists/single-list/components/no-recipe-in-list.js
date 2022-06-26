import React from 'react';
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: 'center',
    }
}));

const NoRecipeInList = () => {
    const classes = useStyles();

    return <div className={classes.root}>
        <Typography variant="body1">
            Il n'y a pas de recettes dans cette liste

            TBD => Link vers page recettes
            TBD => Delete la list et revenir a toutes les listes
            TBD => Filters ? Reset filters : ''
        </Typography>
    </div>
};

export default NoRecipeInList;
