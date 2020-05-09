import React from "react"
import { ButtonGroup, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered"
import clsx from "clsx"
import  {RichUtils} from 'draft-js';

const useStyles = makeStyles(theme => ({
    activeIcon: {
        color: theme.palette.primary.main
    }
}));

const LIST_STYLES = [
    { icon: FormatListNumberedIcon, style: "ordered-list-item" },
    { icon: FormatListBulletedIcon, style: "unordered-list-item" }
];

export default function ListControls(props) {
    const classes = useStyles();
    const currentBlockType = RichUtils.getCurrentBlockType(props.editorState);

    const renderIcon = type => {
        let IconName = type.icon;
        return (
            <IconName
                className={clsx({
                    [classes.activeIcon]: currentBlockType === type.style
                })}
            />
        )
    };

    function handleOnMouseDown(event, style) {
        event.preventDefault();
        props.onChange(style);
    }

    return (
        <ButtonGroup size="small" variant="contained">
            {LIST_STYLES.map(type => (
                <Button key={type.style} onMouseDown={(event) => handleOnMouseDown(event, type.style)}>
                    {renderIcon(type)}
                </Button>
            ))}
        </ButtonGroup>
    )
};
