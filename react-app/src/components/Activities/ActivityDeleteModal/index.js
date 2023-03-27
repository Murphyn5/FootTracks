// frontend/src/components/deleteFormModal/index.js
import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./ActivityDeleteModal.css";
import { deleteActivityThunk } from "../../../store/activities";
import { getCurrentActivitiesThunk } from "../../../store/activities";

function ActivityDeleteModal({ activityId }) {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(deleteActivityThunk(activityId))
    closeModal()
  };

  const handleCancel = async (e) => {
    e.preventDefault()
    closeModal()
  };

  return (
    <>
      <div className="comment-delete-container">
        <form className={"comment-delete-form"} onSubmit={handleSubmit}>
          <span>
            Are you sure you want to delete this activity? You can not undo this action.
          </span>
          <div>
            <button  className={"activity-delete-form-cancel-delete-button"} onClick={handleCancel}>
              Cancel
            </button>
            <button className={"activity-delete-form-delete-button"} onClick={handleSubmit}>
              Ok
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ActivityDeleteModal;
