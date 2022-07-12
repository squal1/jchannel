import React from "react";
import "./SideMenu.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sideMenuClose, loginMenuOpen, selectCategory } from "../actions";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

function SideMenu() {
    let navigate = useNavigate();
    const style = useSelector((state) => state.toggleSideMenu);
    const dispatch = useDispatch();
    const { category } = useParams();

    // Close SideMenu after selected new category
    useEffect(() => {
        dispatch(sideMenuClose());
    }, [category]);

    const handleCategorySelect = (category) => {
        // URL navigate
        navigate(`category/${category}`);
        dispatch(selectCategory(category));
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
                    <form className="search_bar">
                        <SearchRoundedIcon id="search_icon" />
                        <input
                            className="search_text_field"
                            placeholder="Search"
                        ></input>
                        <ClearRoundedIcon id="search_bar_clear" />
                    </form>
                </div>

                <div
                    className="your_account_button"
                    onClick={() => dispatch(loginMenuOpen())}
                >
                    Your account
                </div>
                <div className="your_posts_button">Your posts</div>
                <hr />
                <div className="category_select">
                    <p>Categories</p>
                    <div
                        className="category_trending"
                        onClick={() => handleCategorySelect("trending")}
                    >
                        Trending
                    </div>
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
