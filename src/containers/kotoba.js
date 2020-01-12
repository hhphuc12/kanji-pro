import React, { Component } from 'react';
import { data } from '../data/kotoba';
import { getRandomPositionArray, randomizeOneOrTwo } from '../helpers';
import Button from '../components/button';
import { ProgressBar } from 'react-bootstrap';
import SettingModal from './settingModal';

class Kotoba extends Component {
    constructor(props) {
        super(props);
        const posArray = getRandomPositionArray(data.length);
        const count = 0;
        const currentPair = data[posArray[count]];
        const selectedObject = randomizeOneOrTwo() === 1 ? currentPair.obj1 : currentPair.obj2;
        const randomizeHiraganaPos = randomizeOneOrTwo() === 1;
        const randomizeBetonamuPos = randomizeOneOrTwo() === 1;
        this.state = {
            posArray,
            count,
            currentPair,
            selectedObject,
            answerSelected: {},
            answerCorrect: false,
            answerCompleted: false,
            randomizeHiraganaPos,
            randomizeBetonamuPos,
            progressBarPercent: 0,
            isAnswerComplete: false,
            showModal: false,
            timeToReview: 10000,
        };
    }

    onButtonClick = (text, key) => {
        const { answerSelected, selectedObject, timeToReview } = this.state;
        const { hiragana, betonamu } = selectedObject;
        const newAnswerSelected = { ...answerSelected, [key]: text };
        this.setState({ answerSelected: newAnswerSelected });
        if (newAnswerSelected.hiragana === hiragana && newAnswerSelected.betonamu === betonamu) {
            this.setState({ answerCorrect: true });
        }
        // wait and redirect to next question
        if (newAnswerSelected.hiragana && newAnswerSelected.betonamu) {
            // display the correctly answer
            this.setState({ answerCompleted: true });
            this.progressInterval = setInterval(() => {
                const progressBarPercent = this.state.progressBarPercent + 100;
                this.setState({ progressBarPercent });
                if (progressBarPercent === Number(timeToReview)) {
                    this.onPressNext();
                }
            }, 100);
        }
    };

    onPressNext = callback => {
        clearInterval(this.progressInterval);
        const { posArray } = this.state;
        let { count } = this.state;
        count++;
        const currentPair = data[posArray[count]];
        const newSelectedObject = randomizeOneOrTwo() === 1 ? currentPair.obj1 : currentPair.obj2;
        const randomizeHiraganaPos = randomizeOneOrTwo() === 1;
        const randomizeBetonamuPos = randomizeOneOrTwo() === 1;
        this.setState({
            count,
            currentPair,
            selectedObject: newSelectedObject,
            answerSelected: {},
            answerCorrect: false,
            answerCompleted: false,
            randomizeHiraganaPos,
            randomizeBetonamuPos,
            progressBarPercent: 0,
        }, callback);
    };

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    onSettingTimeToReview = timeToReview => {
        this.setState({ timeToReview });
    }

    render() {
        const {
            currentPair,
            selectedObject,
            answerSelected,
            answerCorrect,
            answerCompleted,
            randomizeHiraganaPos,
            randomizeBetonamuPos,
            progressBarPercent,
            showModal,
            timeToReview,
        } = this.state;
        const { hiragana, betonamu } = answerSelected;
        const btnHiragana1 = (
            <Button
                isSelected={currentPair.obj1.hiragana === hiragana}
                isCorrectAnswer={currentPair.obj1.hiragana === selectedObject.hiragana}
                isAnswerCompleted={answerCompleted}
                text={currentPair.obj1.hiragana}
                onClick={this.onButtonClick}
                answerKey='hiragana'
            />
        );
        const btnHiragana2 = (
            <Button
                isSelected={currentPair.obj2.hiragana === hiragana}
                isCorrectAnswer={currentPair.obj2.hiragana === selectedObject.hiragana}
                isAnswerCompleted={answerCompleted}
                text={currentPair.obj2.hiragana}
                onClick={this.onButtonClick}
                answerKey='hiragana'
            />
        );
        const btnBetonamu1 = (
            <Button
                isSelected={currentPair.obj1.betonamu === betonamu}
                isCorrectAnswer={currentPair.obj1.betonamu === selectedObject.betonamu}
                isAnswerCompleted={answerCompleted}
                text={currentPair.obj1.betonamu}
                onClick={this.onButtonClick}
                answerKey='betonamu'
            />
        );
        const btnBetonamu2 = (
            <Button
                isSelected={currentPair.obj2.betonamu === betonamu}
                isCorrectAnswer={currentPair.obj2.betonamu === selectedObject.betonamu}
                isAnswerCompleted={answerCompleted}
                text={currentPair.obj2.betonamu}
                onClick={this.onButtonClick}
                answerKey='betonamu'
            />
        );

        return (
            <div className="p-5">
                {/* <p className="result text-center"><b>Correct/Complete/Total: 100/100/100</b></p> */}
                <p className="kanji text-center">{selectedObject.kanji}</p>
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column">
                        {randomizeHiraganaPos ? btnHiragana1 : btnHiragana2}
                        {!randomizeHiraganaPos ? btnHiragana1 : btnHiragana2}
                        {
                            answerCorrect ? (
                                <button
                                    className='btn btn-outline-success m-2'
                                    onClick={() => this.onPressNext()}
                                >
                                    >>
                                </button>
                            )
                            :
                            (
                                <React.Fragment><br /><br /></React.Fragment>
                            )
                        }
                        {randomizeBetonamuPos ? btnBetonamu1 : btnBetonamu2}
                        {!randomizeBetonamuPos ? btnBetonamu1 : btnBetonamu2}
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='progress-bar-wrapper'>
                        <ProgressBar
                            animated
                            now={progressBarPercent}
                            max={timeToReview - 1000} // sub 1s to view correctly animation
                        />
                    </div>
                    <button onClick={this.toggleModal} className='btn btn-dark'>
                        <i className='fa fa-cogs' />
                    </button>
                    <SettingModal
                        initialText={timeToReview}
                        show={showModal}
                        handleClose={this.toggleModal}
                        onSubmit={this.onSettingTimeToReview}
                    />
                </div>
            </div>
        )
    }
}

export default Kotoba;