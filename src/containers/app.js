import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import showLoginModal from '../actions/showLoginModal';
import hideModal from '../actions/hideModal';
import { listenToAuth, openAuthWithProvider, logoutUser, openAuthWithEmail, openAuthSignup } from '../actions/auth';

function mapStateToProps(state) {
  return {
    modal: state.modal,
    auth: state.auth,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    dispatch,
    listenToAuth,
    openAuthWithProvider,
    openAuthWithEmail,
    openAuthSignup,
    logoutUser,
    showLoginModal,
    hideModal,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
