import React from 'react';
import PropTypes from 'prop-types';
import {fetchCategories, fetchTags} from '../../global/eve';
import CheckboxFilter from './checkbox-filter';
import RadioFilter from './radio-filter';
import '../styles/filters.css';

export default class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.updateSearch = this.updateSearch.bind(this);
        this.toggleTag = this.toggleTag.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
    }

    updateSearch(e) {
        this.props.updateSearch(e.target.value);
    }

    toggleTag(id) {
        this.props.toggleTag(id);
    }

    toggleCategory(id) {
        this.props.toggleCategory(id);
    }

    resetFilters() {
        this.props.resetFilters();
    }

    componentWillMount() {
        const {initTags, initCategories} = this.props;

        Promise.all([fetchTags(initTags), fetchCategories(initCategories)]).then(([tags, categories]) => {
            initTags(tags);
            initCategories(categories);
        });
    }

    render() {
        const {tags = [], categories = [], filters} = this.props;
        const {search} = filters;
        return (
            <div>
                <input type="text" name="search" value={search} onChange={this.updateSearch}/>
                <ul>
                    {tags.map(tag => (
                        <li key={tag.id}>
                            <CheckboxFilter onChange={() => this.toggleTag(tag.id)}
                                            title={tag.title}
                                            id={tag.id}
                                            name="filters-tag"
                                            checked={filters.tags.some((id) => tag.id === id)}
                            />
                        </li>
                    ))}
                </ul>

                <ul>
                    {categories.map(category => (
                        <li key={category.id}>
                            <RadioFilter title={category.title}
                                         id={category.id}
                                         onChange={() => this.toggleCategory(category.id)}
                                         checked={category.id === filters.category}
                                         name="filters-category"
                            />
                        </li>
                    ))}
                </ul>

                <button onClick={this.resetFilters} className="btn btn-outline-warning">
                    Reset
                </button>
            </div>
        )

    }
}

Filters.propTypes = {
    filters: PropTypes.object,
};

Filters.defaultProps = {
    filters: {
        search: '',
    },
};
