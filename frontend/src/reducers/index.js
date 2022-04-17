import { combineReducers } from "redux";
import sideMenuToggleReducer from "./SideMenuToggle";
import createThreadToggleReducer from "./CreateThreadToggle";
import loginWindowToggleReducer from "./LoginWindowToggle";
import changeCategoryReducer from "./ChangeCategory";
import selectThreadReducer from "./SelectThread";

const allReducers = combineReducers({
    sideMenuToggle: sideMenuToggleReducer,
    createThreadToggle: createThreadToggleReducer,
    loginWindowToggle: loginWindowToggleReducer,
    changeCategory: changeCategoryReducer,
    selectThread: selectThreadReducer,
});

export default allReducers;
