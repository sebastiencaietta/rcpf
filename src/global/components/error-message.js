import React from "react";
import {makeStyles} from "@material-ui/core";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles(theme => ({
    input: {
        marginBottom: theme.spacing(3),
    },
    errorBox: {
        color: theme.palette.error.light,
        border: '1px solid ' + theme.palette.error.dark,
        display: 'flex',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        borderRadius: '4px',
    },
    iconWrapper: {
        display: 'flex',
        opacity: 0.9,
        padding: '7px 0',
        fontSize: '22px',
        marginRight: '12px',
    },
    errorMessage: {
        display: 'flex',
        padding: '8px 0',
        flexDirection: 'column',
        justifyContent: 'center',
    }
}));

export default ({error}) => {
    const classes = useStyles();

    return <div className={classes.errorBox}>
        <div className={classes.iconWrapper}>
            <ErrorOutlineIcon/>
        </div>
        <div className={classes.errorMessage}>{error}</div>
    </div>
}
