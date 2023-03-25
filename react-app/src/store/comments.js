/* ----- CONSTANTS ----- */
const GET_ACTIVITY_COMMENTS = "comments/GET_ACTIVITY_COMMENTS";
const POST_COMMENT = "comments/POST_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const GET_SINGLE_REVIEW = "comments/GET_SINGLE_REVIEW";
const EDIT_COMMENT = "comments/EDIT_COMMENT";

/* ----- ACTIONS ----- */

export const loadAllComments = (state) => Object.values(state.comments.comments)

const getActivityCommentsAction = (comments) => {
    return {
        type: GET_ACTIVITY_COMMENTS,
        comments,
    };
};

const postCommentAction = (comment) => {
    return {
        type: POST_COMMENT,
        comment,
    };
};

const deleteCommentAction = (id) => {
    return {
        type: DELETE_COMMENT,
        id,
    };
};

const getSingleCommentAction = (comment) => {
    return {
        type: GET_SINGLE_REVIEW,
        comment,
    };
};

const editCommentAction = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment,
    };
};

/* ----- THUNKS ----- */

// Display all business comments at business detail page
export const getActivityCommentsThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/activities/${id}/comments`);
    if (res.ok) {
        const comments = await res.json();
        dispatch(getActivityCommentsAction(comments));
    }
};

// Delete comment by comment id for current user
export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(deleteCommentAction(commentId));
    }
};

// Post new comment by business id for current user
export const postCommentThunk = (newComment, activityId) => async (dispatch) => {
    const res = await fetch(`/api/activities/${activityId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
    });

    if (res.ok) {
        const createdComment = await res.json();
        dispatch(postCommentAction(createdComment));
        return createdComment;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    } else {
        return { "errors": [ "server : A server error occurred. Please try again."] };
    }
};

// Get single comment by comment id
export const getSingleReviewThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`);
    if (res.ok) {
        const singleComment = await res.json();
        dispatch(getSingleCommentAction(singleComment));
        return singleComment;
    }
};

// Edit comment by comment id via current user
export const editCommentThunk =
    (commentId, commentContent) => async (dispatch) => {

        const res = await fetch(`/api/comments/${commentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentContent),
        });
        if (res.ok) {
            const editedComment = await res.json();
            dispatch(editCommentAction(editedComment));
            return editedComment;
        } else if (res.status < 500) {
            const data = await res.json();
            if (data.errors) {
                return data.errors;
            }
        } else {
            return { "errors": ["A server error occurred. Please try again."] };
        }
    };



/* ----- INITIAL STATE ----- */
const initialState = {
    comments: {}
};

/* ----- REDUCER ----- */
const commentsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ACTIVITY_COMMENTS:
            newState.comments = action.comments.comments;
            return newState;
        case POST_COMMENT:
            newState.comments[action.comment.id] = action.comment;
            return newState;
        case DELETE_COMMENT:
            if (newState.comments) {
                delete newState.comments[action.id];
            }
            return newState;
        case GET_SINGLE_REVIEW:
            newState.singleComment = action.comment;
            return newState;
        case EDIT_COMMENT:
            newState.comments[action.comment.id] = action.comment;
            return newState;
        default:
            return state;
    }
};

export default commentsReducer;
