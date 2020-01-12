import React, { Component } from 'react';
import Kanji from './kanji';
import Kotoba from './kotoba';
import ContentButton from '../components/contentButton';

const CONTENT = {
    KANJI: 'kanji',
    KOTOBA: 'kotoba',
}

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentContent: CONTENT.KANJI,
        }
    }

    onChangeContent = content => this.setState({ currentContent: content });

    render() {
        const { currentContent } = this.state;
        let contentJSX;
        switch (currentContent) {
            case CONTENT.KOTOBA:
                contentJSX = <Kotoba />;
                break;
            default:
                contentJSX = <Kanji />;
        }

        return (
            <React.Fragment>
                <div className='d-flex justify-content-center mt-3'>
                    <ContentButton
                        isActive={currentContent === CONTENT.KANJI}
                        onPress={() => this.onChangeContent(CONTENT.KANJI)}
                        text='漢字'
                    />
                    <ContentButton
                        isActive={currentContent === CONTENT.KOTOBA}
                        onPress={() => this.onChangeContent(CONTENT.KOTOBA)}
                        text='語彙'
                    />
                </div>
                {contentJSX}
            </React.Fragment>
        );
    }
}
