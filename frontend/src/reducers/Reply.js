const initialState = {
    list: null,
};

const replyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_REPLY":
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state;
    }
};

export default replyReducer;
