// Import Modals and add TO MODAL_COMPONENTS
import React from 'react';
import PropTypes from 'prop-types';
import LoginModal from './modals/LoginModal';

const MODAL_COMPONENTS = {
  LOGIN_MODAL: LoginModal,
};

const ModalRoot = ({
  modal,
  hideModal,
  auth,
  openAuth,
  dispatch,
}) => {
  const { modalType, modalProps } = modal;
  // const { hideModal } = props;
  // console.log(props);
  if (!modalType) {
    return null;
  }
  const SpecifiedModal = MODAL_COMPONENTS[modalType];
  return (
    <SpecifiedModal
      auth={auth}
      dispatch={dispatch}
      openAuth={openAuth}
      showModal={!!modalType}
      hideModal={hideModal}
      modalProps={{ ...modalProps }}
    />
  );
};

ModalRoot.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object,

};

export default ModalRoot;
