import React from 'react';
import { Modal, Button, ButtonGroup, FormGroup, FormControl, HelpBlock, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    // dispatch for dispatchAuth functions
    const { dispatch } = props;

    this.state = {
      loginType: 'Login',
      showingModal: false,
      hasSignedUp: false,
      email: '',
      password: '',
      password2: '',
      displayName: '',
    };

    this.close = this.close.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    if (this.props.showModal) {
      this.state.showingModal = true;
    }
  }

  getEmailValidationState() {
    if (this.state.email) {
      // validate email
      if (this.state.email.includes('@') && this.state.email.includes('.')) {
        return 'success';
      }
      return 'warning';
    }
    return null;
  }
  getPasswordValidationState() {
    const { password } = this.state;
    if (password) {
      // validate email
      if (password.length > 6) {
        return 'success';
      }
      return 'error';
    }
    return null;
  }
  getPassword2ValidationState() {
    if (this.state.password2) {
      // validate email
      if (this.state.password === this.state.password2) {
        return 'success';
      }
      return 'warning';
    }
    return null;
  }

  handleAuthClick() {
    const { email, password, displayName } = this.state;
    console.log(this.state.loginType);
    if (this.state.loginType === 'Signup') {
      this.props.dispatchAuth.openAuthSignup(email, password, displayName);
      this.setState({ hasSignedUp: true });
    } else if (this.state.loginType === 'Login') {
      this.props.dispatchAuth.openAuthWithEmail(email, password);
    }
  }
  handleInputChange(e, inputType) {
    this.setState({ [inputType]: e.target.value });
  }

  changeLoginType(type) {
    this.setState({ loginType: type });
  }

  close() {
    this.setState({
      showingModal: false,
    });
    // setTimeout notifies the app that the modal has closed
    setTimeout(() => {
      this.props.dispatchModal.hideModal();
    }, 1500);
  }

  render() {
    return (
      <Modal show={this.state.showingModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.loginType}</Modal.Title>
        </Modal.Header>
        <Modal.Body fluid="true">
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
            <h4>Please {this.state.loginType}</h4>
          </Col>
          <Row>
            <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
              <FormGroup validationState={null}>
                <FormControl
                  type="displayName"
                  placeholder="display name"
                  value={this.state.displayName}
                  onChange={e => this.handleInputChange(e, 'displayName')}
                /><FormControl.Feedback />
              </FormGroup>
              <FormGroup validationState={this.getEmailValidationState()}>
                <FormControl
                  type="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={e => this.handleInputChange(e, 'email')}
                /><FormControl.Feedback />
              </FormGroup>
              <FormGroup validationState={this.getPasswordValidationState()}>
                <FormControl
                  type="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={e => this.handleInputChange(e, 'password')}
                /><FormControl.Feedback />
                <HelpBlock>Password must be longer than 6 letters</HelpBlock>
              </FormGroup>
              {this.state.loginType === 'Signup' ? (
                <FormGroup validationState={this.getPassword2ValidationState()}>
                  <FormControl
                    type="password"
                    placeholder="re-enter password"
                    value={this.state.password2}
                    onChange={e => this.handleInputChange(e, 'password2')}
                  /><FormControl.Feedback />
                </FormGroup>
              ) : (
                null
              )}
            </Col>
          </Row>
          <Row>
            <Col md={4} mdOffset={8}>
              <ButtonGroup>
                <Button
                  bsStyle="primary"
                  onClick={this.handleAuthClick}
                >{this.state.loginType}
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={4} xsOffset={4}>
              <Row>
                <Col xs={4} xsOffset={1}>
                  <ButtonGroup>
                    <Button onClick={() => { this.props.dispatchAuth.openAuthWithProvider('facebook'); }}>
                      <img src="assets/social-svg/facebook.png" alt="fb" width="20" />
                    </Button>
                  </ButtonGroup>
                </Col>
                <Col xs={4} xsOffset={1}>
                  <ButtonGroup>
                    <Button onClick={() => { this.props.dispatchAuth.openAuthWithProvider('google'); }}>
                      <img src="assets/social-svg/google.png" alt="google" width="20" />
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          {this.state.loginType === 'Login' && !this.state.hasSignedUp ? (
            <Row>
              <Col className="text-center">
                <h5>Please Login with your email and password or </h5>
                <Button bsStyle="link" onClick={() => { this.changeLoginType('Signup'); }}>Signup</Button>
              </Col>
            </Row>
          ) : (
            null
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dispatchModal: PropTypes.objectOf(PropTypes.func).isRequired,
  dispatchAuth: PropTypes.objectOf(PropTypes.func).isRequired,
  showModal: PropTypes.bool.isRequired,
};

export default LoginModal;
