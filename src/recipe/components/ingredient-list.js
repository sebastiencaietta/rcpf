import React from 'react';

export default (props) => {
    const {ingredients} = props;

    return ingredients ?
        ingredients.map(ingredient => (
            <p>{ingredient.name} x {ingredient.quantity}</p>
        ))
        : false;
}