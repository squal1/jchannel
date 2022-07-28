const initialState = 1;

const selectReplyPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SELECT_REPLY_PAGE":
            return action.payload;
        default:
            return state;
    }
};

export default selectReplyPageReducer;
