const initialState = false;

const refreshReplyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REFRESH_REPLY_START":
            return true;
        case "REFRESH_REPLY_END":
            return false;
        default:
            return state;
    }
};

export default refreshReplyReducer;
