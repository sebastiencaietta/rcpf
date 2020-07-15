import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    listItemRoot: {
        display: 'flex',
        alignItems: 'center',
        '&:hover': {background: theme.palette.augmentColor({main: theme.palette.background.default}).light},
        '&:hover $actions button': {visibility: 'initial'}, margin: theme.spacing(0.5, 0)
    },
    ingredientName: {marginRight: theme.spacing(0.5)},
    actions: {justifyContent: 'space-between', marginLeft: 'auto', paddingLeft: theme.spacing(2), '& >button': {visibility: 'hidden'}},
}));

export default ({ingredient, recipes, onEditClick, onViewClick, onDeleteClick}) => {
    const classes = useStyles();

    const handleViewClick = () => {
        onViewClick(ingredient);
    }

    const handleEditClick = () => {
        onEditClick(ingredient);
    };

    const handleDeleteClick = () => {
        onDeleteClick(ingredient);
    };

    return <Grid item lg={4} sm={12} md={6}>
        <div className={classes.listItemRoot}>
            <ListItemAvatar>
                <Avatar alt={ingredient.name} src={ingredient.thumbnail}/>
            </ListItemAvatar>
            <div className={classes.ingredientName}>
                {ingredient.name}
            </div>
            {
                recipes.length
                    ? <div>({recipes.length})</div>
                    : ''
            }
            <div>
            </div>
            <div className={classes.actions}>
                <IconButton size="small" disableFocusRipple={true} onClick={handleViewClick}
                            disabled={!recipes.length}>
                    <VisibilityIcon/>
                </IconButton>
                <IconButton size="small" disableFocusRipple={true} onClick={handleEditClick}>
                    <EditIcon/>
                </IconButton>
                <IconButton size="small" disableFocusRipple={true} onClick={handleDeleteClick}
                            disabled={recipes.length !== 0}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    </Grid>;
}
