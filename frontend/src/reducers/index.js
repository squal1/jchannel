import { combineReducers } from "redux";
import sideMenuToggleReducer from "./SideMenuToggle";
import createThreadToggleReducer from "./CreateThreadToggle";
import loginWindowToggleReducer from "./LoginWindowToggle";

const allReducers = combineReducers({
    sideMenuToggle: sideMenuToggleReducer,
    createThreadToggle: createThreadToggleReducer,
    loginWindowToggle: loginWindowToggleReducer,
});

export default allReducers;
