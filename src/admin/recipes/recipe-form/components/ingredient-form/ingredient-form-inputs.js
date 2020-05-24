import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {makeStyles} from "@material-ui/core/styles";
import {UNITS} from "../../../../../global/constants/units";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete"

const useStyles = makeStyles((theme) => ({
    ingredientOption: {display: 'flex', alignItems: 'center'},
    ingredientOptionAvatarWrapper: {marginRight: theme.spacing(2)},
    ingredientOptionAvatar: {width: theme.spacing(4), height: theme.spacing(4)},
    inputContainer: {marginBottom: theme.spacing(2)},
}));

const unitOptions = Object.keys(UNITS).map((unitConstant) => {
    return {label: UNITS[unitConstant].unit, value: unitConstant}
});

const IngredientFormInputs = ({onQuantityChange, onIngredientChange, onUnitChange, onCommentChange, onCancelSubIngredient, ingredientOptions, predefinedValues, isSub}) => {
    const [inputs, setInputs] = useState({
        ingredient: null,
        ingredientInputValue: '',
        quantity: '',
        unit: null,
        unitInputValue: '',
        comment: '',
    });
    const classes = useStyles();
    useEffect(() => {
        if (predefinedValues !== undefined) {
            setInputs({
                ...inputs,
                ...predefinedValues,
                ingredient: predefinedValues.ingredient === null ? null : '', //search for ingredient in options
                ingredientInputValue: predefinedValues.ingredient === null ? '' : '',
                unitInputValue: predefinedValues.unit === null ? '' : '',
                unit: predefinedValues.unit === null ? null : '', //search for unit in options
                comment: predefinedValues.comment,
            });
        }
    }, [predefinedValues]);

    function handleQuantityChange(e) {
        setInputs({...inputs, quantity: e.target.value});
        onQuantityChange(e.target.value);
    };

    function handleCommentChange(e) {
        setInputs({...inputs, comment: e.target.value});
        onCommentChange(e.target.value);
    }

    function handleIngredientInputChange(e) {
        setInputs({...inputs, ingredientInputValue: e.target.value});
    }

    function handleIngredientSelect(e, option) {
        const ingredient = option || null;
        setInputs({...inputs, ingredient: ingredient, ingredientInputValue: option ? option.label : ''});
        onIngredientChange(ingredient.value);
    }

    function handleUnitInputChange(e) {
        setInputs({...inputs, unitInputValue: e.target.value});
    }

    function handleUnitSelect(e, option) {
        const unit = option || null
        setInputs({...inputs, unit, unitInputValue: option ? option.label : ''});
        onUnitChange(unit.value);
    }

    const renderIngredientOption = (option) => (
        <div className={classes.ingredientOption}>
            <div className={classes.ingredientOptionAvatarWrapper}>
                <Avatar alt={option.label} src={option.image} className={classes.ingredientOptionAvatar}/>
            </div>
            {option.label}
        </div>
    );

    return <Grid container alignItems="flex-end" className={classes.inputContainer}>
        {isSub ? <Grid item sm={1}>OR</Grid> : ''}
        <Grid item sm={isSub ? 1 : 2} xs={3}>
            <TextField type="number" label="Quantity" fullWidth
                       value={inputs.quantity}
                       onChange={handleQuantityChange}/>
        </Grid>
        <Grid item sm={2} xs={3}>
            <Autocomplete options={unitOptions} getOptionLabel={(option) => option.label || ''}
                          renderInput={(params) => <TextField fullWidth
                                                              onChange={handleUnitInputChange}
                                                              {...params}
                                                              label="Unit"/>}
                          renderOption={(option) => option.label}
                          onChange={handleUnitSelect}
                          value={inputs.unit}
                          inputValue={inputs.unitInputValue}
            />
        </Grid>
        <Grid item sm={isSub ? 4 : 5} xs={6}>
            <Autocomplete options={ingredientOptions} getOptionLabel={(option) => option.label || ''}
                          renderInput={(params) => <TextField fullWidth
                                                              onChange={handleIngredientInputChange} {...params}
                                                              label="Ingredient"/>}
                          renderOption={renderIngredientOption}
                          onChange={handleIngredientSelect}
                          value={inputs.ingredient}
                          inputValue={inputs.ingredientInputValue}
            />
        </Grid>
        <Grid item sm={3} xs={8}>
            <TextField type="text" label="Comment" fullWidth value={inputs.comment} onChange={handleCommentChange}/>
        </Grid>
        {isSub ? <Grid item sm={1} style={{textAlign: "center"}}>
            <IconButton size="small" onClick={onCancelSubIngredient}><DeleteIcon /></IconButton>
        </Grid> : ''}
    </Grid>;
};

export default IngredientFormInputs;
