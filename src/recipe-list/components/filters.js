import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Search, ExpandMore} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(2, 0),
        width: '100%',
    },
    tagList: {
        flexGrow: 1,
    },
    tagListItem: {
        paddingTop: 0,
        paddingBottom: 0,
    }
}));

export default function filters({checked, tags, onToggle, search, onSearch, categories, selectedCategory, toggleCategory}) {
    const classes = useStyles();

    const handleCategoryChange = (a, b, c) => {
        toggleCategory(a.target.value);
    };

    return <React.Fragment>
        <FormControl className={classes.margin}>
            <Input
                value={search}
                onChange={(e) => {
                    onSearch(e.target.value)
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <Search/>
                    </InputAdornment>
                }
            />
        </FormControl>

        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMore/>} aria-label="Expand">Categories</ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List dense className={classes.tagList}>
                    <RadioGroup aria-label="category" name="category" value={selectedCategory}
                                onChange={handleCategoryChange}>
                        <FormControlLabel value={''}
                                          control={<Radio/>}
                                          label="Toutes categories"
                                          checked={!selectedCategory}/>
                        {categories.map(category => <FormControlLabel key={category.id}
                                                                      value={category.id}
                                                                      control={<Radio/>}
                                                                      label={category.title}
                                                                      checked={selectedCategory === category.id}/>)}
                    </RadioGroup>
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMore/>} aria-label="Expand">Tags</ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List dense className={classes.tagList}>
                    {tags.map(tag => {
                        const labelId = `checkbox-list-label-${tag.title}`;

                        return <ListItem key={tag.id} button onClick={() => onToggle(tag.id)}
                                         className={classes.tagListItem}>
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
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </React.Fragment>
}
