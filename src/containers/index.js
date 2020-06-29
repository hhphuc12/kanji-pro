import React, { Component } from 'react';
import Kanji from './kanji';
import KanjiSingle from './kanji-single';
import Kotoba from './kotoba';
import Doshi from './doshi';
import ContentButton from '../components/contentButton';

const CONTENT = {
    KANJI: 'kanji',
    KANJI_SINGLE: 'kanji_single',
    KOTOBA: 'kotoba',
    DOSHI: 'doshi',
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
            case CONTENT.KANJI_SINGLE:
                contentJSX = <KanjiSingle />;
                break;
            case CONTENT.KOTOBA:
                contentJSX = <Kotoba />;
                break;
            case CONTENT.DOSHI:
                contentJSX = <Doshi />;
                break;
            default:
                contentJSX = <Kanji />;
        }

        return (
            <React.Fragment>
                <div className='d-flex justify-content-center pt-3'>
                    <ContentButton
                        isActive={currentContent === CONTENT.KANJI}
                        onPress={() => this.onChangeContent(CONTENT.KANJI)}
                        text='漢字'
                    />
                    <ContentButton
                        isActive={currentContent === CONTENT.KANJI_SINGLE}
                        onPress={() => this.onChangeContent(CONTENT.KANJI_SINGLE)}
                        text='シングル漢字'
                    />
                    <ContentButton
                        isActive={currentContent === CONTENT.KOTOBA}
                        onPress={() => this.onChangeContent(CONTENT.KOTOBA)}
                        text='語彙'
                    />
                    <ContentButton
                        isActive={currentContent === CONTENT.DOSHI}
                        onPress={() => this.onChangeContent(CONTENT.DOSHI)}
                        text='動詞'
                    />
                </div>
                {contentJSX}
            </React.Fragment>
        );
    }
}
