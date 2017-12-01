import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import testApi from '../actions/test';

function mapStateToProps(state) {
  return {
    blah: state.asdasd,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ testApi }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
