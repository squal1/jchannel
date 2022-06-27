export const sideMenuOpen = () => {
    return {
        type: "SIDEMENU_OPEN",
    };
};

export const sideMenuClose = () => {
    return {
        type: "SIDEMENU_CLOSE",
    };
};

export const loginMenuOpen = () => {
    return {
        type: "LOGIN_MENU_OPEN",
    };
};

export const loginMenuClose = () => {
    return {
        type: "LOGIN_MENU_CLOSE",
    };
};

export const selectThread = (thread) => {
    return {
        type: "SELECT_THREAD",
        payload: thread,
    };
};

export const selectCategory = (category) => {
    return {
        type: "SELECT_CATEGORY",
        payload: category,
    };
};

export const selectReplyPage = (page) => {
    return {
        type: "SELECT_REPLY_PAGE",
        payload: page,
    };
};

export const toggleCreateThread = () => {
    return {
        type: "TOGGLE_CREATE_THREAD",
    };
};

export const toggleCreateReply = () => {
    return {
        type: "TOGGLE_CREATE_REPLY",
    };
};

export const togglePreviewThread = () => {
    return {
        type: "TOGGLE_PREVIEW_THREAD",
    };
};

export const togglePreviewReply = () => {
    return {
        type: "TOGGLE_PREVIEW_REPLY",
    };
};

export const refreshThreadStart = () => {
    return {
        type: "REFRESH_THREAD_START",
    };
};

export const refreshThreadEnd = () => {
    return {
        type: "REFRESH_THREAD_END",
    };
};

export const refreshReplyStart = () => {
    return {
        type: "REFRESH_REPLY_START",
    };
};

export const refreshReplyEnd = () => {
    return {
        type: "REFRESH_REPLY_END",
    };
};

export const setThread = (threads) => {
    return {
        type: "SET_THREAD",
        payload: threads,
    };
};

export const setReply = (replies) => {
    return {
        type: "SET_REPLY",
        payload: replies,
    };
};

export const setUser = (userObject) => {
    return {
        type: "SET_USER",
        payload: userObject,
    };
};
