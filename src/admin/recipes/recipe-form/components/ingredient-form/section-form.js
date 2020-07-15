import React, {useEffect, useRef, useState} from 'react';
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import CheckIcon from '@material-ui/icons/Check';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete";
import IngredientFormInputs from "./ingredient-form-inputs";
import {makeStyles} from "@material-ui/core/styles";
import IngredientList from "./ingredient-list";
import CancelIcon from "@material-ui/icons/Clear";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles(theme => ({
    editButton: {
        display: 'none',
    },
    titleWrapper: {
        display: 'flex',
        alignItems: 'center',
        '&:hover $editButton': {
            display: 'initial',
        }
    },
    titleInput: {
        margin: '0.83rem 0',
        fontSize: '1.5em',
    },
    title: {
        marginRight: theme.spacing(3),
        cursor: "pointer",
    },
    ingredientList: {
        paddingLeft: theme.spacing(3),
        margin: theme.spacing(2, 0),
    },
    addIngredientWrapper: {
        paddingLeft: theme.spacing(3),
        margin: theme.spacing(2, 0),
    },
    sectionFormRoot: {
        marginBottom: theme.spacing(4),
    }
}));

const SectionForm = ({onSectionChange, ingredientOptions, ingredientsById, defaultSection, section, onCancel}) => {
    const [data, setData] = useState({title: '', ingredients: []});
    const [isEditingTitle, setIsEditingTitle] = useState(true);
    const [isAddingIngredient, setIsAddingIngredient] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const addIngredientRef = useRef(null);
    const prevIsAddingIngredientRef = useRef(false);
    const prevIsAddingIngredient = prevIsAddingIngredientRef.current;
    const classes = useStyles();

    useEffect(() => {
        if (defaultSection) {
            const newSectionData = {...data, title: 'Ingrédients'};
            setData(newSectionData);
            setIsEditingTitle(false);
        }

        if (section.title !== '') {
            setIsEditingTitle(false);
        }
    }, [defaultSection]);

    useEffect(() => {
        if (section.ingredients === undefined || section.ingredients.length === 0) {
            return;
        }

        setData({...section});
    }, [section]);

    useEffect(() => {
        prevIsAddingIngredientRef.current = isAddingIngredient;
    });

    useEffect(() => {
        if (prevIsAddingIngredient === true && !isAddingIngredient) {
            addIngredientRef.current.focus();
        }
    }, [isAddingIngredient]);

    function handleTitleEnterKeyPress(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSubmitTitle();
            return false;
        }
    }

    function handleTitleChange(e) {
        setData({...data, title: e.target.value});
    }

    function handleSubmitTitle() {
        setIsEditingTitle(false);
        onSectionChange(data);
    }

    function handleAddIngredient(newIngredient) {
        const newSectionData = {...data, ingredients: [...data.ingredients, newIngredient]};
        setData(newSectionData);
        setIsAddingIngredient(false);
        onSectionChange(newSectionData);
    }

    function handleIngredientListChange(ingredients) {
        const newSectionData = {...data, ingredients};
        setData(newSectionData);
        onSectionChange(newSectionData);
    }

    function handleCancelAddIngredient() {
        setIsAddingIngredient(false);
    }

    function handleSectionDeleteClick(e) {
        e.stopPropagation();
        isCanceling ? onCancel() : setIsCanceling(true);
    }

    return <div className={classes.sectionFormRoot}>
        <div>
            {
                isEditingTitle
                    ? <>
                        <Input type="text" value={data.title} onChange={handleTitleChange}
                               onKeyDown={handleTitleEnterKeyPress}
                               placeholder="Titre de la section"
                               className={classes.titleInput}/>
                        <IconButton onClick={handleSubmitTitle} size="small">
                            <CheckIcon/>
                        </IconButton>
                        {
                            defaultSection
                                ? ''
                                : <ClickAwayListener onClickAway={() => setIsCanceling(false)}>
                                    <IconButton size="small" onClick={() => isCanceling ? onCancel() : setIsCanceling(true)}>
                                        <CancelIcon color={isCanceling ? "error" : "inherit"}/>
                                    </IconButton>
                                </ClickAwayListener>
                        }
                    </>
                    : <h2 className={classes.titleWrapper} onClick={() => setIsEditingTitle(true)}>
                        <span className={classes.title}>{data.title}</span>
                        <IconButton size="small" className={classes.editButton}>
                            <EditIcon/>
                        </IconButton>
                        {
                            defaultSection
                                ? ''
                                : <ClickAwayListener onClickAway={() => setIsCanceling(false)}>
                                    <IconButton size="small"
                                                onClick={handleSectionDeleteClick}
                                                className={classes.editButton}>
                                        <DeleteIcon color={isCanceling ? "error" : "inherit"}/>
                                    </IconButton>
                                </ClickAwayListener>
                        }
                    </h2>
            }


        </div>

        <div className={classes.ingredientList}>
            {
                data.ingredients.length > 0
                    ? <IngredientList ingredients={data.ingredients} ingredientsById={ingredientsById}
                                      ingredientOptions={ingredientOptions}
                                      onIngredientsChange={handleIngredientListChange}/>
                    : ''
            }
        </div>

        <div className={classes.addIngredientWrapper}>
            {
                isAddingIngredient
                    ? <IngredientFormInputs ingredientOptions={ingredientOptions}
                                            onSubmit={handleAddIngredient}
                                            onCancel={handleCancelAddIngredient}/>
                    : <Button variant={"contained"} color="primary" size="small" startIcon={<AddIcon/>}
                              onClick={() => setIsAddingIngredient(true)} ref={addIngredientRef}>
                        Ingrédient
                    </Button>
            }
        </div>
    </div>
}

export default SectionForm;
