import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {marginTop: theme.spacing(4), borderTop: `1px solid ${theme.palette.text.hint}`, paddingTop: theme.spacing(2)},
}));

const Source = ({recipe}) => {
    const classes = useStyles();

    if (!recipe.source) {
        return '';
    }

    return <div className={classes.root}>
        <Typography variant="body2" color="textSecondary">Source</Typography>
        <Typography variant="body2" color="textSecondary">{recipe.source}</Typography>
    </div>
};

export default Source;
