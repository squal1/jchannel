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
        dispatch(selectCategory("Search Result"));
        dispatch(refreshThreadStart());
        // Search for threads
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
                <p>Channels</p>
                <div className="category_select">
                    <div className="category_group">
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("general")}
                        >
                            General
                        </div>
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("trending")}
                        >
                            Trending
                        </div>
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("funny")}
                        >
                            Funny
                        </div>
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("event")}
                        >
                            Event
                        </div>
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("course")}
                        >
                            Course &amp; Prof
                        </div>

                        <div
                            className="category"
                            onClick={() => handleCategorySelect("career")}
                        >
                            Career
                        </div>
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("job")}
                        >
                            Job connection
                        </div>
                    </div>
                    <p>Discuss</p>
                    <div className="category_group">
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("politic")}
                        >
                            Politic
                        </div>
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("advice")}
                        >
                            Advice
                        </div>
                        <div
                            className="category"
                            onClick={() =>
                                handleCategorySelect("international")
                            }
                        >
                            International
                        </div>
                    </div>
                    <p>Interests</p>
                    <div className="category_group">
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("tech")}
                        >
                            Technology
                        </div>
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("sport")}
                        >
                            Sport
                        </div>
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("music")}
                        >
                            Music
                        </div>
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("car")}
                        >
                            Car
                        </div>
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("movie")}
                        >
                            Movie &amp; show
                        </div>
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("fashion")}
                        >
                            Fashion
                        </div>

                        <div
                            className="category"
                            onClick={() => handleCategorySelect("gaming")}
                        >
                            Video game
                        </div>
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("anime")}
                        >
                            Anime &amp; Manga
                        </div>
                    </div>
                    <p>Misc.</p>
                    <div className="category_group">
                        <div
                            className="category"
                            onClick={() => handleCategorySelect("admin")}
                        >
                            Admin
                        </div>
                    </div>
                </div>
                <div className="side_menu_footer">
                    <a href="/terms.html">Terms of service</a>
                    <a href="/cookies.html">Cookie policy</a>
                    <a href="/privacy.html">Privacy policy</a>
                </div>
            </div>
        </div>
    );
}

export default SideMenu;
