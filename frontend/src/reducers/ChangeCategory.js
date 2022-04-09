const initialState = {
    category: "general", // For API
    categoryName: "General", // For Display
};

const changeCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TRENDING":
            return {
                category: "trending",
                categoryName: "Trending",
            };
        case "GENERAL":
            return {
                category: "general",
                categoryName: "General",
            };
        case "GOSSIP":
            return {
                category: "gossip",
                categoryName: "Gossip",
            };
        case "COURSE":
            return {
                category: "course",
                categoryName: "Courses&Profs",
            };
        case "JOB":
            return {
                category: "job",
                categoryName: "Job Connections",
            };
        default:
            return state;
    }
};

export default changeCategoryReducer;
