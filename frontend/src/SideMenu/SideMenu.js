import React, { useState } from "react";
import "./SideMenu.css";
import { useSelector, useDispatch } from "react-redux";
import {
    refreshThreadStart,
    refreshThreadEnd,
    sideMenuClose,
    loginMenuOpen,
    selectCategory,
    setThread,
} from "../actions";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { useNavigate } from "react-router";
import axios from "../axios";

function SideMenu() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const style = useSelector((state) => state.toggleSideMenu);
    const user = useSelector((state) => state.user);
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("sumbitted string:" + query);
        // Search for threads
        dispatch(refreshThreadStart());
        axios.get(`/thread/title/?query=${query}`).then((response) => {
            setTimeout(() => {
                dispatch(setThread(response.data));
                dispatch(refreshThreadEnd());
            }, 500);
        });
        setQuery("");
        dispatch(sideMenuClose());
    };

    const handleSearchInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleCategorySelect = (category) => {
        // URL navigate
        navigate(`category/${category}`);
        dispatch(selectCategory(category));
        // Close side menu afterwards
        dispatch(sideMenuClose());
    };

    const handleMyPostsButtonOnClick = () => {
        if (user === null) {
            dispatch(loginMenuOpen());
            return;
        }
        // URL navigate
        navigate(`profile/${user._id}`);
        dispatch(selectCategory(user.displayName));
        // Close side menu afterwards
        dispatch(sideMenuClose());
    };

    return (
        <div className="side_menu">
            <div
                className="side_menu_overlay"
                style={{
                    opacity: style.opacity,
                    pointerEvents: style.pointerEvents,
                }}
                onClick={() => dispatch(sideMenuClose())}
            ></div>
            <div
                className="side_menu_window"
                style={{
                    left: style.left,
                    backgroundColor: style.backgroundColor,
                    opacity: style.opacity,
                    visibility: style.visibility,
                }}
            >
                <div className="search_container">
                    <form className="search_bar" onSubmit={handleSubmit}>
                        <SearchRoundedIcon id="search_icon" />
                        <input
                            className="search_text_field"
                            placeholder="Search"
                            onChange={handleSearchInputChange}
                            value={query}
                        ></input>
                        <ClearRoundedIcon id="search_bar_clear" />
                    </form>
                </div>

                <div
                    className="my_account_button"
                    onClick={() => dispatch(loginMenuOpen())}
                >
                    My account
                </div>
                <div
                    className="my_posts_button"
                    onClick={() => handleMyPostsButtonOnClick()}
                >
                    My posts
                </div>
                <hr />
                <div className="category_select">
                    <p>Categories</p>
                    <div
                        className="category_general"
                        onClick={() => handleCategorySelect("general")}
                    >
                        General
                    </div>
                    <div
                        className="category_gossip"
                        onClick={() => handleCategorySelect("gossip")}
                    >
                        Gossip
                    </div>
                    <div
                        className="category_courses_profs"
                        onClick={() => handleCategorySelect("course")}
                    >
                        Courses&amp;Profs
                    </div>
                    <div
                        className="category_job_connections"
                        onClick={() => handleCategorySelect("job")}
                    >
                        Job connections
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideMenu;
