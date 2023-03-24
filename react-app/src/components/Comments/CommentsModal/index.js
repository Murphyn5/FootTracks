// frontend/src/components/deleteFormModal/index.js
import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useEffect } from "react";
import "./CommentsModal.css";
import { getActivityCommentsThunk } from "../../../store/comments";

function CommentsModal({ activityId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    const commentRestore = async () => {
        await dispatch(getActivityCommentsThunk(activityId))
    }
    commentRestore()
  }, [])

  return (
    <>
      <div className="comment-modal-container">
        <form className={"comment-modal"}>
          <h2 className="comment-modal-title">Confirm Delete</h2>
          <span>
            Are you sure you want to delete this Activity?
          </span>
          <button type="submit" className={"enabled"}>Yes (Delete Activity)</button>
          <button type="submit" onClick={closeModal} className={"accent"}>No (Keep Activity)</button>
        </form>
      </div>
    </>
  );
}

export default CommentsModal;
