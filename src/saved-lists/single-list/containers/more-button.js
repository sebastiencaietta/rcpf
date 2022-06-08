import React from 'react';
import SaveButton from "../../../recipe-list/containers/save-button";
import {useAuth} from "../../../auth/use-auth";

const MoreButton = ({recipeId, listId}) => {
    const auth = useAuth();

    const userLists = auth.user.lists;

    if (userLists === undefined) {
        return '';
    }

    return <SaveButton recipeId={recipeId} currentListId={listId} />
}

export default MoreButton;
