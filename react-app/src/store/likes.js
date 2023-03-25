// import { getLikeCommentsThunk } from "./comments";

/* ----- CONSTANTS ----- */
const GET_ACTIVITY_LIKES = "likes/GET_ACTIVITY_LIKES";
const POST_LIKE = "likes/POST_LIKE";
const DELETE_LIKE = "likes/DELETE_LIKE";

/* ----- Selector ----- */
export const loadAllLikes = (state) => Object.values(state.likes.likedUsers)

/* ----- ACTIONS ----- */

const getActivityLikesAction = (likes) => {
    return {
        type: GET_ACTIVITY_LIKES,
        likes,
    };
};

const postLikeAction = (likedUser) => {
    return {
        type: POST_LIKE,
        likedUser,
    };
};

const deleteLikeAction = (likes) => {
    return {
        type: DELETE_LIKE,
        likes,
    };
};


/* ----- THUNKS ----- */

// Delete likes by id
export const deleteLikeThunk = (activityId) => async (dispatch) => {
    const res = await fetch(`/api/activities/${activityId}/likes`, {
        method: "DELETE",
    });
    if (res.ok) {
        const likes = await res.json();
        dispatch(deleteLikeAction(likes));
    }
};

// Get activity likes
export const getActivityLikesThunk = (activityId) => async (dispatch) => {
    const res = await fetch(`/api/activities/${activityId}/likes`);
    if (res.ok) {
        const likes = await res.json();
        dispatch(getActivityLikesAction(likes));
    }
};

// Create a new likes
export const postLikeThunk = (activityId) => async (dispatch) => {
    const res = await fetch(`/api/activities/${activityId}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
        const likedUser = await res.json();
        dispatch(postLikeAction(likedUser));
        return likedUser;
    } else if (res.status < 500) {
        const data = await res.json();
        return data;
    } else {
        return { "errors": ["server : A server error occurred. Please try again."] };
    }
};


/* ----- INITIAL STATE ----- */
const initialState = {
    likedUsers: {},
};

/* ----- REDUCER ----- */
const likesReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ACTIVITY_LIKES:
            newState.likedUsers = action.likes.liked_users;
            return newState;
        case POST_LIKE:
            newState.likedUsers[action.likedUser.id] = action.likedUser;
            return newState;
        case DELETE_LIKE:
            newState.likedUsers = action.likes.liked_users;
            return newState;
        default:
            return state;
    }
};

export default likesReducer;
