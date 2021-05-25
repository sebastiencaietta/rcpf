import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    tagList: {
        flexGrow: 1,
    },
    tagListItem: {
        paddingTop: 0,
        paddingBottom: 0,
    }
}));

const CheckboxFilter = ({options, idField, label, onToggle, selectedOptions}) => {
    const classes = useStyles();

    return <List dense className={classes.tagList}>
        {options.map(option => {
            const labelId = `checkbox-list-label-${option.title}`;

            return <ListItem key={option[idField]} button onClick={() => onToggle(option[idField])}
                             className={classes.tagListItem}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={selectedOptions.indexOf(option[idField]) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{'aria-labelledby': labelId}}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={option[label]}/>
            </ListItem>
        })}
    </List>;
}

export default CheckboxFilter;
