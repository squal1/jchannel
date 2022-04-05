const initialState = {
    display: "none",
};

const loginWindowToggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_MENU_OPEN":
            return {
                display: "flex",
            };
        case "LOGIN_MENU_CLOSE":
            return {
                display: "none",
            };
        default:
            return state;
    }
};

export default loginWindowToggleReducer;
