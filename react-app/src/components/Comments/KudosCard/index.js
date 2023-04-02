import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import './KudosCard.css'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenCommentsModalButton from "../../OpenCommentsModalButton";
import OpenKudosModalButton from "../../OpenKudosModalButton";
import OpenModalButton from "../../OpenModalButton";
import CommentDeleteModal from "../CommentDeleteModal";
import CommentUpdateModal from "../CommentUpdateModal";
import { useState } from "react";


const KudosCard = ({ likedUser, activityTitle, activityId, ownerId }) => {

    if (!likedUser) {
        return null
    }




    return (
        <div className="kudos-card">
            <div className="kudos-card-content">
                <div className="kudos-card-owner-container">
                    <div className="kudos-card-owner-image">
                        {likedUser.profile_picture ?
                            <img src={likedUser.profile_picture}></img>
                            :
                            <i className="fas fa-user-circle" />

                        }
                    </div>
                    <div className="kudos-card-owner-information">
                        <div className="kudos-card-owner-name">
                            <div>
                                {`${likedUser.first_name} ${likedUser.last_name[0]}.`}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default KudosCard;
