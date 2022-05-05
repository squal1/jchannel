import { combineReducers } from "redux";
import togglesideMenuReducer from "./ToggleSideMenu";
import toggleCreateThreadReducer from "./ToggleCreateThread";
import loginWindowToggleReducer from "./LoginWindowToggle";
import changeCategoryReducer from "./ChangeCategory";
import selectThreadReducer from "./SelectThread";
import toggleCreateReplyReducer from "./ToggleCreateReply";
import toggleThreadPreviewReducer from "./ToggleThreadPreview";
import toggleReplyPreviewReducer from "./ToggleReplyPreview";

const allReducers = combineReducers({
    toggleCreateReply: toggleCreateReplyReducer,
    toggleCreateThread: toggleCreateThreadReducer,
    toggleSideMenu: togglesideMenuReducer,
    loginWindowToggle: loginWindowToggleReducer,
    changeCategory: changeCategoryReducer,
    selectThread: selectThreadReducer,
    toggleThreadPreview: toggleThreadPreviewReducer,
    toggleReplyPreview: toggleReplyPreviewReducer,
});

export default allReducers;
