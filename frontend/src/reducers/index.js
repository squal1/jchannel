import { combineReducers } from "redux";
import sideMenuToggleReducer from "./SideMenuToggle";
import createThreadToggleReducer from "./CreateThreadToggle";
import loginWindowToggleReducer from "./LoginWindowToggle";
import changeCategoryReducer from "./ChangeCategory";

const allReducers = combineReducers({
    sideMenuToggle: sideMenuToggleReducer,
    createThreadToggle: createThreadToggleReducer,
    loginWindowToggle: loginWindowToggleReducer,
    changeCategory: changeCategoryReducer,
});

export default allReducers;
