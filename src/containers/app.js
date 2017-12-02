import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import showLoginModal from '../actions/showLoginModal';
import hideModal from '../actions/hideModal';

function mapStateToProps(state) {
  console.log(state);
  return {
    modal: state.modal,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ showLoginModal, hideModal }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
