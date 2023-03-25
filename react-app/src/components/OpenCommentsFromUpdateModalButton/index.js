import React from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { editCommentThunk } from '../../store/comments';
import './OpenCommentsFromUpdateModalButton.css'
import { useState, useEffect } from 'react';

function OpenCommentsFromUpdateModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose,
  commentId,
  body // optional: callback function that will be called once the modal is closed
}) {
  const [disabled, setDisabled ] = useState(true)
  const dispatch = useDispatch()
  const { setModalContent, setOnModalClose } = useModal();
  const [disabledClass, setDisabledClass] = useState("")

  useEffect(() => {
    if (body.length > 0 && body.length < 500) {
      setDisabled(false)
      setDisabledClass("")
    } else{
      setDisabled(true)
      setDisabledClass("disabled")
    }
  }, [body])


  const onClick = async () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
    const comment = {
      body: body
    }
    await dispatch(editCommentThunk(commentId, comment))
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`comments-modal-delete-button ${disabledClass}`}>{buttonText}</button>
  );
}

export default OpenCommentsFromUpdateModalButton;
