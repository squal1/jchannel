const initialState = {
    list: [],
};

const threadReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_THREAD":
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state;
    }
};

export default threadReducer;
