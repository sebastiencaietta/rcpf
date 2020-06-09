import React from 'react';
import Renderer from "../../global/components/RteRenderer";
import RecipeInformation from "./recipe-information";
import Grid from "@material-ui/core/Grid";
import RecipeIngredientsBlock from "./recipe-ingredients-block";

export default function recipePage({recipe, tags, category, ingredients}) {

    const hasIngredients = () => {
        return recipe.ingredients !== undefined
            && recipe.ingredients.sections !== undefined
            && recipe.ingredients.sections.length > 0;
    }

    return <React.Fragment>
        <RecipeInformation recipe={recipe} tags={tags} category={category}/>

        {
            hasIngredients() ? <>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={5} md={4} xl={3}>
                            <RecipeIngredientsBlock recipe={recipe} ingredients={ingredients}/>
                        </Grid>
                        <Grid item xs={12} sm={7} md={8} xl={9}>
                            <Renderer raw={recipe.description}/>
                        </Grid>
                    </Grid>
                </>
                : <Renderer raw={recipe.description}/>
        }

    </React.Fragment>;
}
