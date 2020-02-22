import {connect} from "react-redux";
import Filters from '../components/filters';
import {TOGGLE_TAG, UPDATE_SEARCH} from "../types/filters";

const mapStateToProps = (state) => ({
    checked: state.filters.tags,
    search: state.filters.search,
});

const mapDispatchToProps = (dispatch) => ({
    onToggle: (tagId) => dispatch({type: TOGGLE_TAG, payload: tagId}),
    onSearch: (search) => dispatch({type: UPDATE_SEARCH, payload: search})
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
