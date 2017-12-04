import React from 'react';
import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
    const { dispatch } = props;
  }

  close() {
    this.props.hideModal();
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Please Login</h4>
          <FormGroup>
            <FormControl type="text" placeholder="username" />
            <FormControl type="password" placeholder="password" />
            <Button onClick={() => {}}>Login</Button>
            <Button onClick={() => { this.props.openAuthWithProvider('facebook'); }}>
              <img src="assets/social-svg/facebook.png" alt="fb" width="20" />
            </Button>
            <Button onClick={() => { this.props.openAuthWithProvider('google'); }}>
              <img src="assets/social-svg/google.png" alt="google" width="20" />
            </Button>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default LoginModal;
