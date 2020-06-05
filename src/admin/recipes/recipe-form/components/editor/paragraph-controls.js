import React from 'react';
import {RichUtils} from "draft-js";
import {Menu} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const BLOCK_STYLES = [
    {type: 'unstyled', title: 'Paragraphe'},
    {type: 'header-one', title: 'Titre principal'},
    {type: 'header-three', title: 'Titre tertiaire'},
    {type: 'header-two', title: 'Titre secondaire'},
];

const ParagraphControls = ({editorState, onChange}) => {
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);
    const currentBlockStyle = BLOCK_STYLES.find(style => style.type === currentBlockType);
    const currentTypeTitle = currentBlockStyle ? currentBlockStyle.title : 'Paragraph';
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleStyleChange = (style) => {
        onChange(style);
        setAnchorEl(null);
    }

    return <>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} endIcon={<ArrowDropDownIcon/>}>
            {currentTypeTitle}
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {
                BLOCK_STYLES.map(style => (
                    <MenuItem key={style.type} onClick={() => handleStyleChange(style.type)}>
                        {style.title}
                    </MenuItem>)
                )
            }
        </Menu>
    </>
};

export default ParagraphControls;
