import React from 'react';
import ReactDOM from 'react-dom';
import ToggleButton from 'react-toggle-button';
import { Modal, Button } from "react-bootstrap";;

class SettingModal extends React.Component {
    render() {
        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.closeModal}
                    backdrop='static'>

                    <Modal.Header closeButton={false}>
                        <Modal.Title>Game Mode Setting</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                            <div>Squares : </div>
                            <ToggleButton
                                inactiveLabel="5"
                                activeLabel="3"
                                value={this.props.isThree}
                                onToggle={() => this.props.onToggleMode(this.props.isThree)} 
                            />
                            <div>CPU Fight : </div>
                            <ToggleButton
                                inactiveLabel="No"
                                activeLabel="Yes"
                                value={this.props.isCpu}
                                onToggle={() => this.props.onToggleCpu(this.props.isCpu)} 
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.props.closeModal}>Game Start!</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default SettingModal;
