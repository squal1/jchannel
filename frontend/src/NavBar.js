import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    sideMenuOpen,
    toggleCreateThread,
    toggleCreateReply,
    refreshThreadStart,
} from "./actions";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";

function NavBar() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { category } = useSelector((state) => state.selectCategory);
    const currentThread = useSelector(
        (state) => state.selectThread.currentThread
    );

    const scrollToBottom = () => {
        document.getElementById("reply_scroller").scrollTo({
            top:
                document.getElementById("reply_scroller").scrollHeight -
                document.getElementById("reply_scroller").offsetHeight,
            left: 0,
            behavior: "smooth",
        });
    };

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

                <div
                    className="nav_bar_left_f5_button"
                    onClick={() => dispatch(refreshThreadStart())}
                >
                    <CachedRoundedIcon />
                </div>
                <div
                    className="nav_bar_left_create_thread_button"
                    onClick={() => dispatch(toggleCreateThread())}
                >
                    <AddIcon />
                </div>
            </div>
            {currentThread._id ? (
                /* When thread is selected */
                <div className="nav_bar_right">
                    <div
                        className="nav_bar_right_go_back_button"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBackIcon id="go_back_icon" />
                    </div>
                    <div className="nav_bar_right_thread_topic">
                        {currentThread.title}
                    </div>
                    <div
                        className="nav_bar_right_scroll_to_bottom_button"
                        onClick={() => scrollToBottom()}
                    >
                        <VerticalAlignBottomIcon />
                    </div>
                    <div
                        className="nav_bar_right_reply_button"
                        onClick={() => {
                            if (currentThread.reply.length >= 500) {
                                return;
                            }
                            dispatch(toggleCreateReply());
                        }}
                        style={{
                            cursor:
                                currentThread.reply.length >= 500
                                    ? "not-allowed"
                                    : "pointer",
                        }}
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
