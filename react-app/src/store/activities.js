// import { getActivityCommentsThunk } from "./comments";
/* ----- CONSTANTS ----- */
const GET_CURRENT_ACTIVITIES = "activities/GET_CURRENT_ACTIVITIES";
const GET_LATEST_ACTIVTY = "activities/GET_LATEST_ACTIVTY";
const POST_ACTIVITY = "activities/POST_ACTIVITY";
const DELETE_ACTIVITY = "activities/DELETE_ACTIVITY";
const EDIT_ACTIVITY = "activities/EDIT_ACTIVITY";
const GET_ACTIVITIES = "activities/GET_ACTIVITIES";
const DECREASE_COMMENTS_LENGTH = "activities/DECREASE_COMMENTS_LENGTH";

/* ----- Selector ----- */
export const loadAllActivites = (state) => Object.values(state.activities.activities)

/* ----- ACTIONS ----- */
const getActivitiesAction = (activities) => {
  return {
    type: GET_ACTIVITIES,
    activities,
  };
};

export const getLatestActivityAction = (activity) => {
  return {
    type: GET_LATEST_ACTIVTY,
    activity,
  };
};

export const decreaseCommentsLengthAction = (activityId) => {
  return {
    type: DECREASE_COMMENTS_LENGTH,
    activityId,
  }
}


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
    dispatch(getLatestActivityAction({}))
  }
};

// Display single activity details
// export const getSingleActivityThunk = (id) => async (dispatch) => {
//   const res = await fetch(`/api/activities/${id}`);
//   if (res.ok) {
//     const activity = await res.json();
//     dispatch(getLatestActivityAction(activity));
//     return activity;
//   }
// };

//get all activities
export const getAllActivitiesThunk = () => async (dispatch) => {
  const res = await fetch(`/api/activities/`);
  if (res.ok) {
    const activities = await res.json();
    dispatch(getActivitiesAction(activities));
  }
};

//get all activities of followed users
export const getAllFollowedActivitiesThunk = () => async (dispatch) => {
  const res = await fetch(`/api/activities/following`);
  if (res.ok) {
    const activities = await res.json();
    dispatch(getActivitiesAction(activities));
  };
}

// Display current user activities
export const getCurrentActivitiesThunk = () => async (dispatch) => {
  const res = await fetch(`/api/activities/current`);
  if (res.ok) {
    const activities = await res.json();
    dispatch(getCurrentActivitiesAction(activities));

    const sorted = Object.values(activities.activities).sort(
      (a, b) => Date.parse(b.activity_date) - Date.parse(a.activity_date)
    );

    dispatch(getLatestActivityAction(sorted[0]))
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
    return { "errors": ["server : A server error occurred. Please try again."] };
  }
};


// Edit an activity by id
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
      return { "errors": ["server : A server error occurred. Please try again."] };
    }
  };


/* ----- INITIAL STATE ----- */
const initialState = {
  activities: {},
  latestActivity: {}
};

/* ----- REDUCER ----- */
const activityReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_CURRENT_ACTIVITIES:
      newState.activities = action.activities.activities;
      return newState;
    case GET_LATEST_ACTIVTY:
      if (action.activity) {
        newState.latestActivity = action.activity;
      }
      return newState;
    case DECREASE_COMMENTS_LENGTH:

      newState.activities[action.activityId].comments_length -= 1
      return newState
    case POST_ACTIVITY:
      newState.singleActivity = action.activity;
      return newState;
    case DELETE_ACTIVITY:
      if (newState.activities) {
        delete newState.activities[action.id];
      }
      return newState;
    case EDIT_ACTIVITY:
      newState.activities[action.activity.id] = action.activity;
      return newState;
    case GET_ACTIVITIES:
      newState.activities = action.activities.activities;
      return newState;
    default:
      return state;
  }
};

export default activityReducer;
