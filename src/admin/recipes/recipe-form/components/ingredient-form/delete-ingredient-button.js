import React, {useState} from 'react';
import DeleteIcon from "@material-ui/icons/Delete";
import {IconButton} from "@material-ui/core";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const DeleteIngredientButton = ({onDelete}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    return <ClickAwayListener onClickAway={() => setIsDeleting(false)}>
        <IconButton onClick={() => isDeleting ? onDelete() : setIsDeleting(true)} size="small">
            <DeleteIcon color={isDeleting ? 'error' : 'inherit'}/>
        </IconButton>
    </ClickAwayListener>;
};

export default DeleteIngredientButton;
