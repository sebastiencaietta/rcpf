import React from 'react';
import SaveButton from "../containers/save-button";
import withMoreButton from "../../global/components/card-with-more-button";

const RecipeCard = ({id, link, image, title}) => {
    const SaveToFavourites = () => <SaveButton recipeId={id} />

    return withMoreButton(SaveToFavourites)({link, image, title});
}

export default RecipeCard;
