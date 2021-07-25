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

const NoRecipeFound = () => {
    const classes = useStyles();

    return <div className={classes.root}>
        <Typography variant="body1">
            Nous n'avons pas de recettes correspondant à vôtre recherche.
        </Typography>
    </div>
};

export default NoRecipeFound;
