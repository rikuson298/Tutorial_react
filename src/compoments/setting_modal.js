import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ToggleButton from 'react-toggle-button';
import { Modal, Button } from "react-bootstrap";;
import { closeModal, chengeCpu, chengeMode } from '../actions/actions';

class SettingModal extends React.Component {
    render() {
        return (
            <div>
                <Modal
                    show={this.props.state.modalIsOpen}
                    onHide={() => this.props.closeModal()}
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
                                value={this.props.state.isThree}
                                onToggle={() => this.props.chengeMode()} 
                            />
                            <div>CPU Fight : </div>
                            <ToggleButton
                                inactiveLabel="No"
                                activeLabel="Yes"
                                value={this.props.state.isCpu}
                                onToggle={() => this.props.chengeCpu()} 
                            />
                        </form>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={() => this.props.closeModal()}>Game Start!</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {state};
  }

export default connect(mapStateToProps, {
                            closeModal,
                            chengeCpu,
                            chengeMode})(SettingModal);
                