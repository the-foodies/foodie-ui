import React from 'react';
import { Modal, Button, ButtonGroup, FormGroup, FormControl, HelpBlock, Row, Col } from 'react-bootstrap';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
    const { dispatch } = props;
    this.state = {
      loginType: 'Login',
      showingModal: false,
      hasSignedUp: false,
      email: '',
      password: '',
      password2: '',
    };
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
    const { email, password } = this.state;
    console.log(this.state.loginType);
    if (this.state.loginType === 'Signup') {
      this.props.openAuthSignup(email, password);
      this.setState({ hasSignedUp: true });
    } else if (this.state.loginType == 'Login') {
      this.props.openAuthWithEmail(email, password)
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
      this.props.hideModal();
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
                    <Button onClick={() => { this.props.openAuthWithProvider('facebook'); }}>
                      <img src="assets/social-svg/facebook.png" alt="fb" width="20" />
                    </Button>
                  </ButtonGroup>
                </Col>
                <Col xs={4} xsOffset={1}>
                  <ButtonGroup>
                    <Button onClick={() => { this.props.openAuthWithProvider('google'); }}>
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

export default LoginModal;
