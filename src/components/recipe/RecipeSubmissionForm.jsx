import React from 'react';
import { InputGroup, Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Row, Col } from 'react-bootstrap';
import * as firebase from 'firebase';

class RecipeSubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    console.log(e);
    console.log(this);

    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`test_pics/${file.name}`);
    const task = storageRef.put(file);
    task.on('state_changed',
      function progress(snapshot) {
        const percentageDone = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentageDone;
      },

      function error(err) {
        console.error(err);
      },

      function complete() {

      },
    );
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Form>
              <FormGroup>
                <Col xs={12}>
                  <h4>Upload Recipes and Share Them with Da Foodies All Over the World</h4>
                </Col>
              </FormGroup>
              <FormGroup>
                <progress value="0" max="100">0%</progress><br />
                <button
                  className="btn-secondary"
                  type="file"
                  onClick={this.handleInputChange}>Upload File</button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RecipeSubmissionForm;
