const initialState = {
    currentThread: {
        author: "",
        category: "",
        title: "",
        reply: "",
        lastReplied: "",
    },
};

const selectThreadReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SELECT_THREAD":
            return {
                ...state,
                currentThread: action.payload,
            };
        default:
            return state;
    }
};

export default selectThreadReducer;
