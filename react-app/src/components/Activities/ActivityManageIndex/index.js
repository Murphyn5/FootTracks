import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentActivitiesThunk, loadAllActivites } from "../../../store/activities";
import ActivityManageIndexItem from "../ActivityManageIndexItem";
import './ActivityManageIndex.css'

function ActivitiesManageIndex() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    let activities = useSelector(loadAllActivites)

    useEffect(() => {
        const activityRestore = async () => {
            await dispatch(getCurrentActivitiesThunk());
        };
        activityRestore();
    }, [dispatch]);

    if (!activities) {
        return null
    }

    console.log(activities)

    return (
        <>
            <div className="activities-manage-container-background">
                <div className="activities-manage-container">
                    <h1>My Activities</h1>
                    <div style={{lineHeight:"22px",fontWeight:"400",fontSize:"22px"}}>{activities.length} Activities</div>
                    <hr style={{marginBottom: "0",borderBottom:"0"}}></hr>
                    {activities.map((activity) => {
                        return (
                            <ActivityManageIndexItem activity={activity} key={activity.id} />
                        );
                    })}
                </div>
            </div>
        </>

    );
}

export default ActivitiesManageIndex;
