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

    activities?.sort(
        (a, b) => Date.parse(b.activity_date) - Date.parse(a.activity_date)
    );
    let count = 1
    return (
        <>
            <div className="bg-white px-[20px] pt-[20px]">
                <h1>My Activities</h1>
                <div style={{ lineHeight: "22px", fontWeight: "400", fontSize: "22px" }}>{activities.length} Activities</div>
            </div>

            <div className="activities-manage-container-background">

                <div className="activities-manage-container">
                    <br></br>
                    <div className="activities-manage-headers">
                        <div>Sport</div>
                        <div>Date</div>
                        <div>Title</div>
                        <div>Duration</div>
                        <div>Distance</div>
                        <div>Elevation</div>
                    </div>
                    <hr style={{ marginBottom: "0", borderBottom: "0" }}></hr>
                    {activities.map((activity) => {
                        count++
                        return (
                            <ActivityManageIndexItem activity={activity} count={count} key={activity.id} />
                        );
                    })}
                </div>
            </div>
        </>

    );
}

export default ActivitiesManageIndex;
