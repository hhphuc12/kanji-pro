import React, { Component } from 'react';

class Button extends Component {
    render() {
        // key: 'hiragana' or 'betonamu'
        const { text, answerKey, onClick, isSelected } = this.props;
        return (
            <button
                className={`btn ${isSelected ? 'btn-primary' : 'btn-outline-primary'} m-2`}
                onClick={() => onClick(text, answerKey)}
            >
                {text}
            </button>
        )
    }
}

export default Button;