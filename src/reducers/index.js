import { combineReducers } from "redux";
import sideMenuToggleReducer from "./SideMenuToggle";
import createThreadToggleReducer from "./CreateThreadToggle";

const allReducers = combineReducers({
    sideMenuToggle: sideMenuToggleReducer,
    createThreadToggle: createThreadToggleReducer,
});

export default allReducers;
