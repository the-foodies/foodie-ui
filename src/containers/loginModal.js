import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginModal from '../components/modals/LoginModal';
import { hideModal } from '../actions/modal';
import * as dispatchAuth from '../actions/auth';

function mapStateToProps(state) {
  return {
    modal: state.modal,
    auth: state.auth,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    dispatch: bindActionCreators(dispatch, dispatch),
    dispatchAuth: bindActionCreators({ ...dispatchAuth }, dispatch),
    dispatchModal: bindActionCreators({ hideModal }, dispatch),
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginModal);
