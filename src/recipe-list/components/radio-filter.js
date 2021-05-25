import React from 'react';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(() => ({
    tagList: {
        flexGrow: 1,
    },
    tagListItem: {
        paddingTop: 0,
        paddingBottom: 0,
    }
}));

const RadioFilter = ({options, idField, label, onToggle, selectedOption, nullOption}) => {
    const classes = useStyles();

    const handleChange = (e) => {
        onToggle(e.target.value);
    }

    return <List dense className={classes.tagList}>
        <RadioGroup aria-label="category" name="category" value={selectedOption}
                    onChange={handleChange}>
            {nullOption && <FormControlLabel value={nullOption[idField]}
                                             control={<Radio/>}
                                             label={nullOption[label]}
                                             checked={!selectedOption}/>}

            {options.map(category => <FormControlLabel key={category[idField]}
                                                          value={category[idField]}
                                                          control={<Radio/>}
                                                          label={category[label]}
                                                          checked={selectedOption === category[idField]}/>)}
        </RadioGroup>
    </List>
};

export default RadioFilter;
