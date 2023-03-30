import React from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteCommentThunk } from '../../store/comments';
import { decreaseCommentsLengthAction } from '../../store/activities';
import './OpenCommentsFromDeleteModalButton.css'

function OpenCommentsFromDeleteModalButton({
  modalComponent, // component to render inside the modal
  buttonText,
  activityId, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose,
  commentId // optional: callback function that will be called once the modal is closed
}) {
  const dispatch = useDispatch()
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = async () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
    await dispatch(deleteCommentThunk(commentId))
    await dispatch(decreaseCommentsLengthAction(activityId))
  };

  return (
    <button type="submit" onClick={onClick} className={"comments-modal-delete-button"}>{buttonText}</button>
  );
}

export default OpenCommentsFromDeleteModalButton;
