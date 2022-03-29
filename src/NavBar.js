import React from "react";
import "./NavBar.css";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { sideMenuOpen } from "./actions";

function NavBar() {
    const dispatch = useDispatch();

    return (
        <nav className="nav_bar">
            <div className="nav_bar_left">
                <div
                    className="nav_bar_left_menu_button"
                    onClick={() => dispatch(sideMenuOpen())}
                >
                    <MenuIcon className="nav_bar_left_menu_icon" />
                </div>

                <div className="category_name">Category name</div>

                <div className="nav_bar_left_f5_button">
                    <CachedRoundedIcon />
                </div>
                <div className="nav_bar_left_create_thread_button">
                    <AddIcon />
                </div>
            </div>
            <div className="nav_bar_right">
                <div className="nav_bar_right_thread_topic">
                    I am the title of the topic. I am the title of the topic. I
                    am the title of the topic. I am the title of the topic. I am
                    the title of the topic. I am the title of the topic.
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
