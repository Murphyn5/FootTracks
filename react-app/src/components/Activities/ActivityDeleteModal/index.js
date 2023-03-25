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

  return (
    <>
      <div className="activity-delete-container">
        <form className={"actvity-delete"} onSubmit={handleSubmit}>
          <h2 className="actvity-delete-title">Confirm Delete</h2>
          <span>
            Are you sure you want to delete this Activity?
          </span>
          <button type="submit" onClick={handleSubmit} className={"enabled"}>Yes (Delete Activity)</button>
          <button type="submit" onClick={closeModal} className={"accent"}>No (Keep Activity)</button>
        </form>
      </div>
    </>
  );
}

export default ActivityDeleteModal;
