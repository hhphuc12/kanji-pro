import React, { Component } from 'react';

class ContentButton extends Component {
    render() {
        const { isActive, onPress, text } = this.props;

        return (
            <button
                className={`btn ${isActive ? 'btn-primary' : 'btn-outline-primary'} mr-2`}
                onClick={onPress}
            >
                {text}
            </button>
        )
    }
}

export default ContentButton;