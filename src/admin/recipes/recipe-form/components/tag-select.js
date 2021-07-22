import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const recreateOptionsFromRecipe = (selectedOptions, options, idField) => {
  return selectedOptions.map(selectedOption => options.find(option => selectedOption === option[idField]));
};

export default ({selectedOptions, options, onOptionSelect, idField, labelField, label}) => {
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (selectedOptions.length === 0) {
            return;
        }

        setSelected(recreateOptionsFromRecipe(selectedOptions, options, idField));
    }, [selectedOptions]);

    function handleChange(e, selectedOptions) {
        setSelected(selectedOptions);
        onOptionSelect(selectedOptions.map(option => option[idField]))
    }

    return (<>
            <Autocomplete options={options}
                          getOptionLabel={(option) => option[labelField]}
                          multiple
                          size="small"
                          limitTags={6}
                          renderInput={(params) => <TextField fullWidth label={label} {...params}/>}
                          renderOption={(option) => option[labelField]}
                          disableCloseOnSelect={true}
                          onChange={handleChange}
                          value={selected}
            />
        </>);
}
