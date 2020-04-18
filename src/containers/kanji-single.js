import React, { Component } from 'react';
import { data } from '../data/kanji-single';
import { getRandomPositionArray } from '../helpers';
import Button from '../components/button';

const arrayPos = getRandomPositionArray(data.length);

class KanjiSingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            isAnswerViewed: false,
            isPlaying: false,
        };
    }

    onButtonClick = () => {
        let { count, isAnswerViewed } = this.state;
        if (!isAnswerViewed) {
            this.setState({ isAnswerViewed: true });
        }
        else {
            this.setState({ count: ++count, isAnswerViewed: false });
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

    render() {
        const {
            count,
            isAnswerViewed,
            isPlaying
        } = this.state;
        const currentKanji = data[arrayPos[count]].split(",");

        return (
            <div className="p-5">
                <p className="kanji text-center">{currentKanji[0]}</p>
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column">
                        <p className="text-center">{!isAnswerViewed ? "..." : currentKanji[1]}</p>
                        <Button
                            text={!isAnswerViewed ? "View answer" : "Next"}
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