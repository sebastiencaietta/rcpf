import React, {useEffect, useState} from "react";
import {Editor, EditorState, convertToRaw, convertFromRaw, Modifier, CompositeDecorator, RichUtils} from "draft-js";
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import {linkDecorator} from "./editor/link-decorator";
import IconButton from "@material-ui/core/IconButton";
import LinkIcon from "@material-ui/icons/Link"
import ListControls from "./editor/list-controls";
import InlineStyleControls from "./editor/inline-style-controls";

const useStyles = makeStyles(theme => ({
    editor: {
        margin: theme.spacing(2),
        marginBottom: 0,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[100],
        borderRadius: theme.shape.borderRadius,
        cursor: "text"
    },
    paper: {
        paddingBottom: theme.spacing(2)
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: theme.palette.grey[200]
    },
}));

const decorator = new CompositeDecorator([linkDecorator,]);


export default function DescriptionEditor({rawValue, onChange, rawValueUpdated}) {
    const classes = useStyles();

    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(convertFromRaw(rawValue), decorator)
    );

    useEffect(() => {
        const newContent = convertFromRaw(rawValue);
        const newState = EditorState.push(editorState, newContent, 'insert-characters');
        setEditorState(newState);
    }, [rawValueUpdated]);

    function handleOnChange(event) {
        setEditorState(event);
        onChange(convertToRaw(event.getCurrentContent()));
    }

    function handleInlineStyleChange(style) {
        handleOnChange(RichUtils.toggleInlineStyle(editorState, style));
    }

    function handleBlockStyleChange(style) {
        handleOnChange(RichUtils.toggleBlockType(editorState, style));
    }

    function onLinkClick() {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const currentContent = editorState.getCurrentContent();
        const currentContentBlock = currentContent.getBlockForKey(anchorKey);
        const start = selectionState.getStartOffset();
        const end = selectionState.getEndOffset();
        const selectedText = currentContentBlock.getText().slice(start, end);
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            {url: selectedText}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const contentStateWithLink = Modifier.applyEntity(
            contentStateWithEntity,
            selectionState,
            entityKey
        );
        const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithLink});
        handleOnChange(newEditorState);
    }

    return <React.Fragment>
        <Paper className={classes.paper}>
            <Toolbar className={classes.toolbar}>
                <InlineStyleControls editorState={editorState} onChange={handleInlineStyleChange}/>
                <ListControls editorState={editorState} onChange={handleBlockStyleChange}/>
                <IconButton className={classes.button} aria-label="Delete" onClick={onLinkClick}>
                    <LinkIcon />
                </IconButton>
            </Toolbar>
            <div className={classes.editor}>
                <Editor editorState={editorState}
                        onChange={handleOnChange}
                        className={classes.editor}/>
            </div>
        </Paper>
    </React.Fragment>

}
