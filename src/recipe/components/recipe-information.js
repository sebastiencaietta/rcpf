import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
    root: {margin: theme.spacing(0, 0, 3)},
    categoryTagsBox: {display: 'flex', justifyContent: 'space-around', margin: theme.spacing(0, 0, 3), flexWrap: 'wrap'},
    categoryBox: {marginBottom: theme.spacing(2)},
    tagBox: {display: "flex", flexWrap: "wrap", justifyContent: "center"},
    tag: {margin: theme.spacing(0, 1, 1, 0)},
    secondaryInformation: {display: 'flex', justifyContent: 'space-between', margin: theme.spacing(5, 0), alignItems: "center"},
    secondaryInformationBox: {width: '30%', textAlign: "center"},
    separatorBox: {width: '5%', display: 'flex', justifyContent: "center", alignItems: "center", alignSelf: 'stretch'},
    separator: {
        height: '75%',
        width: '2px',
        background: theme.palette.getContrastText(theme.palette.background.default),
        position: 'relative',
        transform: 'rotate(20deg)',
        '&:before': {
            width: 0,
            height: 0,
            borderLeft: '1px solid transparent',
            borderRight: '1px solid transparent',
            borderBottom: '2px solid ' + theme.palette.getContrastText(theme.palette.background.default),
            position: 'absolute',
            top: '-2px',
            left: 0,
            content: '" "',
        },
        '&:after': {
            width: 0,
            height: 0,
            borderLeft: '1px solid transparent',
            borderRight: '1px solid transparent',
            borderTop: '2px solid ' + theme.palette.getContrastText(theme.palette.background.default),
            position: 'absolute',
            bottom: '-2px',
            left: 0,
            content: '" "',
        },
        [theme.breakpoints.up('sm')]: {
            height: '100%',
            width: '4px',
            transform: 'rotate(45deg)',
            '&:before': {
                borderLeft: '2px solid transparent',
                borderRight: '2px solid transparent',
                borderBottom: '4px solid ' + theme.palette.getContrastText(theme.palette.background.default),
                top: '-4px',
            },
            '&:after': {
                borderLeft: '2px solid transparent',
                borderRight: '2px solid transparent',
                borderTop: '4px solid ' + theme.palette.getContrastText(theme.palette.background.default),
                bottom: '-4px',
            },
        }
    }
}));

const SecondaryInformation = ({classes, recipe}) => ((
    <div className={classes.secondaryInformation}>
        <div className={classes.secondaryInformationBox}>
            <Typography variant="h5">Pour</Typography>
            <Typography variant={"body1"} color={"secondary"}>
                {recipe.portionSize} {recipe.portionType}
            </Typography>
        </div>
        <div className={classes.separatorBox}>
            <div className={classes.separator}/>
        </div>
        <div className={classes.secondaryInformationBox}>
            <Typography variant="h5">Préparation</Typography>
            <Typography variant={"body1"} color={"secondary"}>
                {recipe.prepTime} minutes
            </Typography>
        </div>
        <div className={classes.separatorBox}>
            <div className={classes.separator}/>
        </div>
        <div className={classes.secondaryInformationBox}>
            <Typography variant="h5">Cuisson</Typography>
            <Typography variant={"body1"} color={"secondary"}>
                {recipe.cookingTime} minutes
            </Typography>
        </div>
    </div>
));

const RecipeInformation = ({recipe, category, tags}) => {
    const classes = useStyles();
    return <div className={classes.root}>

        <div className={classes.categoryTagsBox}>
            <span className={classes.categoryBox}>
                <Chip label={category.title} variant="outlined" color="secondary"/>
            </span>

            {!recipe.tags || recipe.tags.length === 0
                ? ''
                : <span className={classes.tagBox}>
                {
                    recipe.tags.map(recipeTag => tags.find(tag => recipeTag === tag.id)).map(
                        (tag, index) => <Chip label={tag.title} variant="outlined" color="secondary"
                                              className={classes.tag} key={index}/>)
                }
            </span>}

        </div>

        <hr style={{width: '50%'}}/>

        {
            recipe.portionSize && recipe.portionType && recipe.prepTime && recipe.cookingTime
                ? <>
                    <SecondaryInformation recipe={recipe} classes={classes}/>
                    <hr style={{width: '50%'}}/>
                </>
                : ""
        }

    </div>;
};

export default RecipeInformation;
