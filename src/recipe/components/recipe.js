import React from 'react';
import {fetchRecipe} from '../../global/eve';
import {Loading} from '../../global/components/loading';
import {Link} from 'react-router-dom';

export default class Recipe extends React.Component {
    componentWillMount() {
        const {slug} = this.props.match.params;
        fetchRecipe(slug).then(recipe => this.props.initRecipe(recipe));
    }

    render() {
        const {recipe} = this.props;

        if (!recipe) {
            return <Loading />
        }

        return <div className="row">
            <div className="col-sm-11"><h2>{recipe.title}</h2></div>
            <div className="col-sm-1">
                <Link to={`/recipes/${recipe.slug}/edit`} className='btn btn-outline-primary'>Edit</Link>
            </div>

        </div>
    }
}
