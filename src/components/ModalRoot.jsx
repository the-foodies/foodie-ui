// Import Modals and add TO MODAL_COMPONENTS
import React from 'react';
import PropTypes from 'prop-types';
import LoginModal from '../containers/loginModal';

// add modals here 
const MODAL_COMPONENTS = {
  LOGIN_MODAL: LoginModal,
};

const ModalRoot = (props) => {
  const { modalType, modalProps } = props.modal;
  // const { hideModal } = props;
  // console.log(props);
  if (!modalType) {
    return null;
  }
  const SpecifiedModal = MODAL_COMPONENTS[modalType];
  return (
    <SpecifiedModal {...modalProps} />
  );
};

ModalRoot.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object,

};

export default ModalRoot;
