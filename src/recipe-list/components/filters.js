import React from 'react';
import {eve} from '../../global/eve';
import CheckboxFilter from './checkbox-filter';
import RadioFilter from './radio-filter';

const fetchTags = async (initTags) => {
    const response = await eve.get('/tags');
    initTags(response.data);
};

const fetchCategories = async initCategories => {
    const response = await eve.get('/categories');
    initCategories(response.data);
};

export default class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.updateSearch = this.updateSearch.bind(this);
        this.toggleTag = this.toggleTag.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
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

    componentWillMount() {
        const {initTags, initCategories} = this.props;

        Promise.all([fetchTags(initTags), fetchCategories(initCategories)]).then(() => {
            console.log('all fetched');
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
                            <CheckboxFilter onChange={() => this.toggleTag(tag.id)} title={tag.title} id={tag.id} />
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
            </div>
        )

    }
}
