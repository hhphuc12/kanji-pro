import React, { Component } from 'react';
import { data } from '../data/doshi';
import { getRandomPositionArray } from '../helpers';
import Button from '../components/button';

const arrayPos = getRandomPositionArray(data.length);

class Doshi extends Component {
    constructor(props) {
        super(props);
        const count = 0;
        const currentDoshi = data[arrayPos[count]];
        this.state = {
            count,
            currentDoshi,
            isAnswered: false,
            isPlaying: false,
        };
    }

    onButtonClick = () => {
        let { count, isAnswered } = this.state;
        if (!isAnswered) {
            this.setState({ isAnswered: true });
        }
        else {
            count += 1;
            const currentDoshi = data[arrayPos[count]];
            this.setState({ count, currentDoshi, isAnswered: false });
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
            isAnswered,
            currentDoshi,
            isPlaying
        } = this.state;
        const { kanji, hiragana, nghia } = currentDoshi;

        return (
            <div className="p-5">
                <p className="kanji text-center">{`${kanji} - ${hiragana}`}</p>
                <p className="answer-kanji-single">{isAnswered ? nghia : '...'}</p>
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column">
                        <Button
                            text={isAnswered ? "Next" : "View answer"}
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

export default Doshi;