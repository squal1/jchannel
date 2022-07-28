const initialState = {
    display: "none",
};

const toggleCreateThreadReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_CREATE_THREAD":
            if (state.display === "flex") {
                return { display: "none" };
            } else {
                return { display: "flex" };
            }
        default:
            return state;
    }
};

export default toggleCreateThreadReducer;
