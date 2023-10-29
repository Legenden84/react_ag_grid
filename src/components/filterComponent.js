import React, { Component } from 'react';

class filterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: '',
        };
    }

    onDropdownChange = (event) => {
        this.setState({ currentValue: event.target.value });
        this.props.parentFilterInstance((instance) => {
            instance.onFloatingFilterChanged('equals', event.target.value);
        });
    };

    render() {
        const { filterOptions } = this.props;
        const { currentValue } = this.state;
        console.log("filter:this.props", this.props)
        return (
            <select value={currentValue} onChange={this.onDropdownChange}>
                <option value="">Select</option>
                {filterOptions.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    }
}

export default filterComponent;
