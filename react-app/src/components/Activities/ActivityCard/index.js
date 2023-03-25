import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import './ActivityCard.css'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenCommentsModalButton from "../../OpenCommentsModalButton";
import OpenKudosModalButton from "../../OpenKudosModalButton";
import CommentsModal from "../../Comments/CommentsModal";


const ActivityCard = ({ activity }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

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
                <div>kudos</div>
                <div>
                    <OpenKudosModalButton
                        modalComponent={
                            <CommentsModal
                                activityTitle={activity.title}
                                activityId={activity.id}
                                type="kudos"
                                ownerId={activity.owner_id}>
                            </CommentsModal>}
                    ></OpenKudosModalButton>
                    &nbsp;
                    <OpenCommentsModalButton
                        modalComponent={
                            <CommentsModal
                                activityTitle={activity.title}
                                activityId={activity.id}
                                type="comments"
                                ownerId={activity.owner_id}>
                            </CommentsModal>}
                    >
                    </OpenCommentsModalButton>
                </div>

            </div>
        </div>
    );
};

export default ActivityCard;

    //   const handleImageClick = async (e) => {
    //     const images = {}
    //     review.images.forEach(review => {
    //       images[review.id] = review;
    //     });
    //     await dispatch(getImagesAction({ "images": images }))
    //   }

    // const handleAddImageRedirect = () => {
    //     history.push(`/reviews/${review.id}/images/new`)
    // }

    // const addPhotoRender = () => {
    //     if (user) {
    //       if (user.id === review.owner_id) {
    //         return (
    //           <OpenImageModalButton
    //             buttonText={"image"}
    //             modalComponent={<CreateImageFormModal review_id={review.id} />}
    //           ></OpenImageModalButton>
    //         )
    //       }
    //     }
    //   }


    //   const imagesLinkRender = () => {
    //     if (review.images_length > 1) {
    //       return (
    //         <div className="review-card-images-link-container">
    //           <img src={camera.default}></img>
    //           <div className="review-card-images-link-text">{review.images_length} images</div>
    //         </div>
    //       )
    //     }

    //     else if (review.images_length === 1) {
    //       return (
    //         <Link to={`/reviews/${review.id}/images`}>
    //           <div className="review-card-images-link-container">
    //             <img src={camera.default}></img>
    //             <div className="review-card-images-link-text">{review.images_length} image</div>
    //           </div>
    //         </Link>
    //       )
    //     }
    //   }
    //   let gridColumns
    //   let imageHeight
    //   if (review.images[0]) {
    //     gridColumns = "1fr 1fr"
    //     imageHeight = "400px"
    //   }
    //   if (review.images[1]) {
    //     gridColumns = "1fr 1fr"
    //     imageHeight = "400px"
    //   }
    //   if (review.images[2]) {
    //     gridColumns = "1fr 1fr 1fr 1fr"
    //     imageHeight = "200px"
    //   }

    //   if (review.images[3]) {
    //     gridColumns = "1fr 1fr 1fr 1fr"
    //     imageHeight = "200px"
    //   }

    //   const imageOneRender = () => {
    //     if (review.images[0]) {
    //       return (
    //         <Link to={`/reviews/${review.id}/images`}>
    //           <div style={{ "height": `${imageHeight}`, "backgroundImage": `url("${review.images[0].url}")` }}></div>
    //         </Link>
    //       )
    //     }
    //     return (
    //       <div></div>
    //     )
    //   }


    //   const imageTwoRender = () => {
    //     if (review.images[1]) {
    //       return (
    //         <Link to={`/reviews/${review.id}/images`}>
    //           <div style={{ "height": `${imageHeight}`, "background-image": `url("${review.images[1].url}")` }}></div>
    //         </Link>
    //       )
    //     }
    //     return (
    //       <div></div>
    //     )
    //   }

    //   const imageThreeRender = () => {
    //     if (review.images[2]) {
    //       return (
    //         <Link to={`/reviews/${review.id}/images`}>
    //           <div style={{ "height": `${imageHeight}`, "background-image": `url("${review.images[2].url}")` }}></div>
    //         </Link>
    //       )
    //     }
    //     return (
    //       <div></div>
    //     )
    //   }

    //   const imageFourRender = () => {
    //     if (review.images[3]) {
    //       return (
    //         <Link to={`/reviews/${review.id}/images`}>
    //           <div style={{ "height": `${imageHeight}`, "background-image": `url("${review.images[3].url}")` }}></div>
    //         </Link>
    //       )
    //     }
    //     return (
    //       <div></div>
    //     )
    //   }


    //   const imagesRender = () => {
    //     if (review.images.length > 0) {
    //       return (
    //         <>
    //           <div className="review-card-images-container" style={{ "gridTemplateColumns": `${gridColumns}` }} >
    //             {imageOneRender()}
    //             {imageTwoRender()}
    //             {imageThreeRender()}
    //             {imageFourRender()}
    //             <br></br>
    //           </div>
    //         </>
    //       )
    //     }
    //   }
