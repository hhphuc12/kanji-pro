import React, { Component } from 'react';
import Kanji from './kanji';
import KanjiSingle from './kanji-single';
import Kotoba from './kotoba';
import Doshi from './doshi';
import Bunpo from './bunpo';
import Dropdown from '../components/dropdown';

const CONTENT = [
    '[JIL]漢字',
    '[JIL]シングル漢字',
    '[JIL]語彙',
    '[Rakuraku]動詞',
    '[Rakuraku]文法',
];

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentContent: '',
        }
    }

    onChangeContent = content => this.setState({ currentContent: content });

    render() {
        const { currentContent } = this.state;
        let contentJSX;
        switch (currentContent) {
            case '[JIL]漢字':
                contentJSX = <Kanji />;
                break;
            case '[JIL]シングル漢字':
                contentJSX = <KanjiSingle />;
                break;
            case '[JIL]語彙':
                contentJSX = <Kotoba />;
                break;
            case '[Rakuraku]動詞':
                contentJSX = <Doshi />;
                break;
            case '[Rakuraku]文法':
                contentJSX = <Bunpo />;
                break;
            default:
                contentJSX = <div />;
        }

        return (
            <React.Fragment>
                <div className='d-flex justify-content-center pt-3'>
                <Dropdown
                    items={CONTENT}
                    onChange={this.onChangeContent}
                />
                </div>
                {contentJSX}
            </React.Fragment>
        );
    }
}
