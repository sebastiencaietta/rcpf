import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {PALETTE_TYPE_DARK} from "../global/theme-settings";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    footerRoot: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(4),
        marginTop: theme.spacing(10),
        backgroundColor: theme.palette.type === PALETTE_TYPE_DARK ? '#212121' : theme.palette.background.paper,
    },
    love: {textAlign: "right"},
    heart: {verticalAlign: 'top'},
}));

const Footer = () => {
    const classes = useStyles();

    return <div className={classes.footerRoot}>
        <Container fixed>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="body2">Copyright© 2020 Sebastien Caietta</Typography>
                </Grid>
                <Grid item xs={6} className={classes.love}>
                    <Typography variant="body2">
                        Made with <FavoriteIcon fontSize="small" size="small" color="primary" className={classes.heart}/> using <Link href="https://material-ui.com/" target="_blank" rel="noreferrer">Material-UI</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    </div>
};

export default Footer;
