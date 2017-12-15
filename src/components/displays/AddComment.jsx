import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import postComment from '../../utils/postComment';

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    console.log(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <FormGroup>
        <InputGroup>
          <FormControl
            type="text"
            value={this.state.input}
            placeholder="Add a comment..."
            onChange={this.handleChange}
          />
          <InputGroup.Button>
            <Button
              // onClick={() => {
              //   this.postComment({
              //     poster: this.props.curUser,
              //     recipe,
              //     text,
              //   })
              // }}
            >
              Comment
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default AddComment;
