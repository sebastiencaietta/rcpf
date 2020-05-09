import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default ({recipeTags, tags, onTagSelect}) => {

    const getRenderValue = (selected) => {
        const commaSeparatedTags = selected.map(id => {
            const tag = tags.find((tag) => tag.id === id);
            return tag ? tag.title : '';
        }).join(', ');

        return commaSeparatedTags.length > 30 ? commaSeparatedTags.substr(0, 30) + '...' : commaSeparatedTags;
    };

    return (<>
            <InputLabel htmlFor="tags">Tags</InputLabel>
            <Select
                fullWidth
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
        </>);
}
