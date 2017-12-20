import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Loading from './Loading';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

class TrendingRecipesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingRecipes: [],
      loading: true,
    };
    this.loadTrendingRecipes = this.loadTrendingRecipes.bind(this);
    this.loadRecipe = this.loadRecipe.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get(`${REST_URL}/trending/recipes`);
    this.loadTrendingRecipes(data);
  }

  loadTrendingRecipes(arr) {
    this.setState({
      trendingRecipes: arr,
      loading: false,
    });
  }

  loadRecipe(name, id) {
    this.props.history.push({
      pathname: `/recipe/${name}/${id}`,
    });
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <div>
        <Grid>
          <h3>Trending Recipes</h3><hr />
          <Row>
            {this.state.trendingRecipes.map((item) => {
              return (String(item.id) === this.props.match.params.id ?
              null
              :
              <Col xs={2} key={item.id}>
                <Thumbnail
                  src={item.ImagesRecipes[0].image_url}
                  alt={item.name}
                  onClick={() => { this.loadRecipe(item.name, item.id); }}
                >
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p>
                    <Button
                      bsStyle="primary"
                    >
                    Click to visit
                    </Button>&nbsp;
                  </p>
                </Thumbnail>
              </Col>);
              })
            }
          </Row>
        </Grid>
      </div>
    );
  }
}

TrendingRecipesList.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(TrendingRecipesList);
