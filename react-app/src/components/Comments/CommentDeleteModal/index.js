// frontend/src/components/deleteFormModal/index.js
import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./CommentDeleteModal.css";
import { deleteCommentThunk } from "../../../store/comments";
import OpenCommentsFromDeleteModalButton from "../../OpenCommentsFromDeleteModalButton";
import OpenCommentsFromNoDeleteModalButton from "../../OpenCommentsFromNoDeleteModalButton";
import { getAllFollowedActivitiesThunk, getCurrentActivitiesThunk, decreaseCommentsLengthAction } from "../../../store/activities";
import CommentsModal from "../CommentsModal";


function CommentDeleteModal({ ownerProfilePicture, commentId, activityTitle, activityId, ownerId, activitiesType, userProfile, userId }) {
    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(deleteCommentThunk(commentId))
        await dispatch(decreaseCommentsLengthAction(activityId))
        closeModal()
    };

    return (
        <>
            <div className="comment-delete-container w-[300px] h-[163px] md:w-[600px] md:h-[123px]">
                <form className={"comment-delete-form"} onSubmit={handleSubmit}>
                    <span>
                        Are you sure you want to delete this comment? You can not undo this action.
                    </span>
                    <br className="md:hidden"></br>
                    <div>
                        <OpenCommentsFromNoDeleteModalButton
                            buttonText={"Cancel"}
                            modalComponent={<CommentsModal
                                commentId={commentId}
                                ownerId={ownerId}
                                activityId={activityId}
                                ownerProfilePicture={ownerProfilePicture}
                                activityTitle={activityTitle}
                                type={"comments"}
                                activitiesType={activitiesType}
                                userProfile={userProfile}
                                userId={userId}
                                ></CommentsModal>}
                        ></OpenCommentsFromNoDeleteModalButton>
                        &nbsp;&nbsp;
                        <OpenCommentsFromDeleteModalButton
                            buttonText={"Ok"}
                            commentId={commentId}
                            activityId={activityId}
                            modalComponent={<CommentsModal
                                commentId={commentId}
                                ownerId={ownerId}
                                activityId={activityId}
                                ownerProfilePicture={ownerProfilePicture}
                                activityTitle={activityTitle}
                                type={"comments"}
                                activitiesType={activitiesType}
                                userProfile={userProfile}
                                userId={userId}
                                ></CommentsModal>}
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
