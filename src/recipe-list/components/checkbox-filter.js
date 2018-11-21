import React from 'react';

export default class CheckboxFilter extends React.Component {
    render() {
        const {title, id, onChange} = this.props;

        return (
            <label htmlFor={`filter-${id}`}>
                <input type="checkbox" onChange={onChange} id={`filter-${id}`}/>
                {title}
            </label>
        )
    }
}
