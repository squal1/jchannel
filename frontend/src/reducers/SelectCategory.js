const initialState = {
    category: "general",
};

const selectCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SELECT_CATEGORY":
            return {
                ...state,
                category: action.payload,
            };
        default:
            return state;
    }
};

export default selectCategoryReducer;
