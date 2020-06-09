import React, {useState} from 'react';
import {IconButton} from "@material-ui/core";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const ConfirmIconButton = ({onConfirm, IconComponent, disabled}) => {
    const [isConfirming, setIsConfirming] = useState(false);

    const handleConfirm = () => {
        setIsConfirming(false);
        onConfirm();
    }

    return <ClickAwayListener onClickAway={() => setIsConfirming(false)}>
        <IconButton onClick={() => isConfirming ? handleConfirm() : setIsConfirming(true)} size="small" disabled={disabled}>
            <IconComponent color={isConfirming ? 'error' : 'inherit'}/>
        </IconButton>
    </ClickAwayListener>;
};

export default ConfirmIconButton;
