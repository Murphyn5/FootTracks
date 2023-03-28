/* ----- CONSTANTS ----- */
const GET_SEARCHED_USERS = "users/GET_SEARCHED_USERS";
const GET_USER_FOLLOWING = "users/GET_USER_FOLLOWING"
const FOLLOW_USER = "users/FOLLOW_USER";
const UNFOLLOW_USER = "users/UNFOLLOW_USER";

/* ----- ACTIONS ----- */

export const loadSearchedUsers = (state) => Object.values(state.users.users)
export const loadUserFollowing = (state) => Object.values(state.users.following)

const getUsersSearchAction = (searchResults) => {
    return {
        type: GET_SEARCHED_USERS,
        searchResults,
    };
};

const getUserFollowingAction = (following) => {
    return {
        type: GET_USER_FOLLOWING,
        following,
    };
};

const followUserAction = (user) => {
    return {
        type: FOLLOW_USER,
        user,
    };
};

const unfollowUserAction = (following) => {
    return {
        type: GET_USER_FOLLOWING,
        following,
    };
};

/* ----- THUNKS ----- */

// Gets all users that match the search query
export const getUsersSearchThunk = (searchString) => async (dispatch) => {
    const res = await fetch(`/api/users/search?query=${searchString}`);
    if (res.ok) {
        const searchResults = await res.json();
        dispatch(getUsersSearchAction(searchResults));
        console.log(searchResults)
        return searchResults;
    }
};

// Follow a user
export const followUserThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
        const user = await res.json();
        dispatch(followUserAction(user));
        return user;
    } else if (res.status < 500) {
        const data = await res.json();
        return data;
    } else {
        return { "errors": ["server : A server error occurred. Please try again."] };
    }
};

export const unfollowUserThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/unfollow`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
        const following = await res.json();
        dispatch(unfollowUserAction(following));
    }
};

export const getUserFollowingThunk = () => async (dispatch) => {
    const res = await fetch(`/api/users/current/following`);
    if (res.ok) {
        const following = await res.json();
        dispatch(getUserFollowingAction(following));
    }
};

/* ----- INITIAL STATE ----- */
const initialState = {
    users: {},
    filteredusers: {},
    following: {}
};

/* ----- REDUCER ----- */
const usersReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_SEARCHED_USERS:
            newState.users = action.searchResults.users;
            return newState;
        case GET_USER_FOLLOWING:
            newState.following = action.following.following;
            return newState;
        case FOLLOW_USER:
            newState.following[action.user.id] = action.user;
            return newState;
        case UNFOLLOW_USER:
            newState.following = action.following.following;
            return newState;
        default:
            return state;
    }
};

export default usersReducer;
