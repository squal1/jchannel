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
import refreshReplyReducer from "./RefreshReply";
import threadReducer from "./Thread";
import replyReducer from "./Reply";

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
    refreshReply: refreshReplyReducer,
    threads: threadReducer,
    replies: replyReducer,
});

export default allReducers;
