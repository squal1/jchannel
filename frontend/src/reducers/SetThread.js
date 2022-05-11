const initialState = {
    list: [],
};

const setThreadReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_THREAD":
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state;
    }
};

export default setThreadReducer;
