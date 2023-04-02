import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./ProfileImageModal.css";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { authenticate } from "../../../store/session";
import { getAllFollowedActivitiesThunk, getCurrentActivitiesThunk } from "../../../store/activities";



function ProfileImageModal({ type, userId }) {
    const { closeModal } = useModal();
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch(`/api/users/${userId}/profile`, {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            dispatch(authenticate())
            console.log(type)
            if(type === "Following"){
                dispatch(getAllFollowedActivitiesThunk())
            }
            if(type === "My Activities"){
                dispatch(getCurrentActivitiesThunk())
            }
            closeModal()
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    useEffect(() => {
        if(image){
            setDisabled(false)
        }
    }, [image])

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="profile-image-form-container">
            <label class="custom-file-upload"> Choose File
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </label>

            {image &&
                <>
                    <br></br>
                    <img src={URL.createObjectURL(image)} alt="Preview" className="image-preview" style={{
                        width: "320px",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "4px"
                    }} />
                    <br></br>
                </>}
            <button className={disabled ? `comments-modal-delete-button disabled` : `comments-modal-delete-button`} disabled={disabled} type="submit">Upload</button>
            {(imageLoading) && <p>Loading...</p>}
        </form>
    )
}




export default ProfileImageModal;
