import React from 'react';

export default class CheckboxFilter extends React.Component {
    render() {
        const {title, id, onChange, name, checked} = this.props;

        return (
            <label htmlFor={`${name}-${id}`}>
                <input type="checkbox" onChange={onChange} id={`${name}-${id}`} checked={checked}/>
                {title}
            </label>
        )
    }
}
