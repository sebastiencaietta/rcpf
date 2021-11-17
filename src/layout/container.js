import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import MUIContainer from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    content: props => ({
        flexGrow: 1,
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        ...(props.justifyContent ? {justifyContent: props.justifyContent} : undefined),
    }),
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    [theme.breakpoints.up('md')]: {
        container: {display: 'flex'},
    }
}));

const Container = (props) => {
    const classes = useStyles(props);

    return <MUIContainer fixed className={classes.container}>
        <div className={classes.content}>
            {props.children}
        </div>
    </MUIContainer>;
};

export default Container;
