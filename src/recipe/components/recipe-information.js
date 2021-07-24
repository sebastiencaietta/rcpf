import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch',
        margin: theme.spacing(0, 0, 2),
    },
    categoryTagsBox: {display: 'flex', flex: '4 0 auto', justifyContent: 'space-evenly', marginTop: theme.spacing(2), flexWrap: 'wrap'},
    secondaryInformation: {display: 'flex', justifyContent: 'space-between', alignItems: "stretch", flex: "1 0 auto"},
    secondaryInformationBox: {flex: '0 1 auto', padding: theme.spacing(1)},
    tag: {margin: theme.spacing(1, 0, 0)},
    separator: {flex: '0 1 auto', borderRight: '1px solid ' + theme.palette.text.hint},
    [theme.breakpoints.up('md')]: {
        root: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        categoryTagsBox: {
            justifyContent: 'flex-end',
            marginTop: 0,
            flexWrap: 'noWrap',
        },
        tag: {margin: theme.spacing(0, 1, 0, 0)},
        secondaryInformationBox: {paddingLeft: theme.spacing(1)},
    }
}));

const SecondaryInformation = ({classes, recipe}) => ((
    <div className={classes.secondaryInformation}>
        <div className={classes.secondaryInformationBox}>
            <Typography variant="body2">Pour</Typography>
            <Typography variant={"body1"} color={"secondary"}>
                {recipe.portionSize} {recipe.portionType}
            </Typography>
        </div>
        <div className={classes.separator}/>
        <div className={classes.secondaryInformationBox}>
            <Typography variant="body2">Préparation</Typography>
            <Typography variant={"body1"} color={"secondary"}>
                {recipe.prepTime} minutes
            </Typography>
        </div>
        <div className={classes.separator}/>
        <div className={classes.secondaryInformationBox}>
            <Typography variant="body2">Cuisson</Typography>
            <Typography variant={"body1"} color={"secondary"}>
                {recipe.cookingTime} minutes
            </Typography>
        </div>
    </div>
));

const RecipeInformation = ({recipe, category, tags}) => {
    const classes = useStyles();
    return <div className={classes.root}>

        {
            recipe.portionSize && recipe.portionType && recipe.prepTime && recipe.cookingTime
                ? <>
                    <SecondaryInformation recipe={recipe} classes={classes}/>
                </>
                : ""
        }

        <div className={classes.categoryTagsBox}>
            <Chip label={category.title} className={classes.tag} variant="outlined" color="secondary"/>

            {!recipe.tags || recipe.tags.length === 0
                ? ''
                :
                recipe.tags.map(recipeTag => tags.find(tag => recipeTag === tag.id)).map(
                    (tag, index) => <Chip label={tag.title} variant="outlined" color="secondary"
                                          className={classes.tag} key={index}/>)
                }
        </div>

    </div>;
};

export default RecipeInformation;
