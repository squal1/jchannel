const initialState = false;

const refreshThreadReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REFRESH_THREAD_START":
            return true;
        case "REFRESH_THREAD_END":
            return false;
        default:
            return state;
    }
};

export default refreshThreadReducer;
