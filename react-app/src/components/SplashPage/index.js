import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./SplashPage.css";
import { getAllFollowedActivitiesThunk, loadAllActivites, getCurrentActivitiesThunk, getLatestActivityAction } from "../../store/activities";
import ActivityCard from "../Activities/ActivityCard";

function Splashpage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    let activities = useSelector(loadAllActivites)
    const latestActivity = useSelector((state) => state.activities.latestActivity)
    const [type, setType] = useState("Following")

    function formattedDate(d) {
        d = new Date(d)
        let month = String(d.getMonth() + 1);
        let day = String(d.getUTCDate());
        const year = String(d.getFullYear());
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        const dayOfWeek = String(d.getDay())
        return `${month}/${day}/${year}`;
    }

    useEffect(() => {
        const activityRestore = async () => {
            await dispatch(getCurrentActivitiesThunk())
            await dispatch(getAllFollowedActivitiesThunk());
        };
        activityRestore();
    }, [dispatch]);

    useEffect(() => {
        if (type === "My Activities") {
            dispatch(getCurrentActivitiesThunk())
        }

        else if (type === "Following") {
            dispatch(getAllFollowedActivitiesThunk())
        }
    }, [type])

    // useEffect(() => {
    //     activities?.sort(
    //         (a, b) => Date.parse(b.activity_date) - Date.parse(a.activity_date)
    //     );
    //     dispatch(getLatestActivityAction(activities[0]))
    // }, [activities])

    if (!activities || !sessionUser || !latestActivity) {
        return null
    }

    activities?.sort(
        (a, b) => Date.parse(b.activity_date) - Date.parse(a.activity_date)
    );

    // if(activities){
    //      dispatch(getLatestActivityAction(activities[0]))

    // }

    return (
        <div className="splash-page-wrapper">
            <br></br>
            <div className="splash-page-title">
                <div></div>
                {/* <select className="splash-page-activity-select" style={{width:"100%"}}>hi</select> */}
            </div>
            <div className="splash-page-body">
                <div className="splash-page-user-info-container ">
                    <h2>
                        {`${sessionUser.first_name} ${sessionUser.last_name}`}
                    </h2>
                    <div className="splash-page-user-info-stats">
                        <div className="splash-page-user-info-stat">
                            <div className="splash-page-descriptor">Following</div>
                            <div>{sessionUser.following_length}</div>
                        </div>
                        <div className="splash-page-user-info-stat" style={{borderLeft:"solid 1px rgb(223, 223, 232)",borderRight:"solid 1px rgb(223, 223, 232)"}}>
                            <div className="splash-page-descriptor">Followers</div>
                            <div>{sessionUser.followers_length}</div>
                        </div>
                        <div className="splash-page-user-info-stat">
                            <div className="splash-page-descriptor">Activities</div>
                            <div>{sessionUser.activities_length}</div>
                        </div>
                    </div>
                    <br></br>
                    <hr style={{borderTop:"#6d6d78", width:"100%"}}></hr>
                    <div className="splash-page-latest-activity-container">
                        <div className="splash-page-descriptor">Latest Activity</div>
                        <div><strong>{latestActivity.title}</strong> &bull; {formattedDate(latestActivity.activity_date)} </div>
                    </div>

                </div>
                <div className="activities-container">
                    <select className="splash-page-activity-select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option className="splash-page-activity-option" value="Following">Following</option>
                        <option className="splash-page-activity-option" value="My Activities">My Activities</option>
                    </select>
                    {activities.map((activity) => {
                        return (
                            <ActivityCard
                                activity={activity}
                                key={activity.id}
                                activitiesType={type}
                            />
                        );
                    })}
                </div>
            </div>
        </div>

    );
}

export default Splashpage;
