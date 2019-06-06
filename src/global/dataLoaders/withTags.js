import React from "react";
import {fetchTags} from "../eve";

export default (WrappedComponent) => class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
        };
    }

    componentDidMount() {
        if (!this.props.tags || this.props.tags.length === 0) {
            fetchTags().then(tags => this.setState({tags}));
        }
    }

    render() {
        return <WrappedComponent tags={this.state.tags} {...this.props}/>
    }
}