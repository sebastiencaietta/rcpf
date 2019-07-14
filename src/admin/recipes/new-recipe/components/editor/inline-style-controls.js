import React from "react"
import { ButtonGroup, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import FormatBoldIcon from "@material-ui/icons/FormatBold"
import FormatItalicIcon from "@material-ui/icons/FormatItalic"
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
    activeIcon: {
        color: theme.palette.primary.main
    }
}));

const INLINE_STYLES = [
    { icon: FormatBoldIcon, style: "BOLD" },
    { icon: FormatItalicIcon, style: "ITALIC" },
    { icon: FormatUnderlinedIcon, style: "UNDERLINE" }
];

export default function InlineStyleControls(props) {
    const classes = useStyles();
    const currentStyle = props.editorState.getCurrentInlineStyle();

    const renderIcon = type => {
        let IconName = type.icon;
        return (
            <IconName
                className={clsx({
                    [classes.activeIcon]: currentStyle.has(type.style)
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
            {INLINE_STYLES.map(type => (
                <Button key={type.style} onMouseDown={(event) => handleOnMouseDown(event, type.style)}>
                    {renderIcon(type)}
                </Button>
            ))}
        </ButtonGroup>
    )
};
