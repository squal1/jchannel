const initialState = false;

const loadSameThreadReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_SAME_THREAD_START":
            return true;
        case "LOAD_SAME_THREAD_END":
            return false;
        default:
            return state;
    }
};

export default loadSameThreadReducer;
