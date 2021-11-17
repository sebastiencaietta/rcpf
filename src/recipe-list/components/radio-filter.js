import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const RadioFilter = ({options, idField, labelField, onToggle, selectedOption, nullOption, label}) => {
    const handleChange = (e) => {
        onToggle(e.target.value);
    }

    return <div>
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                fullWidth
                value={selectedOption}
                onChange={handleChange}
                title={label}
                inputProps={{
                    name: 'category_id',
                    id: 'category_id',
                }}
            >
                {
                    nullOption && <MenuItem value={nullOption[idField]}>{nullOption[labelField]}</MenuItem>
                }
                {options.map((option) => {
                    return <MenuItem value={option[idField]} key={option[idField]}>{option[labelField]}</MenuItem>
                })}
            </Select>
        </FormControl>
    </div>
};

export default RadioFilter;
