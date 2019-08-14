import React, { Component } from 'react';

class Button extends Component {
    render() {
        // key: 'hiragana' or 'betonamu'
        const { text, answerKey, onClick, isSelected, isCorrectAnswer, isAnswerCompleted } = this.props;
        let btnColorClass;
        if (isAnswerCompleted && isCorrectAnswer) {
            btnColorClass = 'btn-success';
        }
        else if (isSelected) {
            btnColorClass = 'btn-primary';
        }
        else {
            btnColorClass = 'btn-outline-primary';
        }
        return (
            <button
                className={`btn ${btnColorClass} m-2`}
                onClick={() => onClick(text, answerKey)}
            >
                {text}
            </button>
        )
    }
}

export default Button;