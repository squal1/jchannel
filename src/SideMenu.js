import React from "react";
import "./SideMenu.css";
import { useSelector, useDispatch } from "react-redux";
import { sideMenuClose } from "./actions";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

function SideMenu() {
    const style = useSelector(
        (state) => state.sideMenuToggle
    ); /* For toggling */
    const dispatch = useDispatch();

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

                <div className="your_account_button">Your account</div>
                <div className="your_posts_button">Your posts</div>
                <hr />
                <div className="category_select">
                    <p>Categories</p>
                    <div className="category_trending">Trending</div>
                    <div className="category_general">General</div>
                    <div className="category_gossip">Gossip</div>
                    <div className="category_courses_profs">
                        Courses&amp;Profs
                    </div>
                    <div className="category_job_connections">
                        Job connections
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideMenu;
