import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { postActivityThunk } from "../../../store/activities";
import "./ActivityCreate.css";


const inputStyle = (value) => ({
    borderColor: value ? "initial" : "red",
    "borderRadius": "5px",
    "borderStyle": "solid"
});

const ActivityCreate = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [elevation, setElevation] = useState("");
    const [calories, setCalories] = useState("");
    // likely need to separate hours of ops M-Sun + inputs for hours
    // then format input data as string for hours of operations
    const [displayErrors, setDisplayErrors] = useState([]);



    const onSubmit = async (e) => {
        let validationErrors = []
        e.preventDefault();
        const newActivity = {
            title: title,
            type: type,
            description: description,
            distance: distance,
            duration: duration,
            elevation: elevation,
            calories: calories,
        };

        console.log(newActivity)



        // helper fxn check image url ending









        if (validationErrors.length === 0) {
            let createdActivity = await dispatch(postActivityThunk(newActivity));
            console.log(createdActivity)
            if (!createdActivity.errors) {
                history.push(`/businesses/${createdActivity.id}`);
            }
            else {
                createdActivity.errors.forEach((error) => { validationErrors.push(error) })
                setDisplayErrors(validationErrors);
            }
        }
    };




    return (
        <div className="main-container">
            <div className="business-create-container">

                <form onSubmit={onSubmit} className="business-form">
                    <h1 className="form-title">Manual Entry</h1>
                    <span>
                        We'll use this information to help you claim your Plate Pal page. Your
                        business will come up automatically if it is already listed.
                    </span>
                    <ul className="errors">{displayErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}</ul>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="business-form-input"
                        style={inputStyle(title)}
                    />
                    <input
                        type="number"
                        placeholder="Elevation"
                        value={elevation}
                        onChange={(e) => setElevation(e.target.value)}
                        className="business-form-input"
                        style={inputStyle(elevation)}
                        pattern="\d{3}-\d{3}-\d{4}"
                        title="Phone number format: xxx-xxx-xxxx"
                    ></input>
                    <input
                        type="number"
                        placeholder="Calories"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        className="business-form-input"
                        style={inputStyle(calories)}
                    ></input>
                    <span>
                        Help customers find your product and service. You can
                        always edit and add more later.{" "}
                    </span>
                    <select
                        value={type}
                        placeholder='Select a type'
                        onChange={(e) => setType(e.target.value)}
                        className="business-form-input"
                        style={inputStyle(type)}
                    >
                        <option value="walking">Walking</option>
                        <option value="running">Running</option>
                        <option value="cycling">Cycling</option>
                        <option value="hiking">Hiking</option>
                    </select>
                    <input
                        type="text"
                        placeholder="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="business-form-input"
                        style={inputStyle(description)}
                    ></input>
                    <input
                        type="number"
                        placeholder="Distance"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        className="business-form-input"
                        style={inputStyle(distance)}
                    ></input>
                    <input
                        type="number"
                        placeholder="Duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="business-form-input"
                        style={inputStyle(duration)}
                    ></input>

                    <br></br>

                    <div>
                    </div>
                    <button type="submit" className="submit-button">Add Business</button>
                </form>

            </div>
        </div>
    );
};


export default ActivityCreate;
