// import { getActivityCommentsThunk } from "./comments";

/* ----- CONSTANTS ----- */
const GET_CURRENT_ACTIVITIES = "activities/GET_CURRENT_ACTIVITIES";
const POST_ACTIVITY = "activities/POST_ACTIVITY";
const DELETE_ACTIVITY = "activities/DELETE_ACTIVITY";
const EDIT_ACTIVITY = "activities/EDIT_ACTIVITY";
const GET_ALL_ACTIVITIES = "activities/GET_ALL_ACTIVITIES";

/* ----- Selector ----- */
export const loadAllActivites = (state) => Object.values(state.activities.activities)

/* ----- ACTIONS ----- */
const getAllActivitiesAction = (activities) => {
  return {
    type: GET_ALL_ACTIVITIES,
    activities,
  };
};

const getCurrentActivitiesAction = (activities) => {
  return {
    type: GET_CURRENT_ACTIVITIES,
    activities,
  };
};

const postActivityAction = (activity) => {
  return {
    type: POST_ACTIVITY,
    activity,
  };
};

const deleteActivityAction = (id) => {
  return {
    type: DELETE_ACTIVITY,
    id,
  };
};

const editActivityAction = (activity) => {
  return {
    type: EDIT_ACTIVITY,
    activity,
  };
};

/* ----- THUNKS ----- */

// Delete activity by id
export const deleteActivityThunk = (activityId) => async (dispatch) => {
  const res = await fetch(`/api/activities/${activityId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteActivityAction(activityId));
  }
};

//get all activities
export const getAllActivitiesThunk = () => async (dispatch) => {
  const res = await fetch(`/api/activities`);
  if (res.ok) {
    const activities = await res.json();
    dispatch(getAllActivitiesAction(activities));
  }
};

// Display current user activities
export const getCurrentActivitiesThunk = () => async (dispatch) => {
  const res = await fetch(`/api/activities/current`);
  if (res.ok) {
    const activities = await res.json();
    console.log(activities)
    dispatch(getCurrentActivitiesAction(activities));
  }
};

// Create a new activity
export const postActivityThunk = (newActivity) => async (dispatch) => {
  const res = await fetch(`/api/activities/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newActivity),
  });
  if (res.ok) {
    const createdActivity = await res.json();
    dispatch(postActivityAction(createdActivity));
    return createdActivity;
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return {"errors": ["A server error occurred. Please try again."]};
  }
};


// Edit a activity by id
export const editActivityThunk =
  (activityContent, activityId) => async (dispatch) => {
    const res = await fetch(`/api/activities/${activityId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activityContent),
    });

    if (res.ok) {
      const editedActivity = await res.json();
      dispatch(editActivityAction(editedActivity));
      return editedActivity;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data;
      }
    } else {
      return {"errors": ["A server error occurred. Please try again."]};
    }
  };


/* ----- INITIAL STATE ----- */
const initialState = {
  activities: {},
  singleActivity: {}
};

/* ----- REDUCER ----- */
const activityReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_CURRENT_ACTIVITIES:
      newState.activities = action.activities.activities;
      return newState;
    case POST_ACTIVITY:
      newState.singleActivity = action.activity;
      return newState;
    case DELETE_ACTIVITY:
      if (newState.activities) {
        delete newState.activities[action.id];
      }
      console.log(newState)
      console.log(newState.activities)
      return newState;
    case EDIT_ACTIVITY:
      newState.singleActivity = action.activity;
      return newState;
    case GET_ALL_ACTIVITIES:
      newState.activities = action.activities.activities;
      return newState;
    default:
      return state;
  }
};

export default activityReducer;
