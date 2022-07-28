const initialState = {
    display: "none",
};

const toggleCreateReplyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_CREATE_REPLY":
            if (state.display === "flex") {
                return { display: "none" };
            } else {
                return { display: "flex" };
            }
        default:
            return state;
    }
};

export default toggleCreateReplyReducer;
