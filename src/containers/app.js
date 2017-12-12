import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import * as dispatchModal from '../actions/modal';
import * as dispatchAuth from '../actions/auth';
import * as dispatchApi from '../actions/apiRequests/';

console.log(dispatchAuth);

function mapStateToProps(state) {
  return {
    modal: state.modal,
    auth: state.auth,
    posts: state.app.posts,
    curPost: state.app.curPost,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    dispatch: bindActionCreators(dispatch, dispatch),
    dispatchAuth: bindActionCreators({ ...dispatchAuth }, dispatch),
    dispatchModal: bindActionCreators({ ...dispatchModal }, dispatch),
    dispatchApi: bindActionCreators({ ...dispatchApi }, dispatch),
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
