export default () => {
  console.log('showing login modal');
  return {
    type: 'SHOW_MODAL',
    modalType: 'LOGIN_MODAL',
    modalProps: {
      showModal: true,
    },
  };
};
