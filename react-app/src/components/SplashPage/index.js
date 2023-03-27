import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./SplashPage.css";
import { getAllFollowedActivitiesThunk, loadAllActivites, getCurrentActivitiesThunk } from "../../store/activities";
import ActivityCard from "../Activities/ActivityCard";

function Splashpage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    let activities = useSelector(loadAllActivites)
    const [ type, setType ] = useState("Following")

    useEffect(() => {
        const activityRestore = async () => {
            await dispatch(getAllFollowedActivitiesThunk());
        };
        activityRestore();
    }, [dispatch]);

    useEffect(() => {
        if (type === "My Activities") {
            dispatch(getCurrentActivitiesThunk())
        }

        else if(type === "Following") {
            dispatch(getAllFollowedActivitiesThunk())
        }
    }, [type])

    if (!activities) {
        return null
    }

    activities?.sort(
        (a, b) => Date.parse(b.activity_date) - Date.parse(a.activity_date)
    );

    return (
        <div className="splash-page-wrapper">
            <br></br>
            <div className="splash-page-title">
                <div></div>
                {/* <select className="splash-page-activity-select" style={{width:"100%"}}>hi</select> */}
            </div>
            <div className="splash-page-body">
                <div className="user-info-container">
                    <div>
                        hi
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
