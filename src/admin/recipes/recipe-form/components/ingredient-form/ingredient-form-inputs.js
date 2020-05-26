import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {makeStyles} from "@material-ui/core/styles";
import {UNITS} from "../../../../../global/constants/units";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from "@material-ui/icons/Clear"
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles((theme) => ({
    ingredientOption: {display: 'flex', alignItems: 'center'},
    ingredientOptionAvatarWrapper: {marginRight: theme.spacing(2)},
    ingredientOptionAvatar: {width: theme.spacing(4), height: theme.spacing(4)},
    inputContainer: {marginBottom: theme.spacing(2)},
}));

const unitOptions = Object.keys(UNITS).map((unitConstant) => {
    return {label: UNITS[unitConstant].unit, value: unitConstant}
});

const IngredientFormInputs = ({ingredientOptions, onSubmit, onCancel, savedIngredient}) => {
    const [inputs, setInputs] = useState({
        ingredient: null,
        ingredientInputValue: '',
        quantity: '',
        unit: null,
        unitInputValue: '',
        comment: '',
    });
    const [isCanceling, setIsCanceling] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if (savedIngredient === undefined) {
            return;
        }

        const ingredientOption = ingredientOptions.find(ingredient => ingredient.value === savedIngredient.ingredientId);
        const unitOption = unitOptions.find(unit => unit.value === savedIngredient.unit);

        setInputs({
            ingredient: ingredientOption,
            ingredientInputValue: ingredientOption.label,
            quantity: savedIngredient.quantity,
            unit: unitOption,
            unitInputValue: unitOption.label,
            comment: savedIngredient.comment,
        });
    }, [savedIngredient]);

    function handleQuantityChange(e) {
        setInputs({...inputs, quantity: e.target.value});
    }

    function handleCommentChange(e) {
        setInputs({...inputs, comment: e.target.value});
    }

    function handleIngredientInputChange(e) {
        setInputs({...inputs, ingredientInputValue: e.target.value});
    }

    function handleIngredientSelect(e, option) {
        const ingredient = option || null;
        setInputs({...inputs, ingredient: ingredient, ingredientInputValue: option ? option.label : ''});
    }

    function handleUnitInputChange(e) {
        setInputs({...inputs, unitInputValue: e.target.value});
    }

    function handleUnitSelect(e, option) {
        const unit = option || null;
        setInputs({...inputs, unit, unitInputValue: option ? option.label : ''});
    }

    function handleUnitKeyDown(e) {
        if (e.keyCode === 13
            && inputs.unit
            && inputs.unitInputValue
            && inputs.unitInputValue === inputs.unit.label) {
            e.preventDefault();
            handleSubmit();
        }
    }

    function handleIngredientKeyDown(e) {
        if (e.keyCode === 13
            && inputs.ingredient
            && inputs.ingredientInputValue
            && inputs.ingredientInputValue === inputs.ingredient.label) {
            e.preventDefault();
            handleSubmit();
        }
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSubmit();
        }
    }

    function isValid() {
        return inputs.unit && inputs.ingredient;
    }

    function handleSubmit() {
        if (!isValid()) {
            return false;
        }
        onSubmit({
            ingredientId: inputs.ingredient.value,
            quantity: inputs.quantity,
            unit: inputs.unit.value,
            comment: inputs.comment,
        });
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
        <Grid item xs={2}>
            <TextField type="text" label="Quantity" fullWidth margin="dense" size="small"
                       value={inputs.quantity}
                       onChange={handleQuantityChange}
                       onKeyDown={handleKeyDown}
                       tabIndex={1}/>
        </Grid>
        <Grid item xs={2}>
            <Autocomplete options={unitOptions} getOptionLabel={(option) => option.label || ''}
                          renderInput={(params) => <TextField fullWidth label="Unit" margin="dense"{...params}
                                                              size="small"
                                                              onChange={handleUnitInputChange}
                                                              onKeyDown={handleUnitKeyDown}/>}
                          renderOption={(option) => option.label}
                          clearOnEscape={true}
                          onChange={handleUnitSelect}
                          value={inputs.unit}
                          inputValue={inputs.unitInputValue}
                          tabIndex={2}
            />
        </Grid>
        <Grid item xs={3}>
            <Autocomplete options={ingredientOptions} getOptionLabel={(option) => option.label || ''}
                          renderInput={(params) => <TextField fullWidth margin="dense" label="Ingredient" {...params}
                                                              size="small"
                                                              onChange={handleIngredientInputChange}
                                                              onKeyDown={handleIngredientKeyDown}/>}
                          renderOption={renderIngredientOption}
                          clearOnEscape={true}
                          onChange={handleIngredientSelect}
                          value={inputs.ingredient}
                          inputValue={inputs.ingredientInputValue}
                          tabIndex={3}
            />
        </Grid>
        <Grid item xs={3}>
            <TextField type="text" label="Comment" margin="dense" fullWidth size="small"
                       value={inputs.comment}
                       onChange={handleCommentChange}
                       onKeyDown={handleKeyDown}
                       tabIndex={4}/>
        </Grid>
        <Grid item sm={2} style={{textAlign: "center"}}>
            <IconButton size="small" onClick={handleSubmit} disabled={!isValid()}><CheckIcon/></IconButton>
            <ClickAwayListener onClickAway={() => setIsCanceling(false)}>
                <IconButton size="small" onClick={() => isCanceling ? onCancel() : setIsCanceling(true)}>
                    <CancelIcon color={isCanceling ? "error" : "inherit"}/>
                </IconButton>
            </ClickAwayListener>
        </Grid>
    </Grid>;
};

export default IngredientFormInputs;
