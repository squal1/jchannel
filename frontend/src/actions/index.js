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

export const createThreadOpen = () => {
    return {
        type: "CREATE_THREAD_OPEN",
    };
};

export const createThreadClose = () => {
    return {
        type: "CREATE_THREAD_CLOSE",
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

export const categoryChangeToTrending = () => {
    return {
        type: "TRENDING",
    };
};

export const categoryChangeToGeneral = () => {
    return {
        type: "GENERAL",
    };
};

export const categoryChangeToGossip = () => {
    return {
        type: "GOSSIP",
    };
};

export const categoryChangeToCourse = () => {
    return {
        type: "COURSE",
    };
};

export const categoryChangeToJob = () => {
    return {
        type: "JOB",
    };
};
