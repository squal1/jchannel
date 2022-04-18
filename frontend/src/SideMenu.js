import React from "react";
import "./SideMenu.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    sideMenuClose,
    loginMenuOpen,
    categoryChangeToTrending,
    categoryChangeToGeneral,
    categoryChangeToGossip,
    categoryChangeToCourse,
    categoryChangeToJob,
} from "./actions";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

function SideMenu() {
    /* Redux */
    const style = useSelector((state) => state.toggleSideMenu);
    const category = useSelector((state) => state.changeCategory);
    const dispatch = useDispatch();

    // Close SideMenu when select new category
    useEffect(() => {
        dispatch(sideMenuClose());
    }, [category]);

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
                        onClick={() => dispatch(categoryChangeToTrending())}
                    >
                        Trending
                    </div>
                    <div
                        className="category_general"
                        onClick={() => dispatch(categoryChangeToGeneral())}
                    >
                        General
                    </div>
                    <div
                        className="category_gossip"
                        onClick={() => dispatch(categoryChangeToGossip())}
                    >
                        Gossip
                    </div>
                    <div
                        className="category_courses_profs"
                        onClick={() => dispatch(categoryChangeToCourse())}
                    >
                        Courses&amp;Profs
                    </div>
                    <div
                        className="category_job_connections"
                        onClick={() => dispatch(categoryChangeToJob())}
                    >
                        Job connections
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideMenu;
