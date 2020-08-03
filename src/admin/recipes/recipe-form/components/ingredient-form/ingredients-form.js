import React, {useEffect, useState} from 'react';
import {getIngredients} from "../../../../../repositories/ingredients";
import SectionForm from "./section-form";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const IngredientsForm = ({savedRecipe, onIngredientsChange}) => {
    const [data, setData] = useState({
        sections: [
            {title: '', ingredients: []}
        ],
        ...savedRecipe ? savedRecipe.ingredients : undefined,
    });

    const [ingredientOptions, setIngredientOptions] = useState([]);
    const [ingredientsById, setIngredientsById] = useState({});
    const [isLoading, setLoading] = useState(savedRecipe.ingredients !== undefined);

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
                thumbnail: ingredient.thumbnail,
                plural: ingredient.plural,
            });
            setIngredientsById({...tmp});
        }

        initIngredients().then(() => setLoading(false));
    }, []);

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

    if (isLoading) {
        return <div style={{display: 'flex', height: '90vh', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress />
        </div>;
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
