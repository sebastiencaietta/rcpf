import Card from "./card";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    moreButtonIcon: {
        position: 'absolute',
        [theme.breakpoints.up('lg')]: {
            visibility: 'hidden',
        },
        zIndex: 2,
        top: theme.spacing(1),
        right: theme.spacing(1),
    },
    cardContainer: {
        position: 'relative',
        '&:hover $moreButtonIcon': {visibility: 'initial'},
    }
}));

const withMoreButton = (MoreButton) => {

    return ({link, image, title}) => {
        const classes = useStyles();

        return <div className={classes.cardContainer}>
            <div className={classes.moreButtonIcon}>
                <MoreButton />
            </div>
            <Card image={image} title={title} link={link}/>
        </div>
    }
}

export default withMoreButton;
