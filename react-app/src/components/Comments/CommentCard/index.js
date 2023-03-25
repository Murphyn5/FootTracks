import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import './CommentCard.css'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenCommentsModalButton from "../../OpenCommentsModalButton";
import OpenKudosModalButton from "../../OpenKudosModalButton";
import OpenModalButton from "../../OpenModalButton";
import CommentDeleteModal from "../CommentDeleteModal";
import { useState } from "react";


const CommentCard = ({ comment, activityTitle, activityId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [hover, setHover] = useState(false)

    function formattedDate(d) {
        d = new Date(d)
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const dayOfWeek = String(d.getDay())
        return `${days[dayOfWeek]} ${month}/${day}/${year}`;
    }

    const date = formattedDate(comment.created_at)

    if (!comment) {
        return null
    }

    const onMouseEnter = () => {
        if (user.id === comment.owner_id) {
            setHover(true)
        }
    }

    const onMouseLeave = () => {
        setHover(false)
    }

    return (
        <div className="comment-card" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {hover ? (
                <div className="comment-card-content">

                    <div className="comment-card-owner-container">
                        <div className="comment-card-owner-image">
                            <i className="fas fa-user-circle" />
                        </div>
                        <div className="comment-card-owner-information">
                            <div className="comment-card-owner-name">
                                <div>
                                    {`${comment.owner_first_name} ${comment.owner_last_name[0]}.`}
                                </div>
                                <div className="comment-card-buttons-container">
                                    <OpenModalButton
                                        buttonText={"Edit"}>

                                    </OpenModalButton>
                                    <OpenModalButton
                                        buttonText={"Delete"}
                                        modalComponent={<CommentDeleteModal activityTitle={activityTitle} activityId={activityId} commentId={comment.id}></CommentDeleteModal>}
                                        >
                                    </OpenModalButton>
                                </div>
                            </div>
                            <div className="comment-card-rating-and-date-container">
                                <div className="comment-card-date">{comment.body}</div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <div className="comment-card-content">

                    <div className="comment-card-owner-container">
                        <div className="comment-card-owner-image">
                            <i className="fas fa-user-circle" />
                        </div>
                        <div className="comment-card-owner-information">
                            <div className="comment-card-owner-name">
                                <div>
                                    {`${comment.owner_first_name} ${comment.owner_last_name[0]}.`}
                                </div>
                                <div className="comment-card-date">
                                    {date}
                                </div>
                            </div>
                            <div className="comment-card-rating-and-date-container">
                                <div className="comment-card-date">{comment.body}</div>
                            </div>
                        </div>
                    </div >

                </div >
            )}
        </div >
    );
};

export default CommentCard;
