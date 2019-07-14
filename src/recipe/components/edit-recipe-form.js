import React from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {fetchCategories, fetchRecipe} from '../../global/eve';
import {Multiselect} from 'react-widgets';
import {Link} from "react-router-dom";
import withTags from "../../global/dataLoaders/withTags";
import withUnits from "../../global/dataLoaders/withUnits";

const renderMultiselect = ({input, data, valueField, textField}) =>
    <Multiselect {...input}
                 onBlur={() => input.onBlur()}
                 value={input.value || []}
                 data={data}
                 valueField={valueField}
                 textField={textField}
    />;

const renderIngredients = ({fields, meta: {error, submitFailed}}) => {
    console.log(fields);
    return <ul>
        <li>
            <button type="button" onClick={() => fields.push({})}>
                Add Ingredient
            </button>
        </li>
        {fields.map((ingredient, index) => {
            console.log(ingredient);
            return <li key={index}>
                <li key={index}>
                    <button
                        type="button"
                        title="Remove Ingredient"
                        onClick={() => fields.remove(index)}
                    />
                    <h4>Ingredient #{index + 1}</h4>
                    <Field
                        name={`${ingredient}.name`}
                        type="text"
                        label="Name"
                        component="input" />
                </li>
            </li>
        })}
    </ul>
};

class EditRecipeForm extends React.Component {
    componentWillMount() {
        if (!this.props.recipe) {
            const {slug} = this.props.match.params;
            fetchRecipe(slug).then(recipe => this.props.initRecipe(recipe));
        }

        if (!this.props.categories.length) {
            fetchCategories().then(categories => this.props.initCategories(categories));
        }
    }

    render() {
        const {handleSubmit, categories, tags, pristine, reset, submitting, recipe} = this.props;

        return recipe ? <form className="recipe-container" onSubmit={handleSubmit}>
            <Field id="id" name="id" component="input" type="hidden" />
            <div className="row">
                <div className="col-sm-8 col-md-9">
                    <Field id="title" name="title" placeholder="title" component="input" type="text" className="form-control"/>
                </div>
                <div className="col-sm-4 col-md-3">
                    <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
                        <i className="fas fa-check-circle"/>
                    </button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}
                            className="btn btn-outline-warning">
                        <i className="fas fa-sync-alt" />
                    </button>
                    <Link to={`/recipes/${recipe.slug}`}>
                        <button type="button" className="btn btn-outline-danger">
                            <i className="fas fa-times-circle" />
                        </button>
                    </Link>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 col-md-4">
                    {/*Category*/}
                    <Field id="category" name="category_id" component="select" className="form-control">
                        {
                            categories.map((category) =>
                                <option key={category.id} value={category.id}>{category.title}</option>)
                        }
                    </Field>
                    {/*Link*/}
                    <div className="input-group">
                        <Field id="link" name="link" component="input" type="string" placeholder="Link"
                               className="form-control"/>
                        <div className="input-group-append">
                            <span className="input-group-text"><i className="fas fa-globe-europe" /></span>
                        </div>
                    </div>
                    {/*Cooking / Prep time*/}
                    <div className="row text-center">
                        <div className="col-sm-6">
                            <Field id="preparation_time" name="preparation_time" component="input" type="number"
                                   placeholder="Preparation time" className="form-control"/>
                            <div className="input-group-append">
                                <span className="input-group-text">mins</span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <Field id="cooking_time" name="cooking_time" component="input" type="number"
                                placeholder="Cooking time" className="form-control"/>
                            <div className="input-group-append">
                                <span className="input-group-text">mins</span>
                            </div>
                        </div>
                    </div>
                    {/*Tags*/}
                    <div className="recipe__tags">
                        <Field
                            name="tags"
                            component={renderMultiselect}
                            placeholder="Tags"
                            data={tags}
                            valueField="id"
                            textField="title"
                            filter="contains"/>
                    </div>

                    <h4>Ingredients</h4>
                    <FieldArray name={"ingredients"} component={renderIngredients} />
                </div>

                <div className="col-md-8">
                    <h4>Preparation</h4>

                    <p className="recipe__description">
                        <Field id="description"
                               name="description"
                               component="textarea"
                               className="form-control"
                               rows="10"/>
                    </p>
                </div>
            </div>
        </form> : null;
    }
}

const FormWithTags = withTags(EditRecipeForm);
const FormWithUnits = withUnits(FormWithTags);

export default reduxForm({form: 'edit-recipe'})(FormWithUnits);
