import React, {useEffect, useState} from "react";
import Editor from '@draft-js-plugins/editor';
import {EditorState, convertToRaw, convertFromRaw, Modifier, CompositeDecorator, RichUtils} from "draft-js";
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin'
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import {linkDecorator} from "./editor/link-decorator";
import IconButton from "@material-ui/core/IconButton";
import LinkIcon from "@material-ui/icons/Link"
import ListControls from "./editor/list-controls";
import InlineStyleControls from "./editor/inline-style-controls";
import ParagraphControls from "./editor/paragraph-controls";

const useStyles = makeStyles(theme => ({
    editor: {
        marginBottom: 0,
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        cursor: "text"
    },
    paper: {
        paddingBottom: theme.spacing(2)
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: theme.palette.background.paper,
    },
}));

const decorator = new CompositeDecorator([linkDecorator]);
const blockBreakoutPlugin = createBlockBreakoutPlugin();
const plugins = [blockBreakoutPlugin];

export default function DescriptionEditor({onChange, savedDescription}) {
    const classes = useStyles();
    const editorRef = React.createRef();

    const [editorState, setEditorState] = useState(
        EditorState.createWithContent((EditorState.createEmpty().getCurrentContent()), decorator)
    );

    useEffect(() => {
        if (savedDescription !== undefined) {
            const newContent = convertFromRaw(savedDescription);
            const newState = EditorState.createWithContent(newContent, decorator)
            setEditorState(newState);
        }
    }, [savedDescription]);

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
        setEditorState(newEditorState);
        handleOnChange(newEditorState);
    }

    return <React.Fragment>
        <Paper className={classes.paper}>
            <Toolbar className={classes.toolbar}>
                <ParagraphControls editorState={editorState} onChange={handleBlockStyleChange}/>
                <InlineStyleControls editorState={editorState} onChange={handleInlineStyleChange}/>
                <ListControls editorState={editorState} onChange={handleBlockStyleChange}/>
                <IconButton className={classes.button} aria-label="Delete" onClick={onLinkClick}>
                    <LinkIcon />
                </IconButton>
            </Toolbar>
            <div className={classes.editor} onClick={() => editorRef.current.focus()}>
                <Editor editorState={editorState}
                        onChange={handleOnChange}
                        className={classes.editor}
                        plugins={plugins}
                        ref={editorRef}/>
            </div>
        </Paper>
    </React.Fragment>

}
