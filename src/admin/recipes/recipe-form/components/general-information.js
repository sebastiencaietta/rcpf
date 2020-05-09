import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import slugify from "slugify";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TagSelect from "./tag-select";
import {fetchCategories, fetchTags} from "../../../../global/eve";
import InputAdornment from "@material-ui/core/InputAdornment";

const GeneralInformation = ({onFieldChange, savedRecipe}) => {
    const [data, setData] = useState({
        title: '',
        slug: '',
        tags: [],
        category: '',
        portionSize: '',
        portionType: '',
        prepTime: '',
        cookingTime: '',
        source: '',
    });
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Promise.all([fetchTags(), fetchCategories()]).then(([tags, categories]) => {
            setTags(tags);
            setCategories(categories);
        });
    }, []);

    useEffect(() => {
        if (!savedRecipe.title) {
            return;
        }

        setData({
            ...data,
            title: savedRecipe.title,
            slug: savedRecipe.slug,
            tags: savedRecipe.tags,
            category: savedRecipe.category,
            portionSize: savedRecipe.portionSize || '',
            portionType: savedRecipe.portionType || '',
            prepTime: savedRecipe.prepTime || '',
            cookingTime: savedRecipe.cookingTime || '',
            source: savedRecipe.source || '',
        });
    }, [savedRecipe])

    function handleTitleChange(event) {
        const title = event.target.value;
        const slug = slugify(title).toLowerCase();
        setData({...data, title, slug});
        onFieldChange('title', title);
        onFieldChange('slug', slug);
    }

    function handleFieldChange(field, value) {
        console.log(field, value);
        setData({...data, [field]: value});
        onFieldChange(field, value);
    }

    return <Grid container justify="center" spacing={3}>
        <Grid item xs={12}>
            <TextField
                label="Title" fullWidth
                helperText={data.slug}
                value={data.title}
                onChange={handleTitleChange}
                required={true}
            />
        </Grid>

        <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="category_id">Category</InputLabel>
            <Select
                fullWidth
                value={data.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                inputProps={{
                    name: 'category_id',
                    id: 'category_id',
                }}
            >
                {categories.map((category) => {
                    return <MenuItem value={category.id} key={category.id}>{category.title}</MenuItem>
                })}
            </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
            <TagSelect tags={tags} recipeTags={data.tags}
                       onTagSelect={(e) => handleFieldChange('tags', e.target.value)}/>
        </Grid>

        <Grid item xs={4} sm={2}>
            <TextField type="number" label="Portion size" fullWidth value={data.portionSize} onChange={(e) => handleFieldChange('portionSize', e.target.value)}/>
        </Grid>
        <Grid item xs={8} sm={4}>
            <TextField type="text" label="Portion type" helperText="i.e. people, biscuits, etc..." fullWidth value={data.portionType} onChange={(e) => handleFieldChange('portionType', e.target.value)}/>
        </Grid>
        <Grid item xs={6} sm={3}>
            <TextField type="number" label="Prep time" fullWidth value={data.prepTime}
                       onChange={(e) => handleFieldChange('prepTime', e.target.value)}
                       InputProps={{endAdornment: <InputAdornment position="end">minutes</InputAdornment>}}
            />
        </Grid>
        <Grid item xs={6} sm={3}>
            <TextField type="number" label="Cooking time" fullWidth value={data.cookingTime}
                       onChange={(e) => handleFieldChange('cookingTime', e.target.value)}
                       InputProps={{endAdornment: <InputAdornment position="end">minutes</InputAdornment>}}
            />
        </Grid>

        <Grid item xs={12}>
            <TextField label="Source" fullWidth value={data.source} onChange={(e) => handleFieldChange('source', e.target.value)}/>
        </Grid>

    </Grid>
}

export default GeneralInformation;
