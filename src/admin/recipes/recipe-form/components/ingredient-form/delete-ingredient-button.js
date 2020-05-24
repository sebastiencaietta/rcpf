import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete"
import CancelIcon from "@material-ui/icons/Cancel"
import {makeStyles} from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {IconButton} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    buttonsWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
}))

const DeleteIngredientButton = ({index, onDelete}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const classes = useStyles();

    function handleDeleteClick() {
        onDelete(index);
    }

    return <>
        {showConfirm ? <div className={classes.buttonsWrapper}>
                <ButtonGroup disableElevation variant="outlined" size="small">
                    <Button startIcon={<DeleteIcon/>} onClick={handleDeleteClick}>Confirm</Button>
                    <Button onClick={() => setShowConfirm(false)} size={"small"}>
                        <CancelIcon/>
                    </Button>
                </ButtonGroup>
            </div>
            : <IconButton onClick={() => setShowConfirm(true)} size="small">
                <DeleteIcon/>
            </IconButton>
        }

    </>;
};

export default DeleteIngredientButton;
