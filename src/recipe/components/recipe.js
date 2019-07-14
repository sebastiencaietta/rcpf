import React from 'react';
import {fetchCategories, fetchRecipe} from '../../global/eve';
import IngredientList from './ingredient-list';
import {Link} from 'react-router-dom';
import '../styles/recipe-page.css';

export default class Recipe extends React.Component {
    componentWillMount() {
        const {slug} = this.props.match.params;
        fetchRecipe(slug).then(recipe => this.props.initRecipe(recipe));

        if (!this.props.categories.length) {
            fetchCategories().then(categories => this.props.initCategories(categories));
        }
    }

    render() {
        const {recipe, categories} = this.props;

        return <div className="recipe-container">
            <div className="row">
                <div className="col-sm-11">
                    <h2>{recipe.title}</h2>
                </div>
                <div className="col-sm-1">
                    <Link to={`/recipes/${recipe.slug}/edit`} className='btn btn-outline-primary'>Edit</Link>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 col-md-4">
                    {/*Category*/}
                    <p>
                        {categories.find(category => category.id === recipe.category_id).title}
                    </p>
                    {/*Link*/}
                    {recipe.link ? <p>
                        <i className="fas fa-globe-europe" />
                        <a href={recipe.link}>Visit page</a>
                    </p> : false}
                    {/*Cooking / Prep time*/}
                    <div className="row text-center">
                        <div className="col-sm-4">
                            Prep time
                        </div>
                        <div className="col-sm-4">
                            Cooking time <i className="fas fa-knife-kitchen"/>
                        </div>
                        <div className="col-sm-4">
                            <i className="far fa-clock"/>
                        </div>
                        <div className="col-sm-4">
                            {recipe.preparation_time} mins
                        </div>
                        <div className="col-sm-4">
                            {recipe.cooking_time} mins
                        </div>
                        <div className="col-sm-4">
                            {recipe.cooking_time + recipe.preparation_time} mins
                        </div>
                    </div>
                    <div className="recipe__tags">
                        {recipe.tags.map((tag, index) => (<p key={index}>
                            <small>{tag.title}</small>
                        </p>))}
                    </div>
                    {/*Tags*/}
                    {/*Feeds*/}

                    <h4>Ingredients</h4>
                    <IngredientList ingredients={recipe.ingredients}/>
                </div>

                <div className="col-md-8">
                    <h4>Preparation</h4>

                    <p className="recipe__description">
                        {recipe.description}
                    </p>
                </div>
            </div>
        </div>
    }
}
