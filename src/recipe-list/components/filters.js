import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function filters({tags, onToggle, onSearch}) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        onToggle(value);
    };

    return <React.Fragment>
        <FormControl className={classes.margin}>
            <Input
                onChange={(e) => {onSearch(e.target.value)}}
                startAdornment={
                    <InputAdornment position="start">
                        <Search/>
                    </InputAdornment>
                }
            />
        </FormControl>
        <List>
            {tags.map(tag => {
                const labelId = `checkbox-list-label-${tag.title}`;

                return <ListItem key={tag.id} role={undefined} dense button onClick={handleToggle(tag.id)}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={checked.indexOf(tag.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{'aria-labelledby': labelId}}
                        />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={tag.title}/>
                </ListItem>
            })}
        </List>
    </React.Fragment>
}