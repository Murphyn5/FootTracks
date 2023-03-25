import React from 'react';
import { useModal } from '../../context/Modal';
import './OpenCommentsFromNoDeleteModalButton.css'


function OpenCommentsFromNoDeleteModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose,
  commentId // optional: callback function that will be called once the modal is closed
}) {

  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button onClick={onClick} className={"comments-modal-cancel-delete-button"}>{buttonText}</button>
  );
}

export default OpenCommentsFromNoDeleteModalButton;
