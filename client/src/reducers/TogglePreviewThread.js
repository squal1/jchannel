const initialState = {
    display: "none",
};

const togglePreviewThreadReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_PREVIEW_THREAD":
            if (state.display === "flex") {
                return { display: "none" };
            } else {
                return { display: "flex" };
            }
        default:
            return state;
    }
};

export default togglePreviewThreadReducer;
