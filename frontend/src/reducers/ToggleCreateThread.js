const initialState = {
    display: "none",
};

const toggleCreateThreadReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_THREAD_OPEN":
            return {
                display: "flex",
            };
        case "CREATE_THREAD_CLOSE":
            return {
                display: "none",
            };
        default:
            return state;
    }
};

export default toggleCreateThreadReducer;
