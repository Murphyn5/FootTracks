import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, useHistory } from "react-router-dom";
import "./SplashPage.css";
import img from './/header_image-39d887c771c7094d2adeb4fe67589f471f70bb3fc26e66b69a7e4edf29f90ce6.jpeg'
import { getAllFollowedActivitiesThunk, loadAllActivites, getCurrentActivitiesThunk, getLatestActivityAction } from "../../store/activities";
import ActivityCard from "../Activities/ActivityCard";
import ProfileImageModal from "./ProfileImageModal";
import OpenProfileImageModalButton from "../OpenProfileImageModalButton";

function Splashpage() {
    const dispatch = useDispatch();
    const history = useHistory()
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
        if (type === "My Activities") {
            dispatch(getCurrentActivitiesThunk())
        }

        else if (type === "Following") {
            dispatch(getAllFollowedActivitiesThunk())
        }
    }, [type])

    if (!activities || !sessionUser || !latestActivity) {
        return null
    }

    activities?.sort(
        (a, b) => Date.parse(b.activity_date) - Date.parse(a.activity_date)
    );

    // if(activities){
    //      dispatch(getLatestActivityAction(activities[0]))

    // }

    const redirectToTracker = () => {
        history.push("/activities/new")
    }

    const showAlert = () => {
        alert("Feature Coming Soon");
    }

    const findFriends = () => {
        history.push(`/users/search/`)
    }

    return (
        <div className="splash-page-wrapper">
            <div className="splash-page-body grid-cols-1 lg:grid-cols-5">
                <div className="splash-page-user-info-container mt-[60px] lg:mt-[80px]">
                    {sessionUser.profile_picture ?
                        <img className="splash-page-user-info-icon" src={sessionUser.profile_picture}></img>
                        :
                        <i className="fas fa-user-circle splash-page-user-info-icon" />

                    }
                    <OpenProfileImageModalButton
                        modalComponent={<ProfileImageModal userId={sessionUser.id} type={type}> </ProfileImageModal>}
                    ></OpenProfileImageModalButton>
                    <br></br>
                    <br></br>
                    <h2>
                        {`${sessionUser.first_name} ${sessionUser.last_name}`}
                    </h2>
                    <div className="splash-page-user-info-stats">
                        <div className="splash-page-user-info-stat">
                            <div className="splash-page-descriptor">Following</div>
                            <div>{sessionUser.following_length}</div>
                        </div>
                        <div className="splash-page-user-info-stat" style={{ borderLeft: "solid 1px rgb(223, 223, 232)", borderRight: "solid 1px rgb(223, 223, 232)" }}>
                            <div className="splash-page-descriptor">Followers</div>
                            <div>{sessionUser.followers_length}</div>
                        </div>
                        <div className="splash-page-user-info-stat">
                            <div className="splash-page-descriptor">Activities</div>
                            <div>{sessionUser.activities_length}</div>
                        </div>
                    </div>

                    {Object.values(latestActivity)[0] ?
                        <>
                            <br></br>
                            <hr style={{ borderTop: "#6d6d78", width: "100%" }}></hr>
                            <div className="splash-page-latest-activity-container">
                                <div className="splash-page-descriptor">Latest Activity</div>
                                <div><strong>{latestActivity.title}</strong> &bull; {formattedDate(latestActivity.activity_date)} </div>
                            </div>
                        </>
                        :
                        <>
                            <br></br>
                            <hr style={{ borderTop: "#6d6d78", width: "100%" }}></hr>
                            <div className="splash-page-latest-activity-container-no-activity" onClick={redirectToTracker}>
                                <div style={{ color: "#6d6d78", lineHeight: "30px", padding: "5px" }}><span style={{ color: "#ff5353" }}>Add an Activity.</span> Learn how to record or upload an activity to FootTracks.</div>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </>

                    }
                </div>
                <div className="activities-container lg:col-span-3">
                    {
                        sessionUser.following_length > 0 ?
                            <div className="flex justify-center lg:justify-start my-5">
                                <select className="splash-page-activity-select lg:ml-[80px] "
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option className="splash-page-activity-option" value="Following">Following</option>
                                    <option className="splash-page-activity-option" value="My Activities">My Activities</option>
                                </select>
                            </div>

                            :
                            null
                    }
                    <div className="">
                        {
                            sessionUser.following_length > 0 ? (
                                activities.length > 0 ?
                                    activities.map((activity) => {
                                        return (
                                            <ActivityCard
                                                activity={activity}
                                                key={activity.id}
                                                activitiesType={type}
                                            />
                                        );
                                    })
                                    :
                                    <>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <div className="no-activity-card">
                                            <div>
                                                No more recent activity available.
                                            </div>
                                            <div>
                                                To see your full activity history, visit your Profile or Training Calendar.
                                            </div>
                                        </div>
                                        <div className="no-activity-card">
                                            <div>
                                                No posts yet.
                                            </div>
                                        </div>
                                    </>
                            )
                                :

                                <>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <div className="getting-started-card">
                                        <img src={img}></img>
                                        <div className="getting-started-card-body">
                                            <h3 style={{ fontSize: "28px", fontWeight: "400", margin: "5px 0px 15px 0px" }}>Getting Started</h3>
                                            <div>We’ve listed a couple of steps to help you get set up on FootTracks.</div>
                                            <br></br>
                                            <hr style={{ borderTop: "#6d6d78", width: "100%" }}></hr>
                                            <br></br>
                                            <div className="getting-started-card-body-container">
                                                <i style={{ fontSize: "64px", color: "rgb(0,0,0,.8)" }} className="fa-regular fa-compass"></i>
                                                <div>
                                                    <div style={{ fontWeight: "bold" }}>Record your first activity</div>
                                                    <br></br>
                                                    <div style={{ paddingRight: "30px" }}>
                                                        Set up your GPS device and seamlessly upload your workouts right to FootTracks. No device? No problem – record and connect anytime, anywhere with our mobile app.
                                                    </div>
                                                    <br></br>
                                                    <button onClick={showAlert} className="getting-started-connect-device-button">
                                                        Connect device
                                                    </button>
                                                    <br></br>
                                                    <br></br>
                                                    <hr style={{ borderTop: "#6d6d78", width: "100%" }}></hr>
                                                </div>
                                            </div>
                                            <br></br>
                                            <div className="getting-started-card-body-container">
                                                <i style={{ fontSize: "45px", color: "rgb(0,0,0,.8)" }} className="fa-solid fa-user-group"></i>
                                                <div>
                                                    <div style={{ fontWeight: "bold" }}>See what your friends are doing</div>
                                                    <br></br>
                                                    <div style={{ paddingRight: "30px" }}>
                                                        Find your friends on Strava or invite them to join you. Cheer them on, discover new workouts and start training with the athletes you already know.
                                                    </div>
                                                    <br></br>
                                                    <button onClick={findFriends} className="getting-started-connect-device-button">
                                                        Find Friends
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Splashpage;
