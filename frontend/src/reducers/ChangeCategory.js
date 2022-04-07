const initialState = {
    category: "general",
};

const changeCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TRENDING":
            return {
                category: "trending",
            };
        case "GENERAL":
            return {
                category: "general",
            };
        case "GOSSIP":
            return {
                category: "gossip",
            };
        case "COURSE":
            return {
                category: "course",
            };
        case "JOB":
            return {
                category: "job",
            };
        default:
            return state;
    }
};

export default changeCategoryReducer;
