import {connect} from 'react-redux';
import Filters from '../components/filters';
import {TAGS_RECEIVED} from '../types/tags';
import {CATEGORIES_RECEIVED} from '../types/categories';
import {RESET_FILTERS, TOGGLE_CATEGORY, TOGGLE_TAG, UPDATE_SEARCH} from '../types/filters';


const mapStateToProps = state => ({
    categories: state.categories,
    tags: state.tags,
    filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
    initTags: tags => dispatch({type: TAGS_RECEIVED, payload: tags}),
    initCategories: categories => dispatch({type: CATEGORIES_RECEIVED, payload: categories}),
    updateSearch: value => dispatch({type: UPDATE_SEARCH, payload: value}),
    toggleCategory: id => dispatch({type: TOGGLE_CATEGORY, payload: id}),
    toggleTag: id => dispatch({type: TOGGLE_TAG, payload: id}),
    resetFilters: () => dispatch({type: RESET_FILTERS}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
