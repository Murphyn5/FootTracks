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

const postLikeAction = (likes) => {
    return {
        type: POST_LIKE,
        likes,
    };
};

const deleteLikeAction = (id) => {
    return {
        type: DELETE_LIKE,
        id,
    };
};


/* ----- THUNKS ----- */

// Delete likes by id
export const deleteLikeThunk = (likesId) => async (dispatch) => {
    const res = await fetch(`/api/likes/${likesId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(deleteLikeAction(likesId));
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
        const createdLike = await res.json();
        dispatch(postLikeAction(createdLike));
        return createdLike;
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
            newState.singleLike = action.likes;
            return newState;
        case DELETE_LIKE:
            if (newState.likes) {
                delete newState.likes[action.id];
            }
            return newState;
        default:
            return state;
    }
};

export default likesReducer;
