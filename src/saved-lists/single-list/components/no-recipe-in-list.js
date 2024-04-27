import React from 'react';
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: 'center',
    },
    paragraph: {
        padding: theme.spacing(4),
    }
}));

const filteredView = (classes, resetFilters) => {
    return <Box textAlign="center">
        <Typography variant="body1" className={classes.paragraph}>
            Il n'y a pas de recettes dans cette liste qui correspondent à votre recherche.
        </Typography>
        <Typography variant="body1">
            <Button color="primary" variant="contained" onClick={resetFilters}>Réinitialiser les filtres</Button>
        </Typography>
    </Box>
};

const unfilteredView = (classes) => {
    return <Box textAlign="center">
        <Typography variant="body1" className={classes.paragraph}>
            Il n'y a pas de recettes dans cette liste.
        </Typography>
        <Typography variant="body1">
            <Box mb={4}>
                <Link to="/my-lists">
                    <Button color="primary" variant="contained">Revenir à mes listes</Button>
                </Link>
            </Box>
            <Link to="/">
                <Button color="primary" variant="outlined">Revenir à toutes les recettes</Button>
            </Link>
        </Typography>
    </Box>
}

const NoRecipeInList = ({resetFilters, isFiltered}) => {
    const classes = useStyles();

    return <div className={classes.root}>
        {isFiltered ? filteredView(classes, resetFilters) : unfilteredView(classes)}
    </div>
};

export default NoRecipeInList;
