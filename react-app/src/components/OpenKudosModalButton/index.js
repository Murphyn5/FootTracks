import React from 'react';
import { useModal } from '../../context/Modal';
import './OpenKudosModalButton.css'

function OpenKudosModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose,
  likesLength // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <span className={"kudos-modal-link"} onClick={onClick}>
      {likesLength === 0 ? null : `${likesLength} kudos`}
    </ span>
  );
}

export default OpenKudosModalButton;


{/* <i className="fa-regular fa-thumbs-up" style={{position:"relative",top:"1px"}}></i>  */}
