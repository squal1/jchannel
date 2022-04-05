const initialState = {
    opacity: "0",
    left: "-300px",
    pointerEvents: "none",
    backgroundColor: "#000000",
    visibility: "hidden",
};

const sideMenuToggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIDEMENU_OPEN":
            return {
                opacity: "1",
                left: "0px",
                pointerEvents: "auto",
                backgroundColor: "#222222",
                visibility: "visible",
            };
        case "SIDEMENU_CLOSE":
            return {
                opacity: "0",
                left: "-300px",
                pointerEvents: "none",
                backgroundColor: "#000000",
                visibility: "hidden",
            };
        default:
            return state;
    }
};

export default sideMenuToggleReducer;
