import React from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input"
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const CheckboxFilter = ({options, idField, labelField, setSelected, selectedOptions, label}) => {
    const renderValue = options.filter(option => selectedOptions.indexOf(option[idField]) !== -1)
        .map(option => option[labelField])
        .join(', ');

    const onChange = (event) => {
        const {value} = event.target;
        setSelected(value);
    }

    return <div>
        <FormControl fullWidth>
            <InputLabel id={label}>{label}</InputLabel>

            <Select
                labelId={label}
                id={`select-${label}`}
                multiple
                value={selectedOptions}
                onChange={onChange}
                input={<Input />}
                renderValue={() => renderValue}
            >
                {options.map((option) => (
                    <MenuItem key={option[idField]} value={option[idField]}>
                        <Checkbox checked={selectedOptions.indexOf(option[idField]) > -1} />
                        <ListItemText primary={option[labelField]} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </div>;
}

export default CheckboxFilter;
