import React, {useEffect, useState} from "react";
import Layout from "../layout";
import {getRecipeBySlug} from "../repositories/recipes";
import RecipePage from './components/recipe-page'
import CircularProgress from "@material-ui/core/CircularProgress";
import Hero from "../global/components/hero";
import {fetchCategories, fetchTags} from "../global/eve";
import {getIngredientList} from "../repositories/ingredients";
import {Helmet} from 'react-helmet-async';
import Container from "../layout/container";
import useStayAwake from "../vendor/use-stay-awake";

const Component = (props) => {
    const [recipe, setRecipe] = useState({});
    const [tags, setTags] = useState([]);
    const [category, setCategory] = useState({});
    const [ingredients, setIngredients] = useState({});
    const [loading, setLoading] = useState(props.match.params.slug !== undefined);
    const stayAwake = useStayAwake();

    useEffect(() => {
        stayAwake.preventSleeping();

        return () => {
            if (!stayAwake.canSleep) {
                stayAwake.allowSleeping()
            }
        };
    }, [stayAwake]);

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
    }, [props.match.params.slug]);

    if (loading) {
        return <Layout>
            <Container justifyContent="center">
                <CircularProgress />
            </Container>
        </Layout>;
    }

    return <Layout hero={<Hero title={recipe.title}
                               bg={recipe.hero && recipe.hero.url ? recipe.hero.url : recipe.thumbnail}
                               verticalPosition={recipe.hero && recipe.hero.verticalPosition ? recipe.hero.verticalPosition : undefined}/>}>
        <Helmet>
            <title>CookMate | {recipe.title}</title>
        </Helmet>
        <Container>
            <RecipePage recipe={recipe} tags={tags} category={category} ingredients={ingredients}/>
        </Container>
    </Layout>;
};

export default Component;
