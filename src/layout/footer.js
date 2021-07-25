import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    footerRoot: {
        marginTop: theme.spacing(6),
        textAlign: 'center',
    },
    wrapper: {
        borderTop: `1px solid ${theme.palette.text.secondary}`,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    [theme.breakpoints.up('md')]: {
        footerRoot: {
            marginTop: theme.spacing(12),
        }
    }
}));

const Footer = () => {
    const classes = useStyles();

    return <div className={classes.footerRoot}>
        <Container fixed>
            <Grid container justifyContent="center">
                <Grid item xs={8}>
                    <div className={classes.wrapper}>
                        <Typography variant="body2">© Sebastien Caietta 2021</Typography>
                    </div>
                </Grid>
            </Grid>
        </Container>
    </div>
};

export default Footer;
