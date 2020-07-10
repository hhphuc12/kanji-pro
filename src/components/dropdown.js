import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';

class CustomDropdown extends Component {
    state = {
        currentItem: 'Select a type...',
    }

    onSelect = key => {
        this.props.onChange(key);
        this.setState({ currentItem: key });
    }

    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="outline-primary">
                    { this.state.currentItem }
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        this.props.items.map((item, index) => (
                            <Dropdown.Item
                                onSelect={this.onSelect}
                                eventKey={item}
                                key={index}
                            >
                                { item }
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default CustomDropdown;
