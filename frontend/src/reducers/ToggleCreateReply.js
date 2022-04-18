const initialState = {
    display: "none",
};

const toggleCreateReplyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_REPLY_OPEN":
            return {
                display: "flex",
            };
        case "CREATE_REPLY_CLOSE":
            return {
                display: "none",
            };
        default:
            return state;
    }
};

export default toggleCreateReplyReducer;
