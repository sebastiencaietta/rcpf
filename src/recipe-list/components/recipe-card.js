import React from 'react';
import {Link} from 'react-router-dom';

export default ({recipe}) => (
    <div className="col-md-4 col-lg-3 recipe-wrapper">
        <Link to={`/recipes/${recipe.slug}`}>
            <div className="recipe-card">
                <div className="recipe-card__title">
                    <h5>{recipe.title}</h5>
                </div>
            </div>
        </Link>
    </div>
)
