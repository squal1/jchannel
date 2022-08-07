const initialState = false;

const changeThreadReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_THREAD_START":
            return true;
        case "CHANGE_THREAD_END":
            return false;
        default:
            return state;
    }
};

export default changeThreadReducer;
