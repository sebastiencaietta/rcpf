import React from 'react';
import Typography from "@material-ui/core/Typography";
import {DIETS} from "../../../global/constants/diets";
import {SEASONS} from "../../../global/constants/seasons";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        cursor: "pointer",
        textAlign: "center",
    },
    title: {
        margin: theme.spacing(4, 0),
    }
}));

const LabelSelect = ({onSelectDiet, onSelectSeason}) => {
    const diets = Object.keys(DIETS).map(diet => DIETS[diet].name);
    const seasons = Object.keys(SEASONS).map(season => SEASONS[season].name);
    const classes = useStyles();

    return <>
        <Typography variant="h4" className={classes.title}>
            Régimes
        </Typography>
        <Grid container spacing={3}>
            {
                diets.map(diet => <Grid item xs={12} sm={6} md={3} key={diet} onClick={() => onSelectDiet(diet)}>
                    <Paper className={classes.paper}>{diet}</Paper>
                </Grid>)
            }
        </Grid>
        <Typography variant="h4" className={classes.title}>
            Saisons
        </Typography>
        <Grid container spacing={3}>
            {
                seasons.map(season => <Grid item xs={12} sm={6} md={3} key={season}
                                            onClick={() => onSelectSeason(season)}>
                    <Paper className={classes.paper}>{season}</Paper>
                </Grid>)
            }
        </Grid>
    </>
}

export default LabelSelect;
