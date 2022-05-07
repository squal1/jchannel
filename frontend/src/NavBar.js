import React from "react";
import "./NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { sideMenuOpen, toggleCreateThread, toggleCreateReply } from "./actions";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";

function NavBar() {
    const { category } = useSelector((state) => state.selectCategory);
    const selectThread = useSelector((state) => state.selectThread);
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

                <div className="category_name">{category.toUpperCase()}</div>

                <div className="nav_bar_left_f5_button">
                    <CachedRoundedIcon />
                </div>
                <div
                    className="nav_bar_left_create_thread_button"
                    onClick={() => dispatch(toggleCreateThread())}
                >
                    <AddIcon />
                </div>
            </div>
            {selectThread.currentThread._id ? (
                /* When thread is selected */
                <div className="nav_bar_right">
                    <div className="nav_bar_right_go_back_button">
                        <ArrowBackIcon id="go_back_icon" />
                    </div>
                    <div className="nav_bar_right_thread_topic">
                        {selectThread.currentThread.title}
                    </div>
                    <div
                        className="nav_bar_right_reply_button"
                        onClick={() => dispatch(toggleCreateReply())}
                    >
                        <ReplyIcon id="reply_icon" />
                    </div>
                </div>
            ) : (
                /* When thread is NOT selected */
                <div className="nav_bar_right"></div>
            )}
        </nav>
    );
}

export default NavBar;
