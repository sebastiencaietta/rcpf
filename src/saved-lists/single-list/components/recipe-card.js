import React from 'react';
import MoreButton from "../containers/more-button";
import withMoreButton from "../../../global/components/card-with-more-button";

const RecipeCard = ({id, link, image, title, currentListId}) => {
    const MoreButtonContainer = () => <MoreButton recipeId={id} listId={currentListId}/>

    return withMoreButton(MoreButtonContainer)({link, image, title});
}

export default RecipeCard;
