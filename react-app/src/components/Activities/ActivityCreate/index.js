import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { postActivityThunk } from "../../../store/activities";
import { authenticate } from "../../../store/session";
import "./ActivityCreate.css";


// const inputStyle = (value) => ({
//     borderColor: value ? "initial" : "red",
//     "borderRadius": "5px",
//     "borderStyle": "solid"
// });

const ActivityCreate = () => {
    let initialDate = new Date();

    let day = initialDate.getDate();
    let month = initialDate.getMonth() + 1;
    let year = initialDate.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    let today = year + "-" + month + "-" + day;

    function getCurrentTime() {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    let currentTime = getCurrentTime()

    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [type, setType] = useState("Run");
    const [description, setDescription] = useState("");
    const [distance, setDistance] = useState("")
    const [date, setDate] = useState(today);
    const [time, setTime] = useState(currentTime)
    const [seconds, setSeconds] = useState("");
    const [minutes, setMinutes] = useState("");
    const [hours, setHours] = useState("");
    const [elevation, setElevation] = useState("");
    const [calories, setCalories] = useState("");
    const [distanceType, setDistanceType] = useState("miles")
    const [elevationType, setElevationType] = useState("feet")
    const [distanceError, setDistanceError] = useState("")
    const [durationError, setDurationError] = useState("")
    const [elevationError, setElevationError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [dateTimeError, setDateTimeError] = useState("")
    const [titleError, setTitleError] = useState("")

    // likely need to separate hours of ops M-Sun + inputs for hours
    // then format input data as string for hours of operations
    const onSubmit = async (e) => {
        setDistanceError("")
        setElevationError("")
        setDurationError("")
        setTitleError("")
        setDateTimeError("")
        setDescriptionError("")
        let validationErrors = []
        e.preventDefault();
        let d
        if (distanceType === "kilometers") {
            d = distance * 0.621371
        } else {
            d = distance
        }

        let ele

        if (elevationType === "meters") {
            ele = elevation * 3.28084
        } else {
            ele = elevation
        }


        const newActivity = {
            title: title,
            type: type,
            description: description,
            distance: d,
            coordinates: null,
            duration: (Number(seconds) + Number((minutes * 60)) + Number((hours * 3600))),
            elevation: ele,
            calories: 1,
            date_time: (date)+" "+(time)+":00"
        };




        // helper fxn check image url ending









        if (validationErrors.length === 0) {
            let createdActivity = await dispatch(postActivityThunk(newActivity));
            if (!createdActivity.errors) {
                await dispatch(authenticate())
                history.push(`/`);
            }
            else {
                createdActivity.errors.forEach((error) => { validationErrors.push(error) })
                console.log(validationErrors)
                validationErrors = validationErrors.join("")
                console.log(validationErrors)
                if(validationErrors.includes('distance : This field is required.')){
                    setDistanceError("Distance is required")
                }
                if(validationErrors.includes('duration : This field is required.')){
                    setDurationError("Duration is required")
                }
                if(validationErrors.includes('elevation : Not a valid integer value.')){
                    setElevationError("Elevation is required")
                }
                if(validationErrors.includes('title : This field is required.')){
                    setTitleError("Title is required")
                }
                if(validationErrors.includes('title : Title must be less than 100 characters.')){
                    setTitleError("Title must be less than 100 characters")
                }
                if(validationErrors.includes('description : Description must be less than 500 characters.')){
                    setDescriptionError("Description must be less than 500 characters")
                }
                if (validationErrors.includes("date_time : Activity date can't be set beyond present date.")) {
                    setDateTimeError("Invalid Date")
                }
            }
        }
    };



    useEffect(() => {

        function Title(timeString) {
            const [hours, minutes] = timeString.split(':');
            const time = new Date();
            time.setHours(hours);
            time.setMinutes(minutes);

            if (time.getHours() < 12) {
                return `Morning ${type}`;
            } else if (time.getHours() < 18) {
                return `Afternoon ${type}`;
            } else {
                return `Evening ${type}`;
            }
        }
        if (title === ""
            || title === "Morning Run"
            || title === "Afternoon Run"
            || title === "Evening Run"
            || title === "Morning Ride"
            || title === "Afternoon Ride"
            || title === "Evening Ride"
            || title === "Morning Walk"
            || title === "Afternoon Walk"
            || title === "Evening Walk"
            || title === "Morning Hike"
            || title === "Afternoon Hike"
            || title === "Evening Hike"
        ) {
            setTitle(Title(currentTime))
        }



    }, [type])



    return (
        <>
            <div className="activity-create-container-background">
                <div>

                </div>
                <div className="activity-create-container">
                    <h1>Manual Entry</h1>
                    <form onSubmit={onSubmit} className="activity-create-form">
                        <div className="activity-create-stats-container">
                            <div className="activity-create-distance-container">
                                <div> Distance </div>
                                <input
                                    type="decimal"
                                    min="0"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value)}
                                    style={{ borderRight: "0" }}
                                ></input>
                                <select
                                    value={distanceType}
                                    onChange={(e) => setDistanceType(e.target.value)}
                                >
                                    <option value="miles">miles</option>
                                    <option value="kilometers">kilometers</option>
                                </select>
                                {distanceError ? <div className="error">{distanceError}</div> : <br></br>}
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="activity-create-duration">
                                <div > Duration </div>
                                <div className="activity-create-duration-input-wrapper">
                                    <div className="activity-create-duration-input-container" >
                                        <abbr className="activity-create-duration-placeholder">hr</abbr>
                                        <input
                                            type="number"
                                            min="0"
                                            value={hours}
                                            onChange={(e) => setHours(e.target.value)}
                                            style={{ borderRight: "0" }}
                                        ></input>
                                    </div>
                                    <div className="activity-create-duration-input-container" >
                                        <abbr className="activity-create-duration-placeholder">min</abbr>
                                        <input
                                            type="number"
                                            min="0"
                                            value={minutes}
                                            onChange={(e) => setMinutes(e.target.value)}
                                            style={{ borderRight: "0" }}
                                        ></input>
                                    </div>
                                    <div className="activity-create-duration-input-container">
                                        <abbr className="activity-create-duration-placeholder">s</abbr>
                                        <input
                                            type="number"
                                            min="0"
                                            value={seconds}
                                            onChange={(e) => setSeconds(e.target.value)}
                                        ></input>
                                    </div>

                                </div>
                                {durationError ? <div className="error">{durationError}</div> : <br></br>}
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="activity-create-distance-container">
                                <div> Elevation </div>
                                <input
                                    type="number"
                                    min="0"
                                    value={elevation}
                                    onChange={(e) => setElevation(e.target.value)}
                                    style={{ borderRight: "0" }}
                                ></input>
                                <select
                                    min="0"
                                    value={elevationType}
                                    onChange={(e) => setElevationType(e.target.value)}
                                >
                                    <option value="feet">feet</option>
                                    <option value="meters">meters</option>
                                </select>
                                {elevationError ? <div className="error">{elevationError}</div> : <br></br>}
                            </div>

                        </div>
                        <hr className="hr"></hr>
                        <br></br>
                        <div className="activity-create-type-date-container">
                            <div className="activity-create-type-container">
                                <div> Sport </div>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="Run">Run</option>
                                    <option value="Ride">Ride</option>
                                    <option value="Hike">Hike</option>
                                    <option value="Walk">Walk</option>
                                </select>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="activity-create-distance-container">
                                <div> Date & Time </div>
                                <input
                                    type="date"
                                    min="0"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    style={{ borderRight: "0" }}
                                ></input>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                >
                                </input>
                                {dateTimeError ? <div className="error">{dateTimeError}</div> : <br></br>}
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="activity-create-title-container">
                            <div> Title </div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>
                            {titleError ? <div className="error">{titleError}</div> : <br></br>}
                        </div>
                        <br></br>
                        <br></br>
                        <div className="activity-create-description-container">
                            <div> Description </div>
                            <textarea
                                type="text"
                                value={description}
                                placeholder="How'd it go? Share more about your activity"
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            {descriptionError ? <div className="error">{descriptionError}</div> : <br></br>}
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <hr className="hr"></hr>
                        <br></br>
                        <button type="submit" className="activity-create-submit-button">Create</button>
                    </form>

                </div>
                <div>

                </div>
            </div>
        </>
        // <div className="main-container">
        //     <div className="business-create-container">


        //     </div>
        // </div>
    );
};


export default ActivityCreate;
