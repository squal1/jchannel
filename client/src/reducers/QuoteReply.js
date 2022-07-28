const initialState = null;

const QuoteReplyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_QUOTE":
            return action.payload; // The reply object of the reply to be quoted
        case "CLEAR_QUOTE":
            return null;
        default:
            return state;
    }
};

export default QuoteReplyReducer;
