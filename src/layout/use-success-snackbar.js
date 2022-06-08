import React, {createContext, useContext, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";

const successContext = createContext({});

const useStyles = makeStyles(() => ({
    success: {
        backgroundColor: green[600],
    },
    snackbar: {
        visibility: 'visible',
    }
}));

export function ProviderSuccessSnackbar({children}) {
    const successSnackbar = useProvideSuccessSnackbar();
    const classes = useStyles();

    return <successContext.Provider value={successSnackbar}>
        {children}

        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            open={successSnackbar.isOpen}
            autoHideDuration={2000}
            onClose={successSnackbar.handleClose}
            className={classes.snackbar}
        >
            <SnackbarContent
                aria-describedby="message-id"
                className={classes.success}
                message={<span id="message-id">{successSnackbar.message}</span>}
            />
        </Snackbar>
    </successContext.Provider>
}

export const useSuccessSnackbar = () => {
    return useContext(successContext);
}


const useProvideSuccessSnackbar = () => {
    const [message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    }

    const open = (message) => {
        setMessage(message);
        setIsOpen(true);
    }

    return {
        open,
        isOpen,
        message,
        handleClose
    }
}
