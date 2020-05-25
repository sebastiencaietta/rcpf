import React, {useEffect, useState} from 'react';
import {getIngredients} from "../../../../../repositories/ingredients";
import SectionForm from "./section-form";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

const IngredientsForm = ({savedRecipe, onIngredientsChange}) => {
    const [data, setData] = useState({sections: [{title: '', ingredients: []}]});
    const [ingredientOptions, setIngredientOptions] = useState([]);
    const [ingredientsById, setIngredientsById] = useState({});
    const [ingredientsPromise, setIngredientsPromise] = useState(new Promise(() => {
    }));

    useEffect(() => {
        const initIngredients = async () => {
            const savedIngredients = await getIngredients();
            setIngredientOptions(savedIngredients.map(ingredient => ({
                label: ingredient.name,
                value: ingredient.id,
                image: ingredient.thumbnail,
            })));
            const tmp = {};
            savedIngredients.forEach(ingredient => tmp[ingredient.id] = {
                name: ingredient.name,
                thumbnail: ingredient.thumbnail
            });
            setIngredientsById({...tmp});
        }

        const promise = initIngredients();
        setIngredientsPromise(promise);
        promise.then(() => setIngredientsPromise(promise));
    }, []);

    useEffect(() => {
        if (savedRecipe === undefined) {
            return;
        }

        if (savedRecipe.ingredients !== undefined) {
            ingredientsPromise.then(() => {
                setData({...savedRecipe.ingredients});
            });
        }
    }, [savedRecipe, ingredientsPromise])

    function handleSectionChange(index, section) {
        data.sections[index] = section;
        setData({...data});
        onIngredientsChange({...data});
    }

    function handleAddSection() {
        setData({
            ...data,
            sections: [...data.sections, {title: '', ingredients: []}],
        });
    }

    function handleSectionDelete(index) {
        const dataWithDeletedSection = {
            ...data,
            sections: [
                ...data.sections.slice(0, index),
                ...data.sections.slice(index+1, data.sections.length),
            ],
        };
        setData(dataWithDeletedSection);
        onIngredientsChange(dataWithDeletedSection);
    }

    return <div>
        {
            data.sections.map((section, index) => <SectionForm key={index}
                                                               section={section}
                                                               onSectionChange={(section) => handleSectionChange(index, section)}
                                                               ingredientOptions={ingredientOptions}
                                                               ingredientsById={ingredientsById}
                                                               defaultSection={index === 0}
                                                               onCancel={() => handleSectionDelete(index)}/>)
        }

        <Button variant={"contained"} size="small" startIcon={<AddIcon/>}
                onClick={handleAddSection}>
            Section
        </Button>
    </div>;
}

export default IngredientsForm;
