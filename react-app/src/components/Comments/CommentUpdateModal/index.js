// frontend/src/components/deleteFormModal/index.js
import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useModal } from "../../../context/Modal";
import "./CommentUpdateModal.css";
import OpenCommentsFromUpdateModalButton from "../../OpenCommentsFromUpdateModalButton";
import OpenCommentsFromNoDeleteModalButton from "../../OpenCommentsFromNoDeleteModalButton";
import CommentsModal from "../CommentsModal";


function CommentUpdateModal({ commentBody, commentId, activityTitle, activityId, ownerId, activitiesType }) {
    const dispatch = useDispatch();
    const [body, setBody] = useState(commentBody)
    const [displayErrors, setDisplayErrors] = useState("Edit comment")
    const [placeHolderColor, setPlaceHolderColor] = useState("")

    const { closeModal } = useModal();

    return (
        <>
            {/* <div className="comment-delete-container">
                <form className={"comment-delete-form"} onSubmit={handleSubmit}>
                    <span>
                        Are you sure you want to delete this comment? You can not undo this action.
                    </span>
                    <div>
                        <OpenCommentsFromNoDeleteModalButton
                            buttonText={"Cancel"}
                            modalComponent={<CommentsModal commentId={commentId} ownerId={ownerId} activityId={activityId} activityTitle={activityTitle} type={"comments"}></CommentsModal>}
                        ></OpenCommentsFromNoDeleteModalButton>
                        &nbsp;&nbsp;
                        <OpenCommentsFromUpdateModalButton
                            buttonText={"Ok"}
                            commentId={commentId}
                            modalComponent={<CommentsModal commentId={commentId} ownerId={ownerId} activityId={activityId} activityTitle={activityTitle} type={"comments"}></CommentsModal>}
                        ></OpenCommentsFromUpdateModalButton>
                    </div>
                    <button type="submit" onClick={handleSubmit} className={"enabled"}>Yes (Delete Comment)</button>
          <button type="submit" onClick={closeModal} className={"accent"}>No (Keep Comment)</button>
                </form>
            </div> */}
            <form className="comment-update-modal-container">
                <textarea
                    type="text"
                    className={`comment-modal-comments-submit-input ${placeHolderColor}`}
                    placeholder={displayErrors || "Edit comment"}
                    value={body}
                    maxLength={500}
                    onChange={(e) => { setBody(e.target.value) }}
                >
                </textarea>
                <br></br>
                <div className="comment-update-modal-submit-button-container">
                    <OpenCommentsFromUpdateModalButton
                        buttonText={"Ok"}
                        commentId={commentId}
                        body={body}
                        modalComponent={<CommentsModal
                            commentId={commentId}
                            ownerId={ownerId}
                            activityId={activityId}
                            activityTitle={activityTitle}
                            type={"comments"}
                            activitiesType={activitiesType}
                            ></CommentsModal>}
                    ></OpenCommentsFromUpdateModalButton>
                    &nbsp;&nbsp;
                    <OpenCommentsFromNoDeleteModalButton
                        buttonText={"Cancel"}
                        modalComponent={<CommentsModal
                            commentId={commentId}
                            ownerId={ownerId}
                            activityId={activityId}
                            activityTitle={activityTitle}
                            type={"comments"}
                            activitiesType={activitiesType}
                            ></CommentsModal>}
                    ></OpenCommentsFromNoDeleteModalButton>
                </div>
            </form>
        </>
    );
}

export default CommentUpdateModal;
