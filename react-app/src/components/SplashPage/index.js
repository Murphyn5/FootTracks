import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./SplashPage.css";
import { useEffect } from "react";
import { getAllActivitiesThunk, loadAllActivites } from "../../store/activities";
import ActivityCard from "../Activities/ActivityCard";

function Splashpage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    let activities = useSelector(loadAllActivites)

    useEffect(() => {
        const activityRestore = async () => {
            await dispatch(getAllActivitiesThunk());
        };
        activityRestore();
    }, [dispatch]);

    if (!activities) {
        return null
    }

    console.log(activities)


  activities?.sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
  );

    return (
        <div className="splash-page-body">
            <div className="user-info-container">
                <div>
                    hi
                </div>
            </div>
            <div className="activities-container">
                {activities.map((activity) => {
                    return (
                        <ActivityCard
                            activity={activity}
                            key={activity.id}
                        />
                    );
                })}
            </div>
        </div>

    );
}

export default Splashpage;
