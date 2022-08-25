import { combineReducers } from "redux";
import selectCategoryReducer from "./SelectCategory";
import selectThreadReducer from "./SelectThread";
import selectReplyPageReducer from "./SelectReplyPage";
import togglesideMenuReducer from "./ToggleSideMenu";
import toggleCreateThreadReducer from "./ToggleCreateThread";
import loginWindowToggleReducer from "./LoginWindowToggle";
import toggleCreateReplyReducer from "./ToggleCreateReply";
import togglePreviewThreadReducer from "./TogglePreviewThread";
import togglePreviewReplyReducer from "./togglePreviewReply";
import refreshThreadReducer from "./RefreshThread";
import refreshReplyReducer from "./RefreshReply";
import threadReducer from "./Thread";
import replyReducer from "./Reply";
import userReducer from "./User";
import QuoteReplyReducer from "./QuoteReply";
import changeThreadReducer from "./ChangeThread";
import loadSameThreadReducer from "./LoadSameThread";

const allReducers = combineReducers({
    selectCategory: selectCategoryReducer,
    selectThread: selectThreadReducer,
    selectReplyPage: selectReplyPageReducer,
    toggleCreateReply: toggleCreateReplyReducer,
    toggleCreateThread: toggleCreateThreadReducer,
    toggleSideMenu: togglesideMenuReducer,
    loginWindowToggle: loginWindowToggleReducer,
    togglePreviewThread: togglePreviewThreadReducer,
    togglePreviewReply: togglePreviewReplyReducer,
    refreshThread: refreshThreadReducer,
    refreshReply: refreshReplyReducer,
    threads: threadReducer,
    replies: replyReducer,
    user: userReducer,
    quoteReply: QuoteReplyReducer,
    changeThread: changeThreadReducer,
    loadSameThread: loadSameThreadReducer,
});

export default allReducers;
