import { combineReducers } from "redux";
import sideMenuToggleReducer from "./SideMenuToggle";

const allReducers = combineReducers({
    sideMenuToggle: sideMenuToggleReducer,
});

export default allReducers;
