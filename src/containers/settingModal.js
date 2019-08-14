import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class SettingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.initialText,
            isError: false,
        };
    }

    onTextChange = e => {
        const time = Number(e.target.value);
        if (Number(time) > 2000) {
            this.setState({ time: e.target.value, isError: false });
        }
        else {
            this.setState({ time: e.target.value, isError: true });
        }
    };

    onSubmit = () => {
        const { time } = this.state;
        if (Number(time) > 2000) {
            this.props.onSubmit(this.state.time);
            this.props.handleClose();
        }
    }

    render() {
        const { show, handleClose } = this.props;
        const { isError, time } = this.state;

        return (
            <Modal className='p-3' show={show} onHide={handleClose}>
                <div className='p-3'>
                    <div className="form-group">
                        <label>Time to review (in miliseconds)</label>
                        <input value={time} type="text" className="form-control" onChange={this.onTextChange} />
                        {isError && <p className='text-danger'>* Time must be a number, more than 2000</p>}
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-primary text-center' onClick={this.onSubmit}>OK</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default SettingModal;