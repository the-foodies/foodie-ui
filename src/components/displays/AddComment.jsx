import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import postComment from '../../utils/postComment';

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  postComment() {
    // poster is who owns the post being commented on
    if (this.state.input.length > 0) {
      const poster = this.props.curUser;
      console.log('-----------');
      console.log(this.props)
      const { refreshParam } = this.props;
      const comment = {
        text: this.state.input,
      };
      let recipe = null;
      let restaurant = null;
      if (this.props.ImagesRestaurants) {
        restaurant = {
          id: this.props.id,
        };
      } else {
        recipe = {
          id: this.props.id,
        };
      }
      postComment({
        poster,
        recipe,
        restaurant,
        comment,
      }).then(() => {
        this.props.refreshPage(refreshParam);
        this.setState({
          input: '',
        });
      });
    }
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
              onClick={this.postComment}
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

AddComment.propTypes = {
  id: PropTypes.number.isRequired,
  refreshPage: PropTypes.func.isRequired,
  curUser: PropTypes.object.isRequired,
};
