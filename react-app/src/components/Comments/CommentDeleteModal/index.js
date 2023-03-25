// frontend/src/components/deleteFormModal/index.js
import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./CommentDeleteModal.css";
import { deleteCommentThunk } from "../../../store/comments";
import OpenCommentsFromDeleteModalButton from "../../OpenCommentsFromDeleteModalButton copy";
import OpenCommentsFromNoDeleteModalButton from "../../OpenCommentsFromNoDeleteModalButton";
import CommentsModal from "../CommentsModal";


function CommentDeleteModal({ commentId, activityTitle, ownerId }) {
    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(deleteCommentThunk(commentId))
        closeModal()
    };

    return (
        <>
            <div className="comment-delete-container">
                <form className={"comment-delete-form"} onSubmit={handleSubmit}>
                    <span>
                        Are you sure you want to delete this comment? You can not undo this action.
                    </span>
                    <div>
                        <OpenCommentsFromNoDeleteModalButton
                            buttonText={"Cancel"}
                            modalComponent={<CommentsModal commentId={commentId} ownerId={ownerId} activityTitle={activityTitle} type={"comments"}></CommentsModal>}
                        ></OpenCommentsFromNoDeleteModalButton>
                        &nbsp;&nbsp;
                        <OpenCommentsFromDeleteModalButton
                            buttonText={"Ok"}
                            commentId={commentId}
                            modalComponent={<CommentsModal commentId={commentId} ownerId={ownerId} activityTitle={activityTitle} type={"comments"}></CommentsModal>}
                        ></OpenCommentsFromDeleteModalButton>
                    </div>
                    {/* <button type="submit" onClick={handleSubmit} className={"enabled"}>Yes (Delete Comment)</button>
          <button type="submit" onClick={closeModal} className={"accent"}>No (Keep Comment)</button> */}
                </form>
            </div>
        </>
    );
}

export default CommentDeleteModal;
