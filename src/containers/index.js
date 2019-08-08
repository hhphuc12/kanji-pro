import React, { Component } from 'react';
import { data } from '../data';
import { getRandomPositionArray, randomizeOneOrTwo } from '../helpers';
import Button from '../components/button';

class Index extends Component {
    constructor(props) {
        super(props);
        const posArray = getRandomPositionArray(data.length);
        const count = 0;
        const currentPair = data[posArray[count]];
        const selectedObject = randomizeOneOrTwo() === 1 ? currentPair.obj1 : currentPair.obj2;
        this.state = {
            posArray,
            count,
            currentPair,
            selectedObject,
            answerSelected: {},
        };
    }

    onButtonClick = (text, key) => {
        const { answerSelected, selectedObject, posArray } = this.state;
        const { hiragana, betonamu } = selectedObject;
        const newAnswerSelected = {...answerSelected, [key]: text};
        if (!newAnswerSelected.hiragana || !newAnswerSelected.betonamu) {
            this.setState({ answerSelected: newAnswerSelected });
        }
        else {
            if (newAnswerSelected.hiragana === hiragana && newAnswerSelected.betonamu === betonamu) {
                // answer correct
                console.log('Correct!');
            }
            // redirect to next question
            const count = ++this.state.count;
            const currentPair = data[posArray[count]];
            const newSelectedObject = randomizeOneOrTwo() === 1 ? currentPair.obj1 : currentPair.obj2;
            this.setState({
                count,
                currentPair,
                selectedObject: newSelectedObject,
                answerSelected: {},
            }, () => console.log(this.state.selectedObject));
        }
    }

    render() {
        const { currentPair, selectedObject, answerSelected } = this.state;
        const { hiragana, betonamu } = answerSelected;
        return (
            <div className="p-5">
                <p className="result text-center"><b>Correct/Complete/Total: 100/100/100</b></p>
                <p className="kanji text-center">{selectedObject.kanji}</p>
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column">
                        <Button
                            isSelected={currentPair.obj1.hiragana === hiragana}
                            text={currentPair.obj1.hiragana}
                            onClick={this.onButtonClick}
                            answerKey='hiragana'
                        />
                        <Button
                            isSelected={currentPair.obj2.hiragana === hiragana}
                            text={currentPair.obj2.hiragana}
                            onClick={this.onButtonClick}
                            answerKey='hiragana'
                        />
                        <br /><br />
                        <Button
                            isSelected={currentPair.obj1.betonamu === betonamu}
                            text={currentPair.obj1.betonamu}
                            onClick={this.onButtonClick}
                            answerKey='betonamu'
                        />
                        <Button
                            isSelected={currentPair.obj2.betonamu === betonamu}
                            text={currentPair.obj2.betonamu}
                            onClick={this.onButtonClick}
                            answerKey='betonamu'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Index;