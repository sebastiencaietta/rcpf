import React from 'react';
import MoreButtonComponent from '../components/more-button';
import {useAuth} from "../../../auth/use-auth";
import {deleteList, renameList} from "../../../repositories/lists";
import {useSuccessSnackbar} from "../../../layout/use-success-snackbar";

const MoreButton = ({listId, listName}) => {
    const auth = useAuth();
    const successSnackbar = useSuccessSnackbar();

    if (auth.user.user.uid === undefined) {
        return '';
    }

    const userId = auth.user.user.uid;

    const handleDelete = async () => {
        await deleteList(userId, listId);
        successSnackbar.open('Liste supprimée')
    }

    const handleRename = async (newListName) => {
        await renameList(userId, listId, newListName);
        successSnackbar.open('Liste renommée')
    }

    return <MoreButtonComponent onDelete={handleDelete} onRename={handleRename} listName={listName}/>
}

export default MoreButton;
