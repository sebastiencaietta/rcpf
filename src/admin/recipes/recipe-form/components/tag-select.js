import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const recreateOptionsFromRecipe = (recipeTags, tags) => {
  return recipeTags.map(recipeTag => tags.find(tag => recipeTag === tag.id));
};

export default ({recipeTags, tags, onTagSelect}) => {
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        if (recipeTags.length === 0) {
            return;
        }

        setSelectedTags(recreateOptionsFromRecipe(recipeTags, tags));
    }, [recipeTags]);

    function handleTagChange(e, selectedTags) {
        setSelectedTags(selectedTags);
        onTagSelect(selectedTags.map(tag => tag.id))
    }

    return (<>
            <Autocomplete options={tags}
                          getOptionLabel={(option) => option.title}
                          multiple
                          size="small"
                          limitTags={6}
                          renderInput={(params) => <TextField fullWidth label="Tags" {...params}/>}
                          renderOption={(option) => option.title}
                          disableCloseOnSelect={true}
                          onChange={handleTagChange}
                          value={selectedTags}
            />
        </>);
}
