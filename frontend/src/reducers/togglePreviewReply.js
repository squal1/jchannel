const initialState = {
    display: "none",
};

const togglePreviewReplyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_PREVIEW_REPLY":
            if (state.display === "flex") {
                return { display: "none" };
            } else {
                return { display: "flex" };
            }
        default:
            return state;
    }
};

export default togglePreviewReplyReducer;
