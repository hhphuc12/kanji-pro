import React, { Component } from 'react';
import { data } from '../data/kanji';
import { randomizeInRange, getRandomPositionArray } from '../helpers';
import Button from '../components/button';
import { ProgressBar } from 'react-bootstrap';
import SettingModal from './settingModal';

class Kanji extends Component {
    constructor(props) {
        super(props);
        const count = 0;
        const currentKanji = data[randomizeInRange(0, data.length)];
        const fakeKanji1 = data[randomizeInRange(0, data.length)];
        const fakeKanji2 = data[randomizeInRange(0, data.length)];
        const hanVietRandomPos = getRandomPositionArray(3);
        const kunRandomPos = getRandomPositionArray(3);
        this.state = {
            count,
            currentKanji,
            fakeKanji1,
            fakeKanji2,
            hanVietRandomPos,
            kunRandomPos,
            answerSelected: {},
            answerCorrect: false,
            answerCompleted: false,
            progressBarPercent: 0,
            isAnswerComplete: false,
            showModal: false,
            timeToReview: 10000,
        };
    }

    onButtonClick = (text, key) => {
        const { currentKanji, answerSelected, timeToReview } = this.state;
        const { hanViet, kun } = currentKanji;
        const newAnswerSelected = { ...answerSelected, [key]: text };
        this.setState({ answerSelected: newAnswerSelected });
        if (newAnswerSelected.hanViet === hanViet && newAnswerSelected.kun === kun) {
            this.setState({ answerCorrect: true });
        }
        // wait and redirect to next question
        if (newAnswerSelected.hanViet && newAnswerSelected.kun) {
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
        let { count } = this.state;
        count++;
        const currentKanji = data[randomizeInRange(0, data.length)];
        const fakeKanji1 = data[randomizeInRange(0, data.length)];
        const fakeKanji2 = data[randomizeInRange(0, data.length)];
        const hanVietRandomPos = getRandomPositionArray(3);
        const kunRandomPos = getRandomPositionArray(3);
        this.setState({
            count,
            currentKanji,
            fakeKanji1,
            fakeKanji2,
            hanVietRandomPos,
            kunRandomPos,
            answerSelected: {},
            answerCorrect: false,
            answerCompleted: false,
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
            currentKanji,
            fakeKanji1,
            fakeKanji2,
            hanVietRandomPos,
            kunRandomPos,
            answerSelected,
            answerCorrect,
            answerCompleted,
            progressBarPercent,
            showModal,
            timeToReview,
        } = this.state;
        const { hanViet, kun } = answerSelected;
        const kanjiArray = [currentKanji, fakeKanji1, fakeKanji2];
        const hanVietRow = (
            <div className='d-flex justify-content-center'>
                {
                    hanVietRandomPos.map((pos, index) => (
                        <Button
                            key={index}
                            isSelected={kanjiArray[pos].hanViet === hanViet}
                            isCorrectAnswer={currentKanji.hanViet === kanjiArray[pos].hanViet}
                            isAnswerCompleted={answerCompleted}
                            text={kanjiArray[pos].hanViet}
                            onClick={this.onButtonClick}
                            answerKey='hanViet'
                        />
                    ))
                }
            </div>
        );

        const kunRow = (
            <div className='d-flex justify-content-center'>
                {
                    kunRandomPos.map((pos, index) => (
                        <Button
                            key={index}
                            isSelected={kanjiArray[pos].kun === kun}
                            isCorrectAnswer={currentKanji.kun === kanjiArray[pos].kun}
                            isAnswerCompleted={answerCompleted}
                            text={kanjiArray[pos].kun || '...'}
                            onClick={this.onButtonClick}
                            answerKey='kun'
                        />
                    ))
                }
            </div>
        );

        return (
            <div className="p-5">
                {/* <p className="result text-center"><b>Correct/Complete/Total: 100/100/100</b></p> */}
                <p className="kanji text-center">{currentKanji.kanji}</p>
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column">
                        {hanVietRow}
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
                        {kunRow}
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

export default Kanji;