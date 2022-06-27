import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    sideMenuOpen,
    toggleCreateThread,
    toggleCreateReply,
    refreshThreadStart,
    selectReplyPage,
    loginMenuOpen,
} from "./actions";
import Select from "react-select";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";

function NavBar() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);
    const user = useSelector((state) => state.user);
    const { category } = useSelector((state) => state.selectCategory);
    const currentThread = useSelector(
        (state) => state.selectThread.currentThread
    );

    // Styling react-select
    const customSelectStyles = {
        control: (base, state) => ({
            ...base,
            width: 110,
            color: "white",
            background: "#222222",
            borderColor: state.isFocused ? "#f8b77b" : "#505050",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "white",
        }),
        menu: (base) => ({
            ...base,
            marginTop: 0,
            zIndex: 999,
        }),
        menuList: (base) => ({
            ...base,
            background: "#222222",
        }),
        option: (base, state) => ({
            ...base,
            color: "white",
            background: state.isFocused ? "#545454" : "#222222",
            "&:hover": {
                background: "#545454",
            },
        }),
    };

    useEffect(() => {
        let options = [];
        for (let i = 0; i < Math.ceil(currentThread.reply.length / 25); i++) {
            options.push({ label: `Page ${i + 1}`, value: i + 1 });
        }
        setOptions(options);
    }, [currentThread]);

    const handleCreateThreadButtonOnClick = () => {
        // Not yet logged in
        if (user === null) {
            dispatch(loginMenuOpen());
            return;
        }
        dispatch(toggleCreateThread());
    };

    const handleCreateReplyButtonOnClick = () => {
        // Not yet logged in
        if (user === null) {
            dispatch(loginMenuOpen());
            return;
        }
        dispatch(toggleCreateReply());
    };

    // Scroll to the bottom of reply list
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
                    onClick={() => handleCreateThreadButtonOnClick()}
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
                    <Select
                        styles={customSelectStyles}
                        options={options}
                        placeholder={`Page`}
                        onChange={(option) =>
                            dispatch(selectReplyPage(option.value))
                        }
                    />
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
                            handleCreateReplyButtonOnClick();
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
