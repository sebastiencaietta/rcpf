import React from 'react';
import Renderer from "../../global/components/RteRenderer";
import RecipeInformation from "./recipe-information";
import RecipeIngredientsBlock from "./recipe-ingredients-block";
import {makeStyles} from "@material-ui/core/styles";
import Source from "./source";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        borderTop: `1px solid ${theme.palette.text.secondary}`,
    },
    ingredients: {
        flex: '3 1 0',
        padding: theme.spacing(4),
    },
    separator: {
        flex: '0 1 auto',
        borderRight: `1px solid ${theme.palette.text.secondary}`,
        borderTop: `1px solid ${theme.palette.text.secondary}`,
    },
    description: {
        flex: '10 1 0',
        padding: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
        container: {
            flexDirection: 'row',
            alignItems: 'stretch',
        },
    }
}));

const RecipePage = ({recipe, tags, category, ingredients}) => {
    const classes = useStyles();

    const hasIngredients = () => {
        return recipe.ingredients !== undefined
            && recipe.ingredients.sections !== undefined
            && recipe.ingredients.sections.length > 0;
    }

    return <React.Fragment>
        <RecipeInformation recipe={recipe} tags={tags} category={category}/>
        {
            hasIngredients() ? <>
                    <div className={classes.container}>
                        <div className={classes.ingredients}>
                            <RecipeIngredientsBlock recipe={recipe} ingredients={ingredients}/>
                        </div>
                        <div className={classes.separator} />
                        <div className={classes.description}>
                            <Renderer raw={recipe.description}/>
                            <Source recipe={recipe}/>
                        </div>
                    </div>
                </>
                : <Renderer raw={recipe.description}/>
        }

    </React.Fragment>;
}

export default RecipePage;
