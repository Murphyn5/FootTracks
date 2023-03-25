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
        let day = String(d.getDate());
        const year = String(d.getFullYear());
        return `${month}/${day}/${year}`;
    }

    const date = formattedDate(activity.created_at)

    if (!activity) {
        return null
    }
    let rowColor
    if(count % 2 === 1){
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
                {activity.duration}
            </div>

            <div>
                {Math.round(activity.distance * 100) / 100}
            </div>

            <div>
                {activity.elevation}
            </div>

            <div>
                {activity.calories}
            </div>

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
