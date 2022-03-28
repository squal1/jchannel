import React from "react";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import "./BottomBar.css";
import { sideMenuOpen } from "./actions";
import { useDispatch } from "react-redux";

function BottomBar() {
    const dispatch = useDispatch();
    return (
        <div className="bottom_bar">
            <div
                className="bottom_bar_menu_button"
                onClick={() => dispatch(sideMenuOpen())}
            >
                <MenuIcon className="nav_bar_left_menu_icon" />
            </div>
            <div className="bottom_bar_f5_button">
                <CachedRoundedIcon />
            </div>
            <div className="bottom_bar_create_thread_button">
                <AddIcon />
            </div>
        </div>
    );
}

export default BottomBar;
