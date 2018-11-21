import React from 'react';

export default class RadioFilter extends React.Component {
    render() {
        const {title, id, onChange, checked, name} = this.props;

        return (
            <label htmlFor={`filter-${id}`}>
                <input type="radio" name={name} onChange={onChange} id={`filter-${id}`} checked={checked}/>
                {title}
            </label>
        )
    }
}
