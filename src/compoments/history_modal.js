import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Table, Radio, Label } from 'react-bootstrap';
import { showHistory, setHistoryNo } from '../actions/actions';
import { toLocaleString } from '../utils/date_util';

class HistoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedIndex: 0,
    };
  }

  showHistory() {
    this.props.setHistoryNo(this.state.checkedIndex);
    this.props.showHistory();
    this.props.closeModal();
  }

  render() {
    const historyList = this.props.state.historyList;
    const historys = historyList.map((history, index) => (
      <tr key={index}>
        <td key={index * 10}>
          <Radio
            name="radioGroup"
            onChange={() => this.setState({ checkedIndex: index + 1 })}
          />
        </td>
        <td key={index * 10 + 1}>{index + 1}</td>
        <td key={index * 10 + 2}>{toLocaleString(history.date)}</td>
        <td key={index * 10 + 3}>{history.winner}</td>
        <td key={index * 10 + 4}>{history.isCpu ? 'CPU' : 'Player'}</td>
        <td key={index * 10 + 5}>{history.isThree ? 3 : 5}</td>
      </tr >
    ));
    const selectedLabel = this.state.checkedIndex === 0 ? 'Please select history. ' : `Seleced No.${this.state.checkedIndex} `;

    return (
      <div>
        <Modal
          show={this.props.historyModalIsOpen}
          onHide={() => this.props.closeModal()}
          backdrop="static"
        >

          <Modal.Header closeButton={false}>
            <Modal.Title>Match History</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>No</th>
                  <th>Date and time</th>
                  <th>Winner</th>
                  <th>VS Mode</th>
                  <th>Squares</th>
                </tr>
              </thead>
              <tbody>{historys}</tbody>
            </Table>
          </Modal.Body>

          <Modal.Footer>
            {selectedLabel}
            <Button bsStyle="primary" onClick={() => this.showHistory()}>View History</Button>
            <Button onClick={() => this.props.closeModal()}>Cancel</Button>
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
  showHistory,
  setHistoryNo,
})(HistoryModal);
