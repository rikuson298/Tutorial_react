import React from 'react';
import { connect } from 'react-redux';
import ToggleButton from 'react-toggle-button';
import { Modal, Button } from 'react-bootstrap';
import { closeModal, chengeCpu, chengeMode, chengeCpuOrder, chengeCpuDifficulty } from '../actions/actions';

class SettingModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.state.modalIsOpen}
          onHide={() => this.props.closeModal()}
          backdrop="static"
        >

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
              <div>CPU Order : </div>
              <ToggleButton
                inactiveLabel="Second"
                activeLabel="First"
                value={this.props.state.xIsCpu}
                onToggle={() => this.props.chengeCpuOrder()}
              />
              <div>CPU Difficulty : </div>
              <ToggleButton
                inactiveLabel="Strong"
                activeLabel="Weak"
                value={this.props.state.cpuDifficulty}
                onToggle={() => this.props.chengeCpuDifficulty()}
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
  return { state };
}

export default connect(mapStateToProps, {
  closeModal,
  chengeCpu,
  chengeMode,
  chengeCpuOrder,
  chengeCpuDifficulty,
})(SettingModal);
