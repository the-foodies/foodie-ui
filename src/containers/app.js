import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    blah: state.asdasd,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
