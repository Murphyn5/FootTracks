// frontend/src/components/deleteFormModal/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useEffect } from "react";
import "./CommentsModal.css";
import { getActivityCommentsThunk, loadAllComments } from "../../../store/comments";
import CommentCard from "../CommentCard";
import { postCommentThunk } from "../../../store/comments";

function CommentsModal({ activityTitle, activityId, initialLoad, type, ownerId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const comments = useSelector(loadAllComments)
    const [kudosClassName, setKudosClassName] = useState("comment-modal-kudos-tab")
    const [commentsClassName, setCommentsClassName] = useState("comment-modal-comments-tab")
    const [contentType, setContentType] = useState("")
    const [body, setBody] = useState("")
    const [displayErrors, setDisplayErrors] = useState("Add a comment")
    const [placeHolderColor, setPlaceHolderColor] = useState("")

    useEffect(() => {
        if (initialLoad) {
            const commentRestore = async () => {
                await dispatch(getActivityCommentsThunk(activityId))
            }
            commentRestore()
        }
        if (type === "comments") {
            setCommentsClassName("comment-modal-comments-tab-active")
            setContentType("comments")
        }
        if (type === "kudos") {
            setKudosClassName("comment-modal-kudos-tab-active")
            setContentType("kudos")
        }
    }, [])


    const kudosClick = () => {
        if (kudosClassName === "comment-modal-kudos-tab") {
            setKudosClassName("comment-modal-kudos-tab-active")
            setContentType("kudos")
            setCommentsClassName("comment-modal-comments-tab")
        }
    }


    const commentsClick = () => {
        if (commentsClassName === "comment-modal-comments-tab") {
            setCommentsClassName("comment-modal-comments-tab-active")
            setKudosClassName("comment-modal-kudos-tab")
            setContentType("comments")
        }
    }

    const onSubmit = async (e) => {
        let validationErrors = []
        e.preventDefault();
        const newComment = {
            body: body
        };

        console.log(newComment)



        if (validationErrors.length === 0) {
            let createdComment = await dispatch(postCommentThunk(newComment, activityId));
            console.log(createdComment)
            if (!createdComment.errors) {
                setBody("")
                setDisplayErrors("Add a comment")
                setPlaceHolderColor("")
            }
            else {
                createdComment.errors.forEach((error) => { validationErrors.push(error) })
                setBody("")
                console.log(validationErrors)
                console.log(validationErrors[0].split(": ")[1])
                const error = validationErrors[0].split(": ")[1]
                setDisplayErrors(error)
                setPlaceHolderColor("placeholder");
            }
        }
    };


    const contentTypeChecker = () => {
        if (contentType === "comments") {
            return (
                <>
                    <div className="comment-modal-comments-container" style={{ minHeight: "211px", maxHeight: "805px" }}>
                        {comments.map((comment) => {
                            return (
                                <CommentCard comment={comment}
                                    key={comment.id}
                                    activityTitle={activityTitle}
                                    activityId={activityId}
                                    ownerId={ownerId}>
                                </CommentCard>
                            )
                        })}
                    </div>
                    <form  onSubmit={onSubmit} className="comment-modal-comments-submit-container">
                        <div className="comment-modal-comments-submit-container-profile-icon">
                            <i className="fas fa-user-circle" style={{ fontSize: "24px" }} />
                        </div>
                        <textarea
                            type="text"
                            className={`comment-modal-comments-submit-input ${placeHolderColor}`}
                            placeholder={displayErrors || "Add a comment"}
                            value={body}
                            onChange={(e)=>{setBody(e.target.value)}}
                        >
                        </textarea>
                        <div className="comment-modal-comments-submit-button-container">
                            <button type="submit" className="comment-modal-comments-submit-button">
                                Post
                            </button>
                        </div>
                    </form>

                </>

            )
        }

        if (contentType === "kudos") {
            return (
                <>
                    <div className="comment-modal-kudos-container" style={{ maxHeight: "568px", minHeight: "211px" }}>

                    </div>
                    <div className="comment-modal-kudos-submit-container">
                        <button className="comment-modal-kudos-submit-button">Give Kudos</button>
                    </div>
                </>
            )
        }
    }


    return (
        <>
            <div className="comment-modal-container">

                <div className="comment-modal-activity-info-container">
                    <div className="activity-card-owner-image">
                        <i className="fas fa-user-circle" />
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div className="comment-modal-title">{activityTitle}</div>
                </div>
                <div className="comment-modal-tabs-container">
                    <div onClick={kudosClick} className={kudosClassName} >
                        Kudos
                    </div>
                    <div onClick={commentsClick} className={commentsClassName} >
                        Comments ({comments.length})
                    </div>
                </div>
                {contentTypeChecker()}


            </div>
        </>
    );
}

export default CommentsModal;
