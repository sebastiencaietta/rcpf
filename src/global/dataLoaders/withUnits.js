import React from "react";
import {fetchUnits} from "../eve";

export default (WrappedComponent) => class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            units: [],
        };
    }

    componentDidMount() {
        if (!this.props.units || this.props.units.length === 0) {
            fetchUnits().then(units => this.setState({units}));
        }
    }

    render() {
        return <WrappedComponent units={this.state.units} {...this.props}/>
    }
}