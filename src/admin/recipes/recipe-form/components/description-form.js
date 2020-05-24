import React, {useState} from 'react';
import {withStyles} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DescriptionEditor from "./description-editor";
import Renderer from "../../../../global/components/RteRenderer";
import {makeStyles} from "@material-ui/core/styles";

const AntTabs = withStyles(() => ({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
}))(Tabs);

const AntTab = withStyles(theme => ({
    root: {
        textAlign: 'left',
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&:selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(() => ({
    editorWrapper: {
        flex: '1 1 auto',
    },
}));

const DescriptionForm = ({onDescriptionChange, savedRecipe}) => {
    const [descriptionTab, setDescriptionTab] = useState('editor');
    const [description, setDescription] = useState(savedRecipe.description);
    const classes = useStyles();

    function handleDescriptionTabChange(event, newValue) {
        setDescriptionTab(newValue);
    }

    function handleDescriptionChange(description) {
        setDescription(description);
        onDescriptionChange(description);
    }

    return <div className={classes.editorWrapper}>
        <AntTabs value={descriptionTab} onChange={handleDescriptionTabChange}>
            <AntTab label="Editor" value="editor"/>
            <AntTab label="Preview" value="preview"/>
        </AntTabs>

        <div style={descriptionTab !== 'editor' ? {display: 'none'} : {}}>
            <DescriptionEditor
                onChange={handleDescriptionChange}
                savedDescription={savedRecipe.description}/>
        </div>

        {descriptionTab === 'preview' && <Renderer raw={description}/>}
    </div>;
}

export default DescriptionForm;
