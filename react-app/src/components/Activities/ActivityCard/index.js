import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import './ActivityCard.css'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OpenCommentsModalButton from "../../OpenCommentsModalButton";
import OpenKudosModalButton from "../../OpenKudosModalButton";
import CommentsModal from "../../Comments/CommentsModal";
import { postLikeThunk, deleteLikeThunk, loadAllLikes } from "../../../store/likes";
import { getAllFollowedActivitiesThunk } from "../../../store/activities";

const ActivityCard = ({ activity, activitiesType }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [kudosBoolean, setKudosBoolean] = useState(false)
    const [disabled, setDisabled] = useState("")
    const [liked, setLiked] = useState("")

    function formattedDate(d) {
        d = new Date(d)
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        const dayOfWeek = String(d.getDay())
        return `${days[dayOfWeek]} ${month}/${day}/${year}`;
    }

    const date = formattedDate(activity.created_at)

    useEffect(() => {
        const likedUserIds = activity.liked_users.map((likedUser) => {
            return likedUser.id
        })
        if (!likedUserIds.includes(user.id)) {
            setKudosBoolean(false)
            setLiked("")
        } else {
            setKudosBoolean(true)
            setLiked("liked")
        }
        if (activity.owner_id === user.id) {
            setDisabled("disabled")
        }
    }, [activity.liked_users])

    if (!activity) {
        return null
    }

    function symbolRender() {
        if (activity.type === "Ride") {
            return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><i style={{ fontSize: "20px" }} className="fa-solid fa-bicycle"></i></div>
        }
        if (activity.type === "Run") {
            return <div style={{ display: "flex", justifyContent: "center" }}><i style={{ fontSize: "20px" }} className="fa-solid fa-person-running"></i></div>
        }
        if (activity.type === "Hike") {
            return <div style={{ display: "flex", justifyContent: "center" }}><i style={{ fontSize: "20px" }} className="fa-solid fa-person-hiking"></i></div>
        }
        if (activity.type === "Walk") {
            return <div style={{ display: "flex", justifyContent: "center" }}><i style={{ fontSize: "20px" }} className="fa-solid fa-person-walking-with-cane"></i></div>
        }
    }

    function hours() {
        const hours = Math.floor(activity.duration / 3600)
        if (hours !== 0) return `${hours}h`

    }

    function minutes() {
        const minutes = Math.floor((activity.duration - (Math.floor(activity.duration / 3600) * 3600)) / 60)
        if (minutes !== 0) return `${minutes}m`

    }

    function seconds() {
        const seconds = activity.duration - Math.floor(activity.duration / 3600) * 3600 - Math.floor((activity.duration - (Math.floor(activity.duration / 3600) * 3600)) / 60) * 60
        if (seconds !== 0) return `${seconds}s`

    }

    const kudosSubmit = async () => {
        if (!kudosBoolean) {
            await dispatch(postLikeThunk(activity.id))
            await dispatch(getAllFollowedActivitiesThunk());
        } else {
            await dispatch(deleteLikeThunk(activity.id))
            await dispatch(getAllFollowedActivitiesThunk());
        }
    }


    return (
        <div className="activity-card">
            <div className="activity-card-content">

                <div className="activity-card-owner-container">
                    <div className="activity-card-owner-image">
                        <i className="fas fa-user-circle" />
                    </div>
                    <div className="activity-card-owner-information">
                        <div className="activity-card-owner-name">{`${activity.owner_first_name} ${activity.owner_last_name[0]}.`}</div>
                        <div className="activity-card-rating-and-date-container">
                            <div className="activity-card-date">{date}</div>
                        </div>
                    </div>
                </div>

                <div className="activity-card-type-title-container">
                    {symbolRender()}
                    <div className="activity-card-title">
                        {activity.title}
                    </div>
                </div>

                <div className="activity-card-description-container">
                    <div></div>
                    <div>{activity.description}</div>
                </div>

                <div className="activity-card-description-container">
                    <div></div>
                    <div className="activity-card-stats-headers-container">
                        <div>Distance</div>
                        <div>Elev Gain</div>
                        <div>Time</div>
                    </div>
                </div>

                <div className="activity-card-description-container">
                    <div></div>
                    <div className="activity-card-stats-container">
                        <div>{Math.round(activity.distance * 100) / 100} mi</div>
                        <div>{activity.elevation} ft</div>
                        <div>
                            {hours()} {minutes()}  {seconds()}
                        </div>
                    </div>
                </div>


            </div>
            <div className="activity-card-related-info-buttons-container">
                <OpenKudosModalButton
                    modalComponent={
                        <CommentsModal
                            activityTitle={activity.title}
                            activityId={activity.id}
                            initialLoad={true}
                            type="kudos"
                            ownerId={activity.owner_id}
                            activitiesType={activitiesType}
                            >
                        </CommentsModal>}
                    likesLength={activity.likes_length}
                ></OpenKudosModalButton>
                <div>
                    <button onClick={kudosSubmit} disabled={disabled} className={`kudos-button ${disabled}`}>
                        <i className={`fa-regular fa-thumbs-up ${liked}`} style={{ position: "relative", top: "1px" }}></i>
                    </button>
                    &nbsp;
                    <OpenCommentsModalButton
                        modalComponent={
                            <CommentsModal
                                activityTitle={activity.title}
                                activityId={activity.id}
                                initialLoad={true}
                                type="comments"
                                ownerId={activity.owner_id}
                                activitiesType={activitiesType}
                                >
                            </CommentsModal>}
                        commentsLength={activity.comments_length}
                    >
                    </OpenCommentsModalButton>
                </div>

            </div>
        </div>
    );
};

export default ActivityCard;
