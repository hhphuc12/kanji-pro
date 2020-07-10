import React, { Component } from 'react';
import { data } from '../data/bunpo';
import { getRandomPositionArray } from '../helpers';
import Button from '../components/button';

const arrayPos = getRandomPositionArray(data.length);

class Bunpo extends Component {
    constructor(props) {
        super(props);
        const count = 0;
        const currentBunpo = data[arrayPos[count]];
        this.state = {
            count,
            currentBunpo,
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
            const currentBunpo = data[arrayPos[count]];
            this.setState({ count, currentBunpo, isAnswered: false });
        }
    };

    onPlayClick = () => {
        this.setState({ isPlaying: !this.state.isPlaying }, () => {
            if (this.state.isPlaying) {
                this.playInterval = setInterval(() => {
                    this.onButtonClick();
                }, 3000);
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
            currentBunpo,
            isPlaying
        } = this.state;
        const { bunpo, nghia } = currentBunpo;

        return (
            <div className="p-5">
                <p className="kanji text-center">{`${bunpo}`}</p>
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

export default Bunpo;