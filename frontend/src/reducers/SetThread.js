const initialState = [];

const setThreadReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_THREAD":
            return action.payload;
        default:
            return state;
    }
};

export default setThreadReducer;
