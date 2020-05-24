import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IngredientFormInputs from "./ingredient-form-inputs";

const formInitialState = {
    ingredient: null,
    quantity: '',
    unit: null,
    comment: '',
    substituteIngredients: [],
};

const AddIngredientForm = ({ingredientOptions, onAddIngredient, ingredient, savedIngredient}) => {
    const [form, setForm] = useState({...formInitialState, ...ingredient});
    const [formState, setFormState] = useState({valid: false, subs: []});
    const [predefinedValues, setPredefinedValues] = useState(undefined);

    useEffect(() => {
        if (savedIngredient === undefined) {
            return;
        }
        setPredefinedValues({
            ...formInitialState,
            ingredient: savedIngredient.ingredient,
            quantity: savedIngredient.quantity,
            unit: savedIngredient.unit,
            comment: savedIngredient.comment
        });
    }, [savedIngredient]);

    const replaceSubstituteIngredient = (index, subIngredient) => [
        ...form.substituteIngredients.slice(0, index),
        subIngredient,
        ...form.substituteIngredients.slice(index + 1, form.substituteIngredients.length),
    ];

    function handleAddSubstituteIngredient() {
        setForm({
            ...form,
            substituteIngredients: [
                ...form.substituteIngredients,
                {
                    ingredient: null,
                    quantity: '',
                    unit: null,
                    comment: '',
                },
            ],
        });
    }

    function handleSubmit() {
        const newIngredient = {
            ingredientId: form.ingredient,
            quantity: parseInt(form.quantity),
            unit: form.unit,
            comment: form.comment,
            substituteIngredients: form.substituteIngredients.map(subIngredient => ({
                ingredientId: subIngredient.ingredient,
                quantity: parseInt(subIngredient.quantity),
                unit: subIngredient.unit,
                comment: subIngredient.comment,
            })),
        };
        setForm({...formInitialState});
        setPredefinedValues({...formInitialState});
        onAddIngredient(newIngredient);
    }

    const isFormValid = () => {
        return formState.valid && formState.subs.every(state => state.valid === true);
    };

    function handleFormStateChange() {

    }

    function onFieldChange(field, value) {
        setForm({...form, [field]: value});
    }

    function onSubstituteFieldChange(index, field, value) {
        const substituteIngredient = form.substituteIngredients[index];
        const substituteIngredients = replaceSubstituteIngredient(index, {...substituteIngredient, [field]: value});
        setForm({...form, substituteIngredients});
    }

    function handleCancelSubIngredient(index) {
        setForm({
            ...form,
            substituteIngredients: [
                ...form.substituteIngredients.slice(0, index),
                ...form.substituteIngredients.slice(index + 1, form.substituteIngredients.length),
            ],
        });
    }

    return <>
        <Grid container item xs={11}>
            <Grid container justify={"space-evenly"} direction="column">
                <IngredientFormInputs onQuantityChange={(quantity) => onFieldChange('quantity', quantity)}
                                      onIngredientChange={(ingredient) => onFieldChange('ingredient', ingredient)}
                                      onUnitChange={(unit) => onFieldChange('unit', unit)}
                                      onCommentChange={(comment) => onFieldChange('comment', comment)}
                                      ingredientOptions={ingredientOptions}
                                      predefinedValues={predefinedValues}
                                      isSub={false}/>
                {form.substituteIngredients.map((substituteIngredient, index) =>
                    <IngredientFormInputs key={index}
                                          onQuantityChange={(quantity) => onSubstituteFieldChange(index, 'quantity', quantity)}
                                          onIngredientChange={(ingredient) => onSubstituteFieldChange(index, 'ingredient', ingredient)}
                                          onUnitChange={(unit) => onSubstituteFieldChange(index, 'unit', unit)}
                                          onCommentChange={(comment) => onSubstituteFieldChange(index, 'comment', comment)}
                                          ingredientOptions={ingredientOptions}
                                          onCancelSubIngredient={() => handleCancelSubIngredient(index)}
                                          isSub={true}
                    />
                )}
                <Button size="small" onClick={handleAddSubstituteIngredient}>Add substitute ingredient</Button>
            </Grid>
        </Grid>
        <Grid container item xs={1}>
            <IconButton aria-label="add"
                        disabled={!isFormValid()}
                        title="Add ingredient"
                        color="primary"
                        onClick={handleSubmit}
                        style={{borderRadius: 0}}>
                <AddCircleIcon/>
            </IconButton>
        </Grid>
    </>;
};

export default AddIngredientForm;
