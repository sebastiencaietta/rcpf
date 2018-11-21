import React from 'react';
import '../styles/recipe-card.css';

export default ({recipe}) => (
    <div className="col-md-4 col-lg-3 recipe-wrapper">
        <div className="recipe-card">
            <div className="recipe-card__title">
                <h5>{recipe.title}</h5>
            </div>

            <hr/>

            <div className="recipe-card__category">
                <p>
                    <small>{recipe.category.title}</small>
                </p>
            </div>

            <div className="recipe-card__tag_list">
                <p>
                    {
                        recipe.tags.map(tag => (
                            <span key={tag.id} className="recipe-card__tag"><small>{tag.title}</small></span>),
                        )
                    }
                </p>
            </div>
        </div>
    </div>
)
