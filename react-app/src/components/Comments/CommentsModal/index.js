// frontend/src/components/deleteFormModal/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useEffect } from "react";
import "./CommentsModal.css";
import { getActivityCommentsThunk, loadAllComments } from "../../../store/comments";
import { getActivityLikesThunk, loadAllLikes, postLikeThunk, deleteLikeThunk } from "../../../store/likes";
import { getAllFollowedActivitiesThunk, getCurrentActivitiesThunk } from "../../../store/activities";
import CommentCard from "../CommentCard";
import KudosCard from "../KudosCard";
import { postCommentThunk } from "../../../store/comments";

function CommentsModal({ ownerProfilePicture, activityTitle, activityId, initialLoad, type, ownerId, activitiesType }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const comments = useSelector(loadAllComments)
    const likes = useSelector(loadAllLikes)
    const user = useSelector((state) => state.session.user)
    const [kudosClassName, setKudosClassName] = useState("comment-modal-kudos-tab")
    const [commentsClassName, setCommentsClassName] = useState("comment-modal-comments-tab")
    const [contentType, setContentType] = useState("")
    const [body, setBody] = useState("")
    const [displayErrors, setDisplayErrors] = useState("Add a comment")
    const [placeHolderColor, setPlaceHolderColor] = useState("")
    const [kudosBoolean, setKudosBoolean] = useState(false)
    const [disabled, setDisabled] = useState("")
    useEffect(() => {
        if (initialLoad) {
            const commentAndLikesRestore = async () => {
                await dispatch(getActivityCommentsThunk(activityId))
                await dispatch(getActivityLikesThunk(activityId))
            }
            commentAndLikesRestore()
        } else {
            const activityRestore = async () => {
                if (activitiesType === "Following") {
                    await dispatch(getAllFollowedActivitiesThunk())
                }
                else if (activitiesType === "My Activities") {
                    await dispatch(getCurrentActivitiesThunk());
                }
            }
            activityRestore()
        }

        if (type === "comments") {
            setCommentsClassName("comment-modal-comments-tab-active")
            setContentType("comments")
        }
        if (type === "kudos") {
            setKudosClassName("comment-modal-kudos-tab-active")
            setContentType("kudos")
        }

        if (ownerId === user.id) {
            setDisabled("disabled")
        }

    }, [])

    useEffect(() => {
        const likedUserIds = likes.map((likedUser) => {
            return likedUser.id
        })
        if (!likedUserIds.includes(user.id)) {
            setKudosBoolean(false)
        } else {
            setKudosBoolean(true)
        }
    }, [likes])


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




        if (validationErrors.length === 0) {
            let createdComment = await dispatch(postCommentThunk(newComment, activityId));
            if (!createdComment.errors) {
                setBody("")
                setDisplayErrors("Add a comment")
                setPlaceHolderColor("")
                if (activitiesType === "Following") {
                    await dispatch(getAllFollowedActivitiesThunk())
                }
                else if (activitiesType === "My Activities") {
                    await dispatch(getCurrentActivitiesThunk());
                }
            }
            else {
                createdComment.errors.forEach((error) => { validationErrors.push(error) })
                setBody("")
                const error = validationErrors[0].split(": ")[1]
                setDisplayErrors(error)
                setPlaceHolderColor("placeholder");
            }
        }
    };

    const kudosSubmit = async () => {
        if (!kudosBoolean) {
            await dispatch(postLikeThunk(activityId))
            if (activitiesType === "Following") {
                await dispatch(getAllFollowedActivitiesThunk());
            }
            else if (activitiesType === "My Activities") {
                await dispatch(getCurrentActivitiesThunk());
            }
        } else {
            await dispatch(deleteLikeThunk(activityId))
            if (activitiesType === "Following") {
                await dispatch(getAllFollowedActivitiesThunk());
            }
            else if (activitiesType === "My Activities") {
                await dispatch(getCurrentActivitiesThunk());
            }
        }
    }

    const kudosButtonText = () => {
        if (kudosBoolean) {
            return "Remove Kudos"
        } else {
            return "Give Kudos"
        }
    }


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
                                    ownerId={ownerId}
                                    activitiesType={activitiesType}
                                    ownerProfilePicture={ownerProfilePicture}
                                >
                                </CommentCard>
                            )
                        })}
                    </div>
                    <form onSubmit={onSubmit} className="comment-modal-comments-submit-container">
                        <div className="comment-modal-comments-submit-container-profile-icon">
                            {user.profile_picture ?
                                <img src={user.profile_picture}></img>
                                :
                                <i className="fas fa-user-circle" style={{ fontSize: "24px" }} />

                            }
                        </div>
                        <textarea
                            type="text"
                            className={`comment-modal-comments-submit-input ${placeHolderColor}`}
                            placeholder={displayErrors || "Add a comment"}
                            value={body}
                            onChange={(e) => { setBody(e.target.value) }}
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
                        {likes.map((like) => {
                            return (
                                <KudosCard
                                    likedUser={like}
                                    key={like.id}
                                    activityTitle={activityTitle}
                                    activityId={activityId}
                                    ownerId={ownerId}>
                                </KudosCard>
                            )
                        })}
                    </div>
                    <div className="comment-modal-kudos-submit-container">
                        <button onClick={kudosSubmit} disabled={disabled} className={`comment-modal-kudos-submit-button ${disabled}`}>{kudosButtonText()}</button>
                    </div>
                </>
            )
        }
    }


    return (
        <>
            <div className="comment-modal-container">

                <div className="comment-modal-activity-info-container">
                    <div className="comment-modal-owner-image">
                        {ownerProfilePicture ?
                            <img src={ownerProfilePicture}></img>
                            :
                            <i className="fas fa-user-circle" />

                        }
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
