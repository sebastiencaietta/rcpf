import React from 'react';
import IngredientListItem from "./ingredient-list-item";

const IngredientList = ({ingredients, onIngredientsChange, ingredientsById, ingredientOptions}) => {
    function handleMoveIngredientUp(index) {
        const newIngredients = [
            ...ingredients.slice(0, index - 1),
            ingredients[index],
            ingredients[index-1],
            ...ingredients.slice(index + 1, ingredients.length)
        ];
        onIngredientsChange(newIngredients);
    }

    function handleMoveIngredientDown(index) {
        const newIngredients = [...ingredients.slice(0, index),
            ingredients[index+1],
            ingredients[index],
            ...ingredients.slice(index + 2, ingredients.length)
        ];
        onIngredientsChange(newIngredients);
    }

    function handleDeleteIngredient(index) {
        const newIngredients = [...ingredients.slice(0, index), ...ingredients.slice(index + 1, ingredients.length)];
        onIngredientsChange(newIngredients);
    }

    function handleIngredientChange(index, newIngredientData) {
        ingredients[index] = newIngredientData;
        onIngredientsChange([...ingredients]);
    }

    return <div>
        {ingredients.map((ingredient, index) => (
            <IngredientListItem
                key={index}
                ingredient={ingredient}
                ingredientsById={ingredientsById}
                canMoveUp={index !== 0}
                canMoveDown={index !== ingredients.length - 1}
                onMoveUpClick={() => handleMoveIngredientUp(index)}
                onMoveDownClick={() => handleMoveIngredientDown(index)}
                onDelete={() => handleDeleteIngredient(index)}
                onIngredientChange={(newIngredientData) => handleIngredientChange(index, newIngredientData)}
                ingredientOptions={ingredientOptions}/>
        ))}
    </div>;
};

export default IngredientList;
