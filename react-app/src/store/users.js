/* ----- CONSTANTS ----- */
const GET_SEARCHED_USERS = "comments/GET_SEARCHED_USERS";


/* ----- ACTIONS ----- */

export const loadSearchedUsers = (state) => Object.values(state.users.users)

const getUsersSearchAction = (searchResults) => {
    return {
        type: GET_SEARCHED_USERS,
        searchResults,
    };
};



/* ----- THUNKS ----- */

// Display all business comments at business detail page
export const getUsersSearchThunk = (searchString) => async (dispatch) => {
    const res = await fetch(`/api/users/search?query=${searchString}`);
    if (res.ok) {
        const searchResults = await res.json();
        dispatch(getUsersSearchAction(searchResults));
        console.log(searchResults)
        return searchResults;
      }
};




/* ----- INITIAL STATE ----- */
const initialState = {
    users: {}
};

/* ----- REDUCER ----- */
const usersReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_SEARCHED_USERS:
            newState.users = action.searchResults.users;
            return newState;
        default:
            return state;
    }
};

export default usersReducer;
