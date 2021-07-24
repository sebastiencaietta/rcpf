import React, {useEffect, useState} from "react";
import Layout from "../layout";
import {getRecipeBySlug} from "../repositories/recipes";
import RecipePage from './components/recipe-page'
import CircularProgress from "@material-ui/core/CircularProgress";
import Hero from "../global/components/hero";
import {fetchCategories, fetchTags} from "../global/eve";
import {getIngredientList} from "../repositories/ingredients";

const Component = (props) => {
    const [recipe, setRecipe] = useState({});
    const [tags, setTags] = useState([]);
    const [category, setCategory] = useState({});
    const [ingredients, setIngredients] = useState({});
    const [loading, setLoading] = useState(props.match.params.slug !== undefined);

    useEffect(() => {
        Promise.all([getRecipeBySlug(props.match.params.slug), fetchTags(), fetchCategories(), getIngredientList()])
            .then(([recipe, tags, categories, ingredients]) => {
                setCategory(categories.find(category => category.id === recipe.category));
                setTags(tags);
                setRecipe(recipe);

                const ingredientsById = {};
                ingredients.forEach(ingredient => ingredientsById[ingredient.id] = ingredient);
                setIngredients(ingredientsById);

                setLoading(false);
            })
    }, []);

    if (loading) {
        return <Layout>
            <div style={{display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress />
            </div>
        </Layout>;
    }

    return <Layout hero={<Hero title={recipe.title}
                               bg={recipe.hero && recipe.hero.url ? recipe.hero.url : recipe.thumbnail}
                               verticalPosition={recipe.hero && recipe.hero.verticalPosition ? recipe.hero.verticalPosition : undefined}/>}>
       <RecipePage recipe={recipe} tags={tags} category={category} ingredients={ingredients}/>
    </Layout>;
};

export default Component;
