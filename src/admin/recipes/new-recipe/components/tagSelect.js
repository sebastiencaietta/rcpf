import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selected: {
        fontWeight: 'bold',
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default ({recipeTags, tags, handleTagSelect}) => {
    const classes = useStyles();

    function onTagSelect(event) {
        handleTagSelect(event.target.value);
    }

    const getRenderValue = (selected) => {
        return selected.map(id => {
            const tag = tags.find((tag) => tag.id === id);
            return tag ? tag.title : '';
        }).join(', ');
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="tags">Tags</InputLabel>
            <Select
                multiple
                value={recipeTags}
                onChange={onTagSelect}
                input={<Input id="tags"/>}
                renderValue={getRenderValue}
                MenuProps={MenuProps}
            >
                {tags.map(tag => (
                    <MenuItem key={tag.id} value={tag.id}>
                        <ListItemText primary={tag.title}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
