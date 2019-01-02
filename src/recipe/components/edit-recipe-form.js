import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {fetchCategories, fetchRecipe, fetchTags} from '../../global/eve';
import {Multiselect} from 'react-widgets';

const renderMultiselect = ({input, data, valueField, textField}) =>
    <Multiselect {...input}
                 onBlur={() => input.onBlur()}
                 value={input.value || []}
                 data={data}
                 valueField={valueField}
                 textField={textField}
    />;

class EditRecipeForm extends React.Component {
    componentWillMount() {
        if (!this.props.recipe) {
            const {slug} = this.props.match.params;
            fetchRecipe(slug).then(recipe => this.props.initRecipe(recipe));
        }

        if (!this.props.categories.length) {
            fetchCategories().then(categories => this.props.initCategories(categories));
        }

        if (!this.props.tags.length) {
            fetchTags().then(tags => this.props.initTags(tags));
        }
    }

    render() {
        const {handleSubmit, categories, tags, pristine, reset, submitting} = this.props;

        return <form onSubmit={handleSubmit}>
            <Field id="id" name="id" component="input" type="hidden" />
            <div className="row">
                <div className="col-sm-6 col-md-3">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <Field id="title" name="title" component="input" type="text" className="form-control"/>
                    </div>
                </div>
                <div className="col-sm-6 col-md-3">
                    <div className="form-group">
                        <label htmlFor="slug">Slug</label>
                        <Field id="slug" name="slug" component="input" type="text" className="form-control"/>
                    </div>
                </div>

                <div className="col-sm-4 col-md-2">
                    <div className="form-group">
                        <label htmlFor="preparation_time">Prep time</label>
                        <div className="input-group">
                            <Field id="preparation_time" name="preparation_time" component="input" type="number"
                                   className="form-control"/>
                            <div className="input-group-append">
                                <span className="input-group-text">mins</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-md-2">
                    <div className="form-group">
                        <label htmlFor="cooking_time">Cooking time</label>
                        <div className="input-group">
                            <Field id="cooking_time" name="cooking_time" component="input" type="number"
                                   className="form-control"/>
                            <div className="input-group-append">
                                <span className="input-group-text">mins</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-md-2">
                    <div className="form-group">
                        <label htmlFor="feeds">Feeds</label>
                        <Field id="feeds" name="feeds" component="input" type="number" className="form-control"/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                        <label htmlFor="tags">Tags</label>
                        <Field
                            name="tags"
                            component={renderMultiselect}
                            data={tags}
                            valueField="id"
                            textField="title"
                            filter="contains"/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-4 col-md-3">
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <Field id="category" name="category_id" component="select" className="form-control">
                            {
                                categories.map((category) =>
                                    <option key={category.id} value={category.id}>{category.title}</option>)
                            }
                        </Field>
                    </div>
                </div>

                <div className="col-sm-4 col-md-5">
                    <div className="form-group">
                        <label htmlFor="link">Link</label>
                        <Field id="link" name="link" component="input" type="text" className="form-control"/>
                    </div>
                </div>
                <div className="col-sm-4 col-md-2">
                    <div className="form-group">
                        <label htmlFor="thumbnail">Thumbnail</label>
                        <Field id="thumbnail" disabled name="thumbnail" component="input" type="text" className="form-control"/>
                    </div>
                </div>
                <div className="col-sm-4 col-md-2">
                    <div className="form-group">
                        <label htmlFor="picture">Picture</label>
                        <Field id="picture" disabled name="picture" component="input" type="text" className="form-control"/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <Field id="description"
                               name="description"
                               component="textarea"
                               className="form-control"
                               rows="10"/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-6">
                    <button type="submit" disabled={pristine || submitting} className="btn btn-primary">
                        Submit
                    </button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}
                            className="btn btn-outline-warning">
                        Reset
                    </button>
                </div>
            </div>
        </form>
    }
}

export default reduxForm({form: 'edit-recipe'})(EditRecipeForm);
