import React from 'react';
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    heroBox: props => ({
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        position: 'relative',
        color: theme.palette.text.primary,
        backgroundImage: 'url("' + props.bg + '")',
        height: '30vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
            content: '" "',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.2987570028011205) 0%, rgba(0,0,0,0.5) 27%, rgba(0,0,0,0.5) 73%, rgba(0,0,0,0.3) 100%);',
            zIndex: 1,
        },
        [theme.breakpoints.up('lg')]: {
            height: '40vh',
            backgroundPosition: `center ${props.verticalPosition || '69'}%`,
        }
    }),
    title: {
        zIndex: 2,
        color: '#fff',
        fontSize: '3rem',
        textAlign: 'center',
        [theme.breakpoints.up('lg')]: {fontSize: '3.5rem'},
    },
}));

const Hero = (props) => {
    const classes = useStyles(props);

    return <Box className={classes.heroBox}>
        <Typography variant="h1" className={classes.title}>{props.title}</Typography>
    </Box>
};

export default Hero;
