import React from 'react';
import { Modal } from 'react-bootstrap';

class BlockModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.blockModalIsOpen}
          onHide={() => this.props.closeModal()}
          backdrop="static"
        >
          <Modal.Header closeButton={false}>
            <Modal.Title>CPU is thinking・・・</Modal.Title>
          </Modal.Header>
        </Modal>
      </div>
    );
  }
}

export default BlockModal;
