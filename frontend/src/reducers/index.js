import { combineReducers } from "redux";
import selectCategoryReducer from "./SelectCategory";
import selectThreadReducer from "./SelectThread";
import togglesideMenuReducer from "./ToggleSideMenu";
import toggleCreateThreadReducer from "./ToggleCreateThread";
import loginWindowToggleReducer from "./LoginWindowToggle";
import toggleCreateReplyReducer from "./ToggleCreateReply";
import toggleThreadPreviewReducer from "./ToggleThreadPreview";
import toggleReplyPreviewReducer from "./ToggleReplyPreview";
import refreshThreadReducer from "./RefreshThread";

const allReducers = combineReducers({
    selectCategory: selectCategoryReducer,
    selectThread: selectThreadReducer,
    toggleCreateReply: toggleCreateReplyReducer,
    toggleCreateThread: toggleCreateThreadReducer,
    toggleSideMenu: togglesideMenuReducer,
    loginWindowToggle: loginWindowToggleReducer,
    toggleThreadPreview: toggleThreadPreviewReducer,
    toggleReplyPreview: toggleReplyPreviewReducer,
    refreshThread: refreshThreadReducer,
});

export default allReducers;
