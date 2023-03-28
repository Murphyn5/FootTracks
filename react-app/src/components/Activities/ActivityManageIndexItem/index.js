import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import './ActivityManageIndexItem.css'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import ActivityDeleteModal from "../ActivityDeleteModal";
import ActivityUpdateModal from "../ActivityUpdateModal";

const ActivityManageIndexItem = ({ activity, count }) => {
    const user = useSelector(state => state.session.user)
    function formattedDate(d) {
        d = new Date(d)
        let month = String(d.getMonth() + 1);
        let day = String(d.getUTCDate());
        const year = String(d.getFullYear());
        return `${month}/${day}/${year}`;
    }

    const date = formattedDate(activity.activity_date)

    if (!activity) {
        return null
    }

    function hours() {
        const hours = Math.floor(activity.duration / 3600)
        if (hours !== 0) {
            return `${hours}:`
        }
        else {
            return ""
        }
    }

    function minutes() {
        const minutes = Math.floor((activity.duration - (Math.floor(activity.duration / 3600) * 3600)) / 60)
        if (minutes !== 0) {
            if (`${minutes}`.length === 1) {
                return `0${minutes}:`
            } else {
                return `${minutes}:`
            }
        }
        else {
            return "00:"
        }
    }

    function seconds() {
        const seconds = activity.duration - Math.floor(activity.duration / 3600) * 3600 - Math.floor((activity.duration - (Math.floor(activity.duration / 3600) * 3600)) / 60) * 60
        if (seconds !== 0) {
            if (`${seconds}`.length === 1) {
                return `0${seconds}`
            } else {
                return `${seconds}`
            }
        }
        else {
            return "00"
        }
    }


    let rowColor
    if (count % 2 === 1) {
        rowColor = "gray"
    }

    return (

        <div className={`activities-manage-item ${rowColor}`}>
            <div>
                {activity.type}
            </div>

            <div>
                {date}
            </div>

            <div>
                {activity.title}
            </div>

            <div>
                {`${hours()}${minutes()}${seconds()}`}
            </div>

            <div>
                {Math.round(activity.distance * 100) / 100} mi
            </div>

            <div>
                {activity.elevation} ft
            </div>
            {/*
            <div>
                {activity.calories}
            </div> */}

            <OpenModalButton
                buttonText={"Delete"}
                modalComponent={<ActivityDeleteModal
                    activityId={activity.id}
                />}>

            </OpenModalButton>

            <OpenModalButton
                buttonText={"Edit"}
                modalComponent={<ActivityUpdateModal
                    activity={activity}
                />}
            >

            </OpenModalButton>


        </div>
    );
};

export default ActivityManageIndexItem;
