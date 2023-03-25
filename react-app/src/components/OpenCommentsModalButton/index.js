import React from 'react';
import { useModal } from '../../context/Modal';
import './OpenCommentsModalButton.css'

function OpenCommentsModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose,
  commentsLength // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button className='comments-modal-button'  onClick={onClick}>
      <i className="fa-regular fa-message modal-icon" style={{position:"relative",top:"1px"}}></i> {commentsLength === 0 ? null : commentsLength}
    </ button>
  );
}

export default OpenCommentsModalButton;
