import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import './ActivityCard.css'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import ActivityDeleteModal from "../ActivityDeleteModal";

const ActivityCard = ({ activity }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    function formattedDate(d) {
        d = new Date(d)
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());
        return `${month}/${day}/${year}`;
    }

    const date = formattedDate(activity.created_at)

    if (!activity) {
        return null
    }

    const handleDeleteRedirect = () => {
        // history.push(`/activitys/${activity.id}/delete`)
        // Open delete modal
    }

    const handleEditRedirect = () => {
        history.push(`/activities/${activity.id}/edit`)
    }

    const deleteRender = () => {
        if (user) {
            if (user.id === activity.owner_id) {
                return (
                    <OpenModalButton
                        buttonText={"delete Activity"}
                        modalComponent={<ActivityDeleteModal activityId={activity.id}/>}>


                    </OpenModalButton>
                    // <div className="activity-card-delete-button-container">
                    //     <i className="fa-solid fa-trash"></i>
                    //     &nbsp;<div><span className={"activity-card-delete-button"} onClick={handleDeleteRedirect}> Delete Review</span></div>
                    // </div>
                )
            }
        }
    }

    const editRender = () => {
        if (user) {
            if (user.id === activity.owner_id) {
                return (
                    <div className="activity-card-edit-button-container">
                        <i className="fa-solid fa-pen-to-square"></i>
                        &nbsp; <div><span className={"activity-card-edit-button"} onClick={handleEditRedirect}> Edit Review</span></div>
                    </div>
                )
            }
        }
    }

    return (
        <div className="activity-card">

            <div className="activity-card-owner-container">
                <div className="activity-card-owner-image">
                    <i className="fas fa-user-circle" />
                </div>
                <div className="activity-card-owner-information">
                    <div className="activity-card-owner-name">{`${activity.owner_first_name} ${activity.owner_last_name[0]}.`}</div>
                    <div className="activity-card-manage-buttons-container">
                        {deleteRender()}
                        {editRender()}
                    </div>

                </div>
            </div>

            <br></br>

            <div className="activity-card-rating-and-date-container">
                <div className="activity-card-date">{date}</div>
            </div>

            <br></br>

            <div className="activity-card-photos-buttons-container">
                {/* {imagesLinkRender()}
                {addPhotoRender()} */}
            </div>

            <br></br>
            <div className="activity-card-images-activity">{activity.title}</div>
            <br></br>
            {/* {imagesRender()} */}
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
