import React, { Component } from 'react';
import { data } from '../data/kanji';
import { getRandomPositionArray } from '../helpers';
import Button from '../components/button';

const arrayPos = getRandomPositionArray(data.length);

class KanjiSingle extends Component {
    constructor(props) {
        super(props);
        const count = 0;
        const currentKanji = data[arrayPos[count]];
        this.state = {
            count,
            currentKanji,
            answerStep: 0,
            isPlaying: false,
        };
    }

    onButtonClick = () => {
        let { count, answerStep, currentKanji } = this.state;
        let threshold = currentKanji.kun ? 3 : 2;
        if (answerStep < threshold) {
            this.setState({ answerStep: answerStep + 1 });
        }
        else {
            count += 1;
            const currentKanji = data[arrayPos[count]];
            this.setState({ count, currentKanji, answerStep: 0 });
        }
    };

    onPlayClick = () => {
        this.setState({ isPlaying: !this.state.isPlaying }, () => {
            if (this.state.isPlaying) {
                this.playInterval = setInterval(() => {
                    this.onButtonClick();
                }, 1500);
            }
            else {
                clearInterval(this.playInterval);
            }
        });
    };

    componentWillUnmount() {
        if (this.playInterval) {
            clearInterval(this.playInterval);
        }
    }

    render() {
        const {
            answerStep,
            currentKanji,
            isPlaying
        } = this.state;
        const { kanji, hanViet, nghia, kun } = currentKanji;
        let stepAnswerText;
        switch (answerStep) {
            case 1:
                stepAnswerText = hanViet;
                break;
            case 2:
                stepAnswerText = `${hanViet} - ${kun}`;
                break;
            case 3:
                stepAnswerText = `${hanViet} - ${kun} - ${nghia}`;
                break;
            default:
                stepAnswerText = '...';
        }

        return (
            <div className="p-5">
                <p className="kanji text-center">{kanji}</p>
                <p className="answer-kanji-single">{stepAnswerText}</p>
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column">
                        <Button
                            text={answerStep < 4 ? "View answer" : "Next"}
                            onClick={this.onButtonClick}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <Button
                        ref={ref => this.playRef = ref}
                        text={isPlaying ? "Pause" : "Play"}
                        onClick={this.onPlayClick}
                    />
                </div>
            </div>
        )
    }
}

export default KanjiSingle;