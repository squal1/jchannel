const initialState = {
    display: "none",
};

const toggleThreadPreviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case "PREVIEW_THREAD_OPEN":
            return {
                display: "flex",
            };
        case "PREVIEW_THREAD_CLOSE":
            return {
                display: "none",
            };
        default:
            return state;
    }
};

export default toggleThreadPreviewReducer;
