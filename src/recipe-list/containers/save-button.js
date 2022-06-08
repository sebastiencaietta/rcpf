import React from 'react';
import {useAuth} from "../../auth/use-auth";
import SaveButtonComponent from "../components/save-button";
import {
    addToFavorites,
    removeFromFavorites,
    addRecipeToList,
    addRecipeToNewList,
    removeRecipeFromList
} from "../../repositories/lists";

const SaveButton = ({recipeId, currentListId}) => {
    const auth = useAuth();

    if (auth.user.user.uid === undefined) {
        return '';
    }

    const userLists = auth.user.lists.filter(list => !list.deletedAt);

    if (userLists === undefined) {
        return '';
    }

    const listsRecipeIsIn = userLists.filter((userList) => {
        const recipesMap = userList.recipes;
        const recipeList = Object.keys(recipesMap);
        return recipeList.some(userListRecipe => userListRecipe === recipeId);
    });

    const handleAddToFavorites = () => {
        return addToFavorites(auth.user.user.uid, recipeId);
    }

    const handleRemoveFromFavorites = () => {
        return removeFromFavorites(auth.user.user.uid, recipeId);
    }

    const handleAddToList = (listId) => {
        return addRecipeToList(auth.user.user.uid, listId, recipeId)
    }

    const handleAddToNewList = (listName) => {
        return addRecipeToNewList(auth.user.user.uid, listName, recipeId);
    }

    const handleRemoveFromList = currentListId ? () => {
        return removeRecipeFromList(auth.user.user.uid, currentListId, recipeId);
    } : undefined;

    return (
        <SaveButtonComponent
            listsRecipeIsIn={listsRecipeIsIn}
            onSaveToFavourites={handleAddToFavorites}
            onRemoveFromFavourites={handleRemoveFromFavorites}
            onSaveToList={handleAddToList}
            onSaveToNewList={handleAddToNewList}
            onRemoveFromList={handleRemoveFromList}
            lists={userLists}
        />
    );
};

export default SaveButton;
