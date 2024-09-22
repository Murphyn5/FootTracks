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
import { getUserThunk } from "../../../store/users";
import { useTracker } from "../../../context/TrackerContext";

const ActivityCard = ({ activity, activitiesType, userProfile, userId }) => {

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

    const date = formattedDate(activity.activity_date)



    useEffect(() => {


        const L = window.L



        let LONDON_CENTRE_LAT_LNG

        if (activity.coordinates) {
            LONDON_CENTRE_LAT_LNG = activity.coordinates.split(";").map((string) => {
                return [Number(string.split(",")[0]), Number(string.split(",")[1])]
            })[0];
        } else {
            LONDON_CENTRE_LAT_LNG = [51.505, -0.09];
        }

        const HIGH_ACCURACY = true;
        const LOW_ACCURACY = false;
        const MAX_CACHE_AGE_MILLISECOND = 30000;
        const MAX_NEW_POSITION_MILLISECOND = 5000;

        if (activity.coordinates) {
            let map = L.map(`tracker${activity.id}`).setView(LONDON_CENTRE_LAT_LNG, 13);


            const trackOptions = {
                enableHighAccuracy: HIGH_ACCURACY,
                maximumAge: MAX_CACHE_AGE_MILLISECOND,
                timeout: MAX_NEW_POSITION_MILLISECOND,
            };

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);


            const latlngs = activity.coordinates.split(";").map((string) => {
                return [Number(string.split(",")[0]), Number(string.split(",")[1])]
            })


            const polyline = L.polyline(latlngs, { color: 'red' })


            polyline.addTo(map)
            map.fitBounds(polyline.getBounds());

        }



    }, [history]);














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
            if (!userProfile) {
                await dispatch(getAllFollowedActivitiesThunk());
            }
            else {
                await dispatch(getUserThunk(userId))
            }
        } else {
            await dispatch(deleteLikeThunk(activity.id))
            if (!userProfile) {
                await dispatch(getAllFollowedActivitiesThunk());
            }
            else {
                await dispatch(getUserThunk(userId))
            }

        }
    }


    return (
        <div className="activity-card w-[350px] md:w-[592px] shadow">
            <div className="activity-card-content w-[320px] md:w-[480px]">

                <div className="activity-card-owner-container">
                    <div className="activity-card-owner-image">
                        {activity.owner_profile_picture ?
                            <img src={activity.owner_profile_picture}></img>
                            :
                            <i className="fas fa-user-circle" />

                        }
                    </div>
                    <div className="activity-card-owner-information ">
                        <Link
                            to={`/users/${activity.owner_id}`}
                        >
                            <span className="activity-card-owner-name hover:underline">{`${activity.owner_first_name} ${activity.owner_last_name[0]}.`}</span>
                        </Link>

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
                        <div className="col-span-2">
                            {hours()} {minutes()}  {seconds()}
                        </div>
                    </div>
                </div>


            </div>

            {activity.coordinates ? <><br></br><div id={`tracker${activity.id}`} className='w-[306px] md:w-[548px]' style={{ height: "218px", borderRadius: "4px", margin: "auto", zIndex: "0" }}></div></>
                : <></>
            }

            <br></br>

            <div className="activity-card-related-info-buttons-container">
                <OpenKudosModalButton
                    modalComponent={
                        <CommentsModal
                            activityTitle={activity.title}
                            activityId={activity.id}
                            initialLoad={true}
                            type="kudos"
                            ownerId={activity.owner_id}
                            ownerProfilePicture={activity.owner_profile_picture}
                            activitiesType={activitiesType}
                            userProfile={userProfile}
                            userId={userId}
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
                                ownerProfilePicture={activity.owner_profile_picture}
                                activitiesType={activitiesType}
                                userProfile={userProfile}
                                userId={userId}
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
